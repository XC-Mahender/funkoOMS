/**
 * @description       : 
 * @author            : Manoj_Goswami
 * @group             : 
 * @last modified on  : 2023-02-23
 * @last modified by  : Manoj_Goswami
**/
public with sharing class cPortal_ContentHierarchyCmpController {
    @AuraEnabled(cacheable=true)
    public static List<Communications_Content__c> findAllHierarchyCommunicationContent(string recordId){
        List<Communications_Content__c> allCommContentList = new List<Communications_Content__c>();
        String ultimateCommContentId;
        for(Communications_Content__c commContent : [SELECT Id, Parent_Comm_Content__c 
                                                     FROM Communications_Content__c 
                                                     WHERE Id=:recordId]){
                                                         ultimateCommContentId = commContent.Parent_Comm_Content__c;
                                                     }
        if(string.isNotBlank(ultimateCommContentId)){
            for(Communications_Content__c comm : [SELECT Id, (SELECT id FROM Communications_Content__r),
                                                 Name, Parent_Comm_Content__c, Category__c 
                                                 FROM Communications_Content__c 
                                                 WHERE Parent_Comm_Content__c=:ultimateCommContentId 
                                                 ORDER BY Parent_Comm_Content__c NULLS FIRST]){
                                                     allCommContentList.add(comm);
                                                 }
        }
        system.debug('***allCommContentList size:'+allCommContentList);
        return allCommContentList;
    }
}