// setups
const express = require("express");
const app = express();
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { NewMessage } = require("telegram/events");

const apiId = parseInt(process.env['API_ID']);
const apiHash = process.env['API_HASH'];
const session = new StringSession(process.env['SESSION']); 
const client = new TelegramClient(session, apiId, apiHash, {});
const PORT = process.env.PORT || 8080;

// commands import
const alive = require("./commands/alive");
const spam = require("./commands/spam");
const weather = require("./commands/weather");
const yt = require("./commands/yt");
const speak = require("./commands/speak");
const pic = require("./commands/pic");
const sticker = require("./commands/sticker");
const url = require("./commands/url");
const meaning = require("./commands/meaning");

// All commands executing

(async function(){
  await client.connect();
  console.log("--------------BOT IS WORKING--------------")

  client.addEventHandler(alive(client), new NewMessage({ outgoing:true, pattern:/^.alive/ }));
  client.addEventHandler(spam(client), new NewMessage({ outgoing:true, pattern:/^.spam */}));
  client.addEventHandler(weather(client), new NewMessage({ outgoing:true, pattern:/^.weather */ }));
  client.addEventHandler(yt(client), new NewMessage({ outgoing:true, pattern:/^.yt */ }));
  client.addEventHandler(speak(client), new NewMessage({ outgoing:true, pattern:/^.speak */ }));
  client.addEventHandler(pic(client), new NewMessage({ outgoing:true, pattern:/^.pic */ }));
  client.addEventHandler(sticker(client), new NewMessage({ outgoing:true, pattern:/^.sticker */ }));
  client.addEventHandler(url(client), new NewMessage({outgoing:true, pattern:/^.url */}));
  client.addEventHandler(meaning(client), new NewMessage({outgoing:true, pattern:/^.meaning */}));
  
})()

// server
app.get("*",(req,res)=>{
  res.send("<h1>Yooo! App is working</h1>");
});
app.listen(PORT);