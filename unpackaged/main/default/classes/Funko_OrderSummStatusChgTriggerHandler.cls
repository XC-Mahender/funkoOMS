public with sharing class Funko_OrderSummStatusChgTriggerHandler {
    public static void remorsePeriodEndedFlow(List<OrderSumStatusChangedEvent> lstOrderSummStatusChangeEvents){
        //consolidating the order summary Ids whose status has changed from Created to RemorsePeriodEnded
        for (OrderSumStatusChangedEvent event : lstOrderSummStatusChangeEvents) {
            if (Funko_Constants.ORDERSUMMARY_STATUS_REMORSEPERIODENDED == event.NewStatus) {
                 // starting the flow to create Fulfillment orders
                Flow.Interview createFOOrderAfterRemorse = Flow.Interview.createInterview(Funko_Constants.FLOW_CREATE_FULFILLMENTORDER_APINAME, new Map<String, Object>{
                    Funko_Constants.FLOW_CREATE_FULFILLMENTORDER_INPUT_ORDERSUMMARYID_APINAME => event.OrderSummaryId
                });
                createFOOrderAfterRemorse.start();
            }
        }
    }
}