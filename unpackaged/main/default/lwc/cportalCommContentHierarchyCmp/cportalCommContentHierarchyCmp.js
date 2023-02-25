import { LightningElement,wire,api } from 'lwc';
import fetchntCommContents from '@salesforce/apex/cPortal_ContentHierarchyCmpController.findAllHierarchyCommunicationContent';
const COLLS = [
    {
        type: 'url',
        fieldName: 'CommunicationContentURL',
        label: 'Communication Content Name',
        typeAttributes: {
            label: { fieldName: 'communicationContentName' },
            target: '_self'
        }
    },
    {
        type: 'text',
        fieldName: 'Category__c',
        label: 'Category'
    }    
];
export default class CportalCommContentHierarchyCmp extends LightningElement {
    gridColumns = COLLS;
    gridData = [];
    roles = {};
    currentExpandedRows=[];
    @api recordId;
    @api objectApiName;

    @wire(fetchntCommContents, { recordId: '$recordId'})
    AllCommContentInfo({ error, data }) {
        if (error) {
            console.error("error loading comm-contents", error);
        } else if (data) {
            //console.log('*****dat from apex:'+JSON.stringify(data));
            console.log('**ObjectAPI Name:'+this.objectApiName+'***current comm-content Id:'+this.recordId);
            var finaldata=[];
            var expandedRowInfo=[];
            for ( var i = 0; i < data.length; i++ ) {
                if(data[i].Communications_Content__r ){
                    expandedRowInfo.push(data[i].Id);
                    this.roles[data[i].Id] = { 
                        communicationContentName: data[i].Name ,
                        Id: data[i].Id, 
                        CommunicationContentURL:'/'+data[i].Id,
                        Category__c:data[i].Type?data[i].Category__c:'',
                        _children: [] 
                    };
                }else{
                    this.roles[data[i].Id] = { 
                        communicationContentName: data[i].Name ,
                        Id: data[i].Id, 
                        CommunicationContentURL:'/'+data[i].Id,
                        Category__c:data[i].Type?data[i].Category__c:''
                    };
                }
            }

            for ( var i = 0; i < data.length; i++ ) {
                if(data[i].ParentId){
                    if(this.roles[data[i].ParentId]){
                        this.roles[data[i].ParentId]._children.push(this.roles[data[i].Id]); 
                    }
                }
            }
            //console.log('***after adding childrens :'+JSON.stringify(this.roles));
            for ( var i = 0; i < data.length; i++ ) {
                if(data[i].ParentId){}
                else{
                    finaldata.push(this.roles[data[i].Id]);
                }
            }
            console.log('***finaldata :'+JSON.stringify(finaldata));
            this.gridData=finaldata;
            this.currentExpandedRows=expandedRowInfo;
            console.log('***currentExpandedRows 2:'+JSON.stringify(this.currentExpandedRows));
        }
        
    }

}