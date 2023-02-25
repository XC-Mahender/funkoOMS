import { LightningElement, api, track } from "lwc";

export default class MessageList extends LightningElement {
  @track objectNameToSend;
  @track fieldNamesToSend;
  defaultFilter;
  @track filtersToSend;
  @track recordsPerPageToSend;
  @track disableSortToSend;
  @track disableSearchToSend;
  @track searchText;
  @track categoryValue;
  @track fromDate;
  @track toDate;
  @track showTable;
  debugger;

  connectedCallback() {
    this.defaultValues();
  }

  handleReset(event) {
    this.template.querySelectorAll("lightning-input").forEach((element) => {
      if (element.type === "checkbox" || element.type === "checkbox-button") {
        element.checked = false;
      } else {
        element.value = null;
      }
    });
    this.defaultValues();
    this.handleSearch();
  }

  defaultValues() {
    this.objectNameToSend = "Communications_Content__c";
    this.fieldNamesToSend =
      "Name, Category__c, Publish_Date__c";
    this.defaultFilter = "RecordType.DeveloperName = 'Message'";
    this.filtersToSend = this.defaultFilter;
    this.recordsPerPageToSend = 200;
    this.disableSortToSend = true;
    this.disableSearchToSend = true;
    this.searchText = undefined;
    this.categoryValue = '';
    this.fromDate = undefined;
    this.toDate = undefined;
    this.showTable = true;
  }

  get options() {
    return [
      { label: "In-Store Events", value: "In-Store Events" },
      { label: "Recruitment & Employment", value: "Recruitment & Employment" },
      { label: "Technology", value: "Technology" },
      { label: "Promotional Offers", value: "Promotional Offers" },
      { label: "Inventory Updates", value: "Inventory Updates" },
      { label: "WorkWell", value: "WorkWell" }
    ];
  }

  handleSearchTextChange(event) {
    this.searchText = event.target.value;
    this.handleFilterChange();
  }

  handleTypeChange(event) {
    this.categoryValue = event.detail.value;
    this.handleFilterChange();
  }

  handleFromDateChange(event) {
    this.fromDate = event.target.value;
    this.handleFilterChange();
  }

  handleToDateChange(event) {
    this.toDate = event.target.value;
    this.handleFilterChange();
  }

  handleFilterChange() {
    this.filtersToSend = this.defaultFilter;
    if (
      !(
        this.searchText == null ||
        this.searchText == "" ||
        this.searchText == undefined
      )
    ) {
      this.filtersToSend += " AND Name LIKE '%" + this.searchText + "%'";
    }
    if (
      !(
        this.categoryValue == null ||
        this.categoryValue == "" ||
        this.categoryValue == undefined
      )
    ) {
      this.filtersToSend += ' AND Category__c = \'' + this.categoryValue + '\'';
    }
    if (
      !(
        this.fromDate == null ||
        this.fromDate == "" ||
        this.fromDate == undefined
      )
    ) {
      this.filtersToSend +=
        " AND Publish_Date__c >= " + this.fromDate;
    }
    if (
      !(this.toDate == null || this.toDate == "" || this.toDate == undefined)
    ) {
      this.filtersToSend +=
        " AND Publish_Date__c <= " + this.toDate;
    }
  }

  handleSearch() {
    //console.log('handleSearch called');
    this.showTable = true;
    //console.log(this.filtersToSend);
    let child = this.template.querySelector("c-cportal-data-table-wrapper");
    console.log('child');
    console.log(child);
    child.doSearch();
  }
}