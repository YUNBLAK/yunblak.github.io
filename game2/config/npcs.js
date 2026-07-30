export const NPCS = [
  { id: "inn", zone:"village", x:255, name:"엘린", role:"여관 주인", color:"#c26b64", hp:5, karma:20, schedule:"inn" },
  { id: "alchemist", zone:"village", x:555, name:"미아", role:"연금술사", color:"#965e9f", hp:5, karma:20, shop:"alchemy", schedule:"shop" },
  { id: "farmer", zone:"village", x:825, name:"토마스", role:"밀 농부", color:"#8b744f", hp:5, karma:15, schedule:"square" },
  { id: "guild", zone:"village", x:1110, name:"로웬", role:"길드 접수원", color:"#4f7893", hp:6, karma:25, schedule:"guild", combatType:"ranger" },
  { id: "smith", zone:"village", x:1410, name:"브람", role:"대장장이", color:"#965448", hp:7, karma:20, shop:"smith", schedule:"shop", combatType:"guard" },
  { id: "mage", zone:"village", x:1690, name:"세레나", role:"마법사", color:"#6157a0", hp:8, karma:25, shop:"magic", schedule:"tower", combatType:"mage" },
  { id: "traveler", zone:"village", x:1925, name:"???", role:"수상한 여행자", color:"#4a4658", hp:6, karma:10, shop:"traveler", schedule:"night", combatType:"spellblade" },
  { id: "guard", zone:"village", x:2145, name:"가렌", role:"황혼 경비대장", color:"#4e6077", hp:24, karma:15, guard:true, schedule:"gate", combatType:"captain" },
  { id: "elder", zone:"elderHouse", x:620, name:"에드윈", role:"더스크베일 촌장", color:"#7a6d78", hp:8, karma:40, schedule:"home" },
  { id: "wanderer_knight", zone:"outskirts1", x:1320, name:"카엘", role:"방랑 기사", color:"#61778c", hp:12, karma:18, schedule:"road", combatType:"guard", wander:true },
  { id: "wanderer_mage", zone:"outskirts2", x:560, name:"루나", role:"별길 마법사", color:"#7464a8", hp:10, karma:20, schedule:"road", combatType:"mage", wander:true }
  ,{ id:"moon_inn",zone:"moonbriarVillage",x:310,name:"네리아",role:"달사슴 여관 주인",color:"#617b86",hp:7,karma:20,schedule:"inn" }
  ,{ id:"moon_ranger",zone:"moonbriarVillage",x:720,name:"실바",role:"월광림 순찰대장",color:"#486d62",hp:14,karma:30,schedule:"square",combatType:"ranger" }
  ,{ id:"moon_oracle",zone:"moonbriarVillage",x:1120,name:"아일라",role:"달의 예언자",color:"#7568a7",hp:10,karma:35,shop:"moon",schedule:"tower",combatType:"mage" }
  ,{ id:"moon_guard",zone:"moonbriarVillage",x:1940,name:"오르반",role:"Moonbriar 문지기",color:"#556d75",hp:18,karma:20,guard:true,schedule:"gate",combatType:"guard" }
  ,{ id:"sun_inn",zone:"sunspireTown",x:300,name:"사피라",role:"황금잔 여관 주인",color:"#b06d56",hp:7,karma:20,schedule:"inn" }
  ,{ id:"sun_smith",zone:"sunspireTown",x:760,name:"라심",role:"태양 대장장이",color:"#9c5944",hp:13,karma:25,shop:"sunforge",schedule:"shop",combatType:"guard" }
  ,{ id:"sun_mage",zone:"sunspireTown",x:1260,name:"이슈라",role:"태양술사",color:"#a76a45",hp:12,karma:30,shop:"sunmagic",schedule:"tower",combatType:"mage" }
  ,{ id:"sun_guard",zone:"sunspireTown",x:2020,name:"자히르",role:"Sunspire 창기사",color:"#8a7258",hp:20,karma:25,guard:true,schedule:"gate",combatType:"guard" }
];

export const VILLAGE_CIVILIAN_IDS = ["inn","alchemist","farmer","guild","smith","mage","traveler","elder"];
