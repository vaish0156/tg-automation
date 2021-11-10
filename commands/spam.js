module.exports = (client) => async(event) =>{
    const msg = event.message;
    msg.delete({revoke:true});

    const theSpam = msg.patternMatch['input'];
    const sendThis = theSpam.substring(6,theSpam.length).trim();
    const noOfSpam = sendThis.split(" ")[0].trim();
    const txtOfSpam = sendThis.substring(noOfSpam.length+1, sendThis.length);

    for(let i = 0; i < noOfSpam; i++){
      await client.sendMessage(msg.chatId, { message : txtOfSpam });
    }
}