const axios = require("axios");
const apiKey = process.env['OWM_API_KEY'];

module.exports = (client) => async(event) =>{
  const msg = event.message;

  const input = msg.patternMatch['input'].trim();
  const place = input.substring(8, input.length).trim();
  const link = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

  try{
  const { data } = await axios.get(link)
  
  const sendThis = `This is the weather report for ${data.name} : \n\n👉Temperature : ${data.main.temp} ℃ \n👉Description : ${data.weather.description} \n👉Pressure : ${data.main.pressure} \n👉Humidity : ${data.main.humidity} \n👉Wind speed : ${data.wind.speed}`;

  await client.editMessage(msg.chatId,{message:msg.id,text:sendThis});
  }catch(err){
  await client.editMessage(msg.chatId,{message:msg.id,text:`Couldn't find weather for "${place}"`});
  }

  
}