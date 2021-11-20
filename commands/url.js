module.exports = (client) => async(event) =>{
  try{
    if(event.message.message.includes("<a href") && event.message.message.includes("</a>")){
      await client.editMessage(event.message.chatId, {
        message : event.message.id,
        text:event.message.message,
        linkPreview:false,
        parseMode:"html"
      });
    }
  }catch(err){}
}