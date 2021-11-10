const axios = require("axios");

module.exports = (client) => async(event) =>{
  const msg = event.message;
  // msg.delete({revoke:true});
  
  const input = msg.patternMatch["input"].trim();
  const text = input.substring(8, input.length).trim();
  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;

  try{
    const {data} = await axios.get(api);
    let sendThis = `Word : ${text} \n\n`;
  
    data[0].meanings.map(val => {
      sendThis = sendThis + "👉 " + val.definitions[0].definition + "\n";
    });

    await client.editMessage(msg.chatId,{message:msg.id,text:sendThis});

  }catch(err){
    await client.editMessage(msg.chatId,{message:msg.id,text:`Couldn't find meaning for ${text}`});
  }

}