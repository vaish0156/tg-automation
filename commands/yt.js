const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");

module.exports = (client) => async(event) =>{
  const msg = event.message;
  const input = msg.patternMatch["input"].trim();
  const url = input.substring(3, input.length).trim();

  msg.delete({ revoke : true });

  const info = await ytdl.getInfo(url);

  const videosFolder = path.join(__dirname, "..","media");
  const video = path.join(
    videosFolder,
    "video.mp4"
  );

  const streamer = fs.createWriteStream(video);
  ytdl(url).pipe(streamer);

  const waitMsg = await client.sendMessage(msg.chatId, {
    message : "Sending video..."
  });

  streamer.on("finish", async()=>{
    await client.sendFile(msg.chatId, {
      file : video,
      caption: info.videoDetails.title
    });

    await client.deleteMessages(msg.chatId,[waitMsg.id],{
      revoke:true,
    });

    fs.unlinkSync(video);
  });

  
};