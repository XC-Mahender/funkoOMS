import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';

export default class CportalHeader extends NavigationMixin(LightningElement) {

    handleActive(event) {
        let page = event.target.value;
        let category = event.target.label;
        console.log('page: '+page)
        console.log('category'+category)
        console.log('event'+event);
        console.log('currentPageReference: '+JSON.stringify(this.currentPageReference));
        if(page != this.currentPageReference.attributes.name) {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: page
              }
            });            
        }
    }

    activeTab
    currentPageReference
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        this.currentPageReference = currentPageReference;
        if (currentPageReference) {
                console.log('params: '+JSON.stringify(currentPageReference));
                let activeTab = currentPageReference?.attributes?.name;
                if(activeTab && activeTab != this.activeTab) this.activeTab = activeTab;
        }
        else if(!this.activeTab) this.activeTab = 'Home'
    }

}