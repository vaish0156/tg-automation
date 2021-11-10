const fs = require("fs");
const path = require("path");
const text2png = require("text2png");

module.exports = (client) => async(event) =>{
  const msg = event.message;
  const input = msg.patternMatch["input"].trim();
  const text = input.substring(4, input.length).trim();
  const imagesFolder = path.join(__dirname,"..","media");
  const image = path.join(
    imagesFolder,
    "image.png"
  );

  msg.delete({revoke:true})
  
  fs.writeFileSync(image, text2png(text,{
    font: "50px Futura",
    localFontPath: "futura medium bt.ttf",
    localFontName: "futura",
    color: 'teal',
    backgroundColor: 'linen',
    lineSpacing: 10,
    padding: 20
  }));

  const replyMsgId = msg.replyToMsgId;

  try{
    await client.sendFile(msg.chatId,{
      file:image,
      replyTo : replyMsgId
    });
    fs.unlinkSync(image);
  }catch(err){
    if(err.errorMessage == "FLOOD"){
      setTimeout(async()=>{
        await client.sendFile(msg.chatId,{
          file:image,
          replyTo : replyMsgId
        });
        fs.unlinkSync(image);
      }, err.seconds*1000);
    }
  }

  

}