module.exports = (client) => async(event) =>{
  const msg = event.message;
  const input = msg.patternMatch["input"].trim();
  const text = input.substring(4, input.length).trim();
  
  await client.editMessage(msg.chatId, {
    message : msg.id,
    text : text,
    linkPreview:false,
    parseMode:"html"
  });
}