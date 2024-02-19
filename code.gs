
function createSheet(){
  const data = getChatData("Space ID");
  console.log(data)
  return
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  const range = sheet[0].getRange(1,1,data.length,data[0].length);
  range.setValues(data);
}

function getChatData(space) {
  let pageToken = "";
  let value = "";
  let line = new Array();
  let stamp = new Array(); 
  let count = 0;
  let page = new Array();
  page.push(['日付','タイトル','サブタイトル','リアクション','総数']);

  do{
    value = getmessages(space,pageToken);
    pageToken = value.nextPageToken;
    for(message of value.messages){
      line.push(message.createTime);

      if(undefined == message.cardsV2){
        line.push(message.formattedText);
        line.push("");
      } else {
        line.push(message.cardsV2[0].card.header.title);
        line.push(message.cardsV2[0].card.header.subtitle);
      }
      if (undefined == message.emojiReactionSummaries){
        line.push("")
        line.push(count);
      } else{
        for(emojiReaction of message.emojiReactionSummaries){
          stamp.push(emojiReaction.emoji.unicode + ":" + emojiReaction.reactionCount);
          count = count + emojiReaction.reactionCount;
        }
        line.push(stamp.join(" "))
        line.push(count);
      }

      page.push(line);
      line = new Array();
      stamp = new Array();
      count = 0;
    }
  }while(pageToken != undefined)
  return page;
}
