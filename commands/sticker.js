module.exports = (client) => async(event) =>{
  const msg = event.message;
  msg.delete({revoke:true});

  const input = msg.patternMatch["input"].trim();
  const emoji = input.substring(8, input.length).trim();
  const replyMsgId = msg.replyToMsgId;

  await client.sendMessage("@stickers",{message:"/addsticker"});
  await client.sendMessage("@stickers",{message:"My123stickerpack123456"});
  await client.forwardMessages("@stickers", {
    messages:[replyMsgId],
    fromPeer:msg.chatId
  });
  await client.sendMessage("@stickers", {message:emoji});
  setTimeout(async()=>{
    await client.sendMessage("@stickers", {message:"/done"});
  },2000);
  
}