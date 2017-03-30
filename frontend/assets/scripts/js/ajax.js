var listParts = function() {
    return $.ajax({
        url: "http://localhost:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"6c980af56b1eeff4da7c9eef31c5715ba99c844e65f19566b94eaa1662db3a3220b6515bc5f938d90c89ef62a2ab7c2054cd1f12621df0066344ed363e2db15a"},"ctorMsg": {"function":"listParts","args":[]}},"id": 54}'
    });
}

var CreatePart = function(Id, Manufacturer, PartIds, Specification, Notes){
    $.ajax({
        url: "http://localhost:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
         data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"6c980af56b1eeff4da7c9eef31c5715ba99c844e65f19566b94eaa1662db3a3220b6515bc5f938d90c89ef62a2ab7c2054cd1f12621df0066344ed363e2db15a"},"ctorMsg": {"function":"CreatePart","args":["'+Id+'","'+Manufacturer+'","'+PartIds+'","'+Specification+'","'+Notes+'"]}},"id": 55}'
    }).done(function (result) {
        console.log(result);
    });
}

var GetPart = function(Id){
    $.ajax({
        url: "http://localhost:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
         data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"6c980af56b1eeff4da7c9eef31c5715ba99c844e65f19566b94eaa1662db3a3220b6515bc5f938d90c89ef62a2ab7c2054cd1f12621df0066344ed363e2db15a"},"ctorMsg": {"function":"GetPart","args":["'+Id+'"]}},"id": 56}'
    }).done(function (result) {
        console.log(result);
    });
}

var UpdatePart = function(args){
    $.ajax({
        url: "http://localhost:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
         data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"6c980af56b1eeff4da7c9eef31c5715ba99c844e65f19566b94eaa1662db3a3220b6515bc5f938d90c89ef62a2ab7c2054cd1f12621df0066344ed363e2db15a"},"ctorMsg": {"function":"UpdatePart","args":["'+args+'"]}},"id": 56}'
    }).done(function (result) {
        console.log(result);
    });
}







    var myApp = angular.module("myApp", []);
    myApp.controller("partdealer", function($scope) {
        listParts().done(function (result) {
            $scope.rr = (result.result.message);
            console.log("result", result.result.message)
            $scope.$digest();
        })
    })





