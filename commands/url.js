module.exports = (client) => async(event) =>{
  try{
    await client.editMessage(event.message.chatId, {
      message : event.message.id,
      text:event.message.message,
      linkPreview:false,
      parseMode:"html"
    });
  }catch(err){}
}