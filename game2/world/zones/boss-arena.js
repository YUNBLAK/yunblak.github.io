export default {
  id:"bossArena",name:"THE ASHEN BRIDGE",subtitle:"보스 지역 · 재의 수문장",width:1800,spawn:150,safe:false,npcs:[],
  platforms:[{x:0,y:438,w:1800,h:102,kind:"bridge"}],
  enemies:[["warden",1180,438]],nightEnemies:[],crystals:[],
  secrets:[{id:"bridge_ashes",x:890,reward:"high_potion",label:"재더미 속 기사 가방"}],
  props:[{type:"flag",x:350},{type:"barrel",x:690},{type:"flag",x:1460}],
  exits:[{x:42,target:"outskirts2",spawn:3250,label:"버려진 왕도로 후퇴"},{x:1710,target:"dungeon",spawn:125,label:"폐허 던전으로"}],
  adjacent:["outskirts2","dungeon"],boss:"warden"
};
