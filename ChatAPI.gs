function getSpaces() {
  const idToken = ScriptApp.getOAuthToken();
  const url = "https://chat.googleapis.com/v1/spaces";
  const options = {
    "method": "get",
    'contentType': "application/json",
    "headers": {"Authorization": "Bearer " + idToken },
    "muteHttpExceptions" : true,
  };
  let value = UrlFetchApp.fetch(url,options);
  let json = JSON.parse(value.getContentText());
  return json;
}

function getmessages(space,pageToken){
  const idToken = ScriptApp.getOAuthToken();
  const url = "https://chat.googleapis.com/v1/spaces/" + space + "/messages?showDeleted=false&pageToken="+pageToken;
  const options = {
    "method": "get",
    'contentType': "application/json",
    "headers": {"Authorization": "Bearer " + idToken },
    "muteHttpExceptions" : true,
  };
  let value = UrlFetchApp.fetch(url,options);
  let json = JSON.parse(value.getContentText());
  return json;
}
