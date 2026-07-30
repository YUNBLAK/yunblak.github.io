export const NPC_HOMES = [
  { zone:"village",x:100,floor:438,color:"#8d6651",ownerId:"inn" },
  { zone:"village",x:420,floor:438,color:"#815969",ownerId:"alchemist" },
  { zone:"village",x:750,floor:438,color:"#8c6c52",ownerId:"farmer" },
  { zone:"village",x:1040,floor:438,color:"#71544f",ownerId:"guild",style:"guild",width:160 },
  { zone:"village",x:1280,floor:438,color:"#7f594c",ownerId:"smith" },
  { zone:"village",x:1580,floor:438,color:"#6c5b7e",ownerId:"mage" },
  { zone:"village",x:1850,floor:438,color:"#605364",ownerId:"traveler" },
  { zone:"moonbriarVillage",x:150,floor:438,color:"#536376",ownerId:"moon_inn" },
  { zone:"moonbriarVillage",x:460,floor:438,color:"#5e5474" },
  { zone:"moonbriarVillage",x:770,floor:438,color:"#48666b",ownerId:"moon_ranger" },
  { zone:"moonbriarVillage",x:1210,floor:438,color:"#625777",ownerId:"moon_oracle" },
  { zone:"moonbriarVillage",x:1510,floor:438,color:"#4d626f" },
  { zone:"moonbriarVillage",x:1820,floor:438,color:"#5b526d",ownerId:"moon_guard" },
  { zone:"sunspireTown",x:130,floor:438,color:"#a7694d",ownerId:"sun_inn" },
  { zone:"sunspireTown",x:430,floor:438,color:"#b47750" },
  { zone:"sunspireTown",x:730,floor:438,color:"#976049",ownerId:"sun_smith" },
  { zone:"sunspireTown",x:1240,floor:438,color:"#ad714c",ownerId:"sun_mage" },
  { zone:"sunspireTown",x:1540,floor:438,color:"#9e644a" },
  { zone:"sunspireTown",x:1880,floor:438,color:"#a96e4e",ownerId:"sun_guard" }
];

export function homesForZone(zoneId) {
  return NPC_HOMES.filter((home) => home.zone === zoneId);
}
