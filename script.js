//This Function is created to validate form data
$("#fname").focus();
function validateAndGetFormData() {
    var fnameVar = $("#fname").val();
    if (fnameVar === "") {
        alert("First Name Required");
        $("#fname").focus();
        return "";
    }
    var lnameVar = $("#lname").val();
    if (lnameVar === "") {
        alert("Enter Last Name");
        $("#lname").focus();
        return "";
    }
    var mobileVar = $("#mobile").val();
    if (mobileVar === "") {
        alert("Mobile Number is required");
        $("#mobile").focus();
        return "";
    }
    var relVar = $("#rel").val();
    if (relVar === "") {
        alert("Relation Is Required");
        $("#rel").focus();
        return "";
    }
    var addrVar = $("#addr").val();
    if (addrVar === "") {
        alert("Address is required");
        $("#addr").focus();
        return "";
    }
    var jsonStrObj = {
        fname: fnameVar,
        lname: lnameVar,
        mobile: mobileVar,
        relation: relVar,
        address: addrVar
    };
    return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
        + "\"token\" : \""
        + connToken
        + "\","
        + "\"dbName\": \""
        + dbName
        + "\",\n" + "\"cmd\" : \"PUT\",\n"
        + "\"rel\" : \""
        + relName + "\","
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return putRequest;
}
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function resetForm() {
    $("#fname").val("")
    $("#lname").val("");
    $("#mobile").val("");
    $("#rel").val("");
    $("#addr").val("");
    $("#fname").focus();
}
       //  Main Function
function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90939081|-31949283244580161|90946380",jsonStr, "Familydb", "guest");
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(putReqStr,"http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
}