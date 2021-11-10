const tts = require("google-translate-tts");
const fs = require("fs");
const path = require("path");

module.exports = (client) => async(event) =>{
  const msg = event.message;
  const input = msg.patternMatch["input"].trim();
  const text = input.substring(6, input.length).trim();
  const audiosFolder = path.join(__dirname, "..","media");
  const voice = tts.voices.findByCode("en");
  const audio = path.join(
    audiosFolder,
    "audio.mp3"
  );

  const buffer = await tts.synthesize({
      text: text,
      voice: "en",
  });
      
  fs.writeFileSync(audio, buffer);
  msg.delete({revoke : true});

  const replyMsgId = msg.replyToMsgId;

  try{

    await client.sendFile(msg.chatId, {
      file : audio,
      voiceNote:true,
      replyTo : replyMsgId
    });

    fs.unlinkSync(audio);

  }catch(err){
    if(err.errorMessage == "FLOOD"){
      setTimeout(async()=>{
        await client.sendFile(msg.chatId, {
          file : audio,
          voiceNote:true,
          replyTo : replyMsgId
        });
      fs.unlinkSync(audio);
      }, err.seconds*1000);
    }
  }

};