module.exports = (client) => async(event) =>{
  const msg = event.message;
  const input = msg.patternMatch["input"].trim();
  const text = input.substring(3, input.length).trim().toLowerCase();
  const arrOfTxt = text.split("");
  const obj = {
    a:"🄰",b:"🄱",c:"🄲",d:"🄳",e:"🄴",f:"🄵",g:"🄶",h:"🄷",i:"🄸",j:"🄹",k:"🄺",l:"🄻",m:"🄼",n:"🄽",o:"🄾",p:"🄿",q:"🅀",r:"🅁",s:"🅂",t:"🅃",u:"🅄",v:"🅅",w:"🅆",x:"🅇",y:"🅈",z:"🅉"
  };

  let sendThis = "";

  arrOfTxt.forEach(val => {
    if(val in obj){ 
      sendThis = sendThis + obj[val];
    }else{ 
      sendThis = sendThis + val;
    }
  });

  await client.editMessage(msg.chatId,{message:msg.id,text:sendThis});

  
}