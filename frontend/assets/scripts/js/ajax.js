var lol = function() {
    $.ajax({
        url: "http://172.19.0.3:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"69dc805e69bd0c2e909f279167ea10fd5abbf0674cd5212ba96975262ace35bdf7ca683107f4bfacf4acc8b00dbe1d6f04d667c3ac8afc7d39095ca74861a367"},"ctorMsg": {"function":"listParts","args":[]}},"id": 54}'
    }).done(function (result) {
        console.log(result);
    });
}

$(document).ready(function () {
    lol();
});