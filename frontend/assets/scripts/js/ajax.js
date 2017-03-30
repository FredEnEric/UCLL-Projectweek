var showAll = function (e) {
    e.preventDefault();
    listParts();
};

var listParts = function() {
        $.ajax({
        url: "http://localhost:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"e588d8e9efbc23f0910a8c7399d4e470e44ff4cb7b8947783802eb16c6e11e07b300e5d9930f6d93662793829121a59c73bbaa3587aebf3301bf0aa0691712d1"},"ctorMsg": {"function":"listParts","args":[]}},"id": 54}'
    }).done(function (result) {
            $('#partList').empty();
            $('#partList').append("<h2>Parts</h2>");
            $.each(JSON.parse(result.result.message).Parts, function (i, part) {
                var ul = "<ul>";
                $.each(part, function (key, value) {
                    ul += "<li>" + key + ": " + value + "</li>";
                });
                $('#partList').append(ul + "</ul>");
            });
        });
};

var showAddField = function (e) {
    e.preventDefault();
    $('#addField').empty().append('<form> <h2>Add a part</h2>     <label for="partID">Id</label> <input id="partID" type="text"><br> <label for="Manufacturer">Manufacturer</label> <input id="Manufacturer" type="text"><br> <label for="Notes">Notes</label> <input id="Notes" type="text"><br> <label for="PartIds">PartIds</label> <input id="PartIds" type="text"><br> <label for="Specification">Specification</label> <input id="Specification" type="text"><br> <a id="addnewpart" href="#">add</a> <a id="stop" href="#">cancel</a> </form>')

};

var stop = function (e) {
    e.preventDefault();
    $('#addField').empty();
};

var addone = function (e) {
    e.preventDefault();
    CreatePart($('#partID').val(), $('#Manufacturer').val(), $('#PartIds').val(), $('#Specification').val(), $('#Notes').val());
};

var CreatePart = function(Id, Manufacturer, PartIds, Specification, Notes){
    $.ajax({
        url: "http://localhost:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
         data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"e588d8e9efbc23f0910a8c7399d4e470e44ff4cb7b8947783802eb16c6e11e07b300e5d9930f6d93662793829121a59c73bbaa3587aebf3301bf0aa0691712d1"},"ctorMsg": {"function":"CreatePart","args":["'+Id+'","'+Manufacturer+'","'+PartIds+'","'+Specification+'","'+Notes+'"]}},"id": 55}'
    }).done(function (result) {
        $('#addField').empty();
        listParts();
    });
};

var GetPart = function(Id){
    $.ajax({
        url: "http://localhost:7050/chaincode",
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
         data: '{"jsonrpc": "2.0","method": "query","params": {"type": 1,"chaincodeID":{"name":"e588d8e9efbc23f0910a8c7399d4e470e44ff4cb7b8947783802eb16c6e11e07b300e5d9930f6d93662793829121a59c73bbaa3587aebf3301bf0aa0691712d1"},"ctorMsg": {"function":"GetPart","args":["'+Id+'"]}},"id": 56}'
    }).done(function (result) {
        console.log(result);
    });
};

$(document).ready(function (){
   $('#showAllParts').on('click', showAll);
   $('#addPart').on('click', showAddField);
   $('#addField').on('click', 'a#stop', stop);
   $('#addField').on('click', 'a#addnewpart', addone);
});