trigger Funko_OrderSummStatusChgEventTrigger on OrderSumStatusChangedEvent (after insert) {
    Funko_OrderSummStatusChgTriggerHandler.remorsePeriodEndedFlow(Trigger.new);
}