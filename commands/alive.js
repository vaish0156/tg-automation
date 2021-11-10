module.exports = (client) => async(event) =>{
  const msg = event.message;
  const sendThis = `Hey I am bot of <a href="https://t.me/spacetastic">Saurav</a> \nHe made me own his own, no 3rd party bot!!`;
  await client.editMessage(msg.chatId, {
    message : msg.id,
    text:sendThis,
    linkPreview:false,
    parseMode:"html"
  });
}