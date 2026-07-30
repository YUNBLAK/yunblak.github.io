function introClamp(value,min = 0,max = 1) {
  return Math.max(min,Math.min(max,value));
}

function introEase(value) {
  const t = introClamp(value);
  return t * t * (3 - 2 * t);
}

function introPx(ctx,x,y,w,h,color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));
}

function introGradient(ctx,x0,y0,x1,y1,stops) {
  const gradient = ctx.createLinearGradient(x0,y0,x1,y1);
  stops.forEach(([offset,color]) => gradient.addColorStop(offset,color));
  return gradient;
}

function introGlow(ctx,x,y,radius,color,alpha = 1) {
  const gradient = ctx.createRadialGradient(x,y,0,x,y,radius);
  gradient.addColorStop(0,color);
  gradient.addColorStop(.35,color);
  gradient.addColorStop(1,"rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius,y - radius,radius * 2,radius * 2);
  ctx.restore();
}

function introHills(ctx,baseY,color,offset,amplitude,step = 150) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0,540);
  ctx.lineTo(0,baseY);
  for (let x=0;x<=1020;x+=step) {
    const peak = baseY - amplitude * (.45 + .55 * Math.abs(Math.sin((x + offset) * .009)));
    ctx.lineTo(x + step * .48,peak);
    ctx.lineTo(x + step,baseY + Math.sin((x + offset) * .017) * 11);
  }
  ctx.lineTo(1020,540);
  ctx.closePath();
  ctx.fill();
}

function introCloud(ctx,x,y,scale,color,alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  introPx(ctx,x,y,88 * scale,15 * scale,color);
  introPx(ctx,x + 18 * scale,y - 12 * scale,51 * scale,18 * scale,color);
  introPx(ctx,x + 34 * scale,y - 21 * scale,28 * scale,20 * scale,color);
  ctx.restore();
}

function introFlame(ctx,x,y,scale,time,index = 0) {
  const sway = Math.sin(time * .006 + index * 1.7) * 3 * scale;
  introGlow(ctx,x,y - 16 * scale,34 * scale,"rgba(255,93,38,.42)",.75);
  ctx.fillStyle = "#8e2736";
  ctx.beginPath();
  ctx.moveTo(x - 9 * scale,y);
  ctx.lineTo(x - 5 * scale + sway,y - 24 * scale);
  ctx.lineTo(x + sway * .4,y - 14 * scale);
  ctx.lineTo(x + 5 * scale + sway,y - 36 * scale);
  ctx.lineTo(x + 10 * scale,y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff7a3d";
  ctx.beginPath();
  ctx.moveTo(x - 5 * scale,y);
  ctx.lineTo(x + sway * .45,y - 23 * scale);
  ctx.lineTo(x + 6 * scale,y);
  ctx.closePath();
  ctx.fill();
  introPx(ctx,x - 2 * scale,y - 9 * scale,4 * scale,9 * scale,"#ffd36a");
}

function introSword(ctx,x,y,scale,angle,color = "#e8d7c1") {
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(angle);
  introPx(ctx,-2 * scale,-39 * scale,4 * scale,39 * scale,color);
  introPx(ctx,-1 * scale,-47 * scale,2 * scale,8 * scale,"#fff1c9");
  introPx(ctx,-8 * scale,-3 * scale,16 * scale,3 * scale,"#d29a57");
  introPx(ctx,-2.5 * scale,0,5 * scale,11 * scale,"#6c3b3c");
  ctx.restore();
}

function introHuman(ctx,x,ground,scale,face = 1,pose = 0,colors = {}) {
  const armor = colors.armor || "#8793a5";
  const cloth = colors.cloth || "#8e4054";
  const skin = colors.skin || "#d9a27b";
  const weaponAngle = Number.isFinite(colors.weaponAngle)
    ? colors.weaponAngle
    : .42 + Math.sin(pose * .7) * .2;
  const weaponScale = Number.isFinite(colors.weaponScale) ? colors.weaponScale : 1;
  ctx.save();
  ctx.translate(x,ground);
  ctx.scale(face * scale,scale);
  const stride = Math.sin(pose) * 5;
  introPx(ctx,-11,-21 + Math.max(0,stride),8,21,"#353949");
  introPx(ctx,3,-21 + Math.max(0,-stride),8,21,"#303442");
  introPx(ctx,-13,-50,26,31,cloth);
  introPx(ctx,-10,-55,20,27,armor);
  introPx(ctx,-15,-52,5,16,"#b8a786");
  introPx(ctx,10,-52,5,17,armor);
  introPx(ctx,-9,-70,18,16,skin);
  introPx(ctx,-11,-72,22,7,"#656d7e");
  introPx(ctx,-12,-77,20,6,"#4a5262");
  introPx(ctx,3,-66,3,2,"#2b2730");
  if (colors.weapon !== false) {
    introSword(ctx,13,-42,weaponScale,weaponAngle,colors.sword || "#efe1c5");
  }
  ctx.restore();
}

function introDemon(ctx,x,ground,scale,face = -1,pose = 0,alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x,ground);
  ctx.scale(face * scale,scale);
  const pulse = Math.sin(pose) * 2;
  introPx(ctx,-13,-29,10,29,"#321d32");
  introPx(ctx,4,-29,10,29,"#281829");
  introPx(ctx,-18,-62 + pulse,36,36,"#57203b");
  introPx(ctx,-13,-72 + pulse,26,18,"#6f2945");
  ctx.fillStyle = "#211323";
  ctx.beginPath();
  ctx.moveTo(-12,-70 + pulse);ctx.lineTo(-26,-91 + pulse);ctx.lineTo(-5,-79 + pulse);ctx.fill();
  ctx.beginPath();
  ctx.moveTo(12,-70 + pulse);ctx.lineTo(26,-91 + pulse);ctx.lineTo(5,-79 + pulse);ctx.fill();
  introPx(ctx,-8,-67 + pulse,5,3,"#ff594f");
  introPx(ctx,4,-67 + pulse,5,3,"#ff594f");
  introGlow(ctx,0,-58 + pulse,34,"rgba(207,35,68,.28)",.7);
  ctx.strokeStyle = "#bd3c54";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-15,-48);ctx.quadraticCurveTo(-35,-42,-42,-25);ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(15,-48);ctx.quadraticCurveTo(34,-38,44,-17);ctx.stroke();
  ctx.restore();
}

function introAngel(ctx,x,y,scale,time) {
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(scale,scale);
  const wing = 4 + Math.sin(time * .003) * 3;
  introGlow(ctx,0,-18,125,"rgba(255,231,146,.5)",1);
  ctx.fillStyle = "rgba(255,244,198,.82)";
  ctx.beginPath();
  ctx.moveTo(-10,-28);ctx.bezierCurveTo(-60,-90,-128,-74,-150,-16);
  ctx.bezierCurveTo(-100,-40,-65,4,-13,18);ctx.closePath();ctx.fill();
  ctx.beginPath();
  ctx.moveTo(10,-28);ctx.bezierCurveTo(60,-90,128,-74,150,-16);
  ctx.bezierCurveTo(100,-40,65,4,13,18);ctx.closePath();ctx.fill();
  for (let i=0;i<5;i++) {
    ctx.strokeStyle = `rgba(255,226,142,${.42 - i * .045})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-14,-20 + i * 7);
    ctx.quadraticCurveTo(-72 - i * 9,-58 + i * 2,-132 - wing,-21 + i * 9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(14,-20 + i * 7);
    ctx.quadraticCurveTo(72 + i * 9,-58 + i * 2,132 + wing,-21 + i * 9);
    ctx.stroke();
  }
  introPx(ctx,-17,-58,34,66,"#fff0bd");
  introPx(ctx,-12,-77,24,22,"#f7d6a0");
  introPx(ctx,-16,-82,32,7,"#fff5c9");
  ctx.strokeStyle = "#fff3b3";
  ctx.lineWidth = 4;
  ctx.beginPath();ctx.ellipse(0,-92,24,7,0,0,Math.PI * 2);ctx.stroke();
  ctx.restore();
}

function introKarmaRune(ctx,x,y,scale,time,alpha = 1) {
  const pulse = 1 + Math.sin(time * .007) * .08;
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(scale * pulse,scale * pulse);
  ctx.globalAlpha = alpha;
  introGlow(ctx,0,0,48,"rgba(228,32,62,.48)",1);
  ctx.strokeStyle = "#ff4059";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0,0,18,Math.PI * .18,Math.PI * 1.82);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-14,-13);ctx.lineTo(13,14);
  ctx.moveTo(14,-14);ctx.lineTo(-13,13);
  ctx.moveTo(0,-27);ctx.lineTo(0,-13);
  ctx.stroke();
  introPx(ctx,-3,-3,6,6,"#fff0c5");
  ctx.restore();
}

function introHouse(ctx,x,ground,scale,wall,roof,lit = true) {
  introPx(ctx,x,ground - 82 * scale,104 * scale,82 * scale,wall);
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(x - 12 * scale,ground - 82 * scale);
  ctx.lineTo(x + 52 * scale,ground - 128 * scale);
  ctx.lineTo(x + 116 * scale,ground - 82 * scale);
  ctx.closePath();
  ctx.fill();
  introPx(ctx,x + 43 * scale,ground - 46 * scale,22 * scale,46 * scale,"#4a3137");
  introPx(ctx,x + 13 * scale,ground - 60 * scale,20 * scale,21 * scale,lit ? "#f5b85f" : "#292835");
  introPx(ctx,x + 74 * scale,ground - 60 * scale,20 * scale,21 * scale,lit ? "#f5b85f" : "#292835");
  introPx(ctx,x + 17 * scale,ground - 58 * scale,3 * scale,17 * scale,"#8e5c45");
  introPx(ctx,x + 78 * scale,ground - 58 * scale,3 * scale,17 * scale,"#8e5c45");
}

function introTree(ctx,x,ground,scale,color = "#28333b") {
  introPx(ctx,x - 8 * scale,ground - 86 * scale,16 * scale,86 * scale,"#4b3337");
  introPx(ctx,x - 34 * scale,ground - 118 * scale,68 * scale,42 * scale,color);
  introPx(ctx,x - 26 * scale,ground - 151 * scale,54 * scale,51 * scale,color);
  introPx(ctx,x - 17 * scale,ground - 178 * scale,38 * scale,45 * scale,color);
}

function introDrawAshenWar(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#171523"],[.48,"#5a2839"],[1,"#d25b45"]]);
  ctx.fillRect(0,0,w,h);
  introGlow(ctx,790,104,120,"rgba(255,91,52,.32)",.8);
  introHills(ctx,306,"#291d2c",20,108,170);
  introHills(ctx,340,"#3d2330",92,76,130);
  introCloud(ctx,75,92,1.25,"#29202f",.75);
  introCloud(ctx,615,67,1.6,"#2b202e",.68);
  introPx(ctx,0,356,w,184,"#241b27");
  for (let i=0;i<7;i++) introFlame(ctx,45 + i * 151,365,1 + i%2 * .25,time,i);
  for (let i=0;i<20;i++) {
    const sparkX = (i * 83 + time * (.018 + i%4 * .004)) % w;
    const sparkY = 330 - ((i * 37 + time * .04) % 180);
    introPx(ctx,sparkX,sparkY,i%5===0?3:2,i%5===0?5:3,i%3 ? "#ff8b48" : "#ffd06a");
  }
  introHuman(ctx,138,381,1.05,1,time * .012,{cloth:"#7b4250"});
  introHuman(ctx,235,385,.92,1,time * .014 + 1.4,{armor:"#9ca7b4"});
  introHuman(ctx,326,382,1.12,1,time * .011 + 2.3,{cloth:"#5f526e"});
  introHuman(ctx,410,382,1.08,1,time * .016,{armor:"#a2a8b2",cloth:"#70404d",weaponAngle:.78});
  introDemon(ctx,830,386,1.18,-1,time * .01,.98);
  introDemon(ctx,733,382,.96,-1,time * .013 + 2,.94);
  introDemon(ctx,638,384,1.08,-1,time * .012 + 4,.95);
  introDemon(ctx,525,384,1.05,-1,time * .016 + 1,.98);
  ctx.save();
  ctx.globalAlpha = .36 + Math.sin(time * .012) * .12;
  introGlow(ctx,466,309,74,"rgba(255,222,151,.76)",1);
  for (let spark=0;spark<12;spark++) {
    const angle = spark / 12 * Math.PI * 2 + Math.sin(time * .001 + spark) * .08;
    const radius = 10 + ((time * .018 + spark * 11) % 34);
    const size = spark%4 === 0 ? 3 : 2;
    introPx(
      ctx,
      466 + Math.cos(angle) * radius,
      309 + Math.sin(angle) * radius,
      size,size,
      spark%3 ? "#ffd991" : "#fff1bf"
    );
  }
  ctx.restore();
}

function introDrawAngelicGrace(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#17182b"],[.52,"#3d3852"],[1,"#9d6957"]]);
  ctx.fillRect(0,0,w,h);
  introHills(ctx,342,"#252338",35,85,170);
  introPx(ctx,0,367,w,173,"#262333");
  const descend = introEase(introClamp(p * 2.2));
  introAngel(ctx,480,115 + (1 - descend) * -90,1.05,time);
  for (let ray=0;ray<7;ray++) {
    const x = 245 + ray * 78;
    ctx.save();
    ctx.globalAlpha = .08 + .11 * Math.sin(time * .002 + ray) ** 2;
    ctx.fillStyle = "#ffe69a";
    ctx.beginPath();
    ctx.moveTo(480 + (ray - 3) * 18,120);
    ctx.lineTo(x - 38,367);
    ctx.lineTo(x + 38,367);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  [238,330,420].forEach((x,i) => introHuman(ctx,x,389,.95,1,time * .004 + i,{armor:"#aab4bd",cloth:"#705264"}));
  [760,840,900].forEach((x,i) => introDemon(ctx,x + p * 55,386,.92,-1,time * .006 + i,1 - p * .65));
  introGlow(ctx,480,319,190,"rgba(255,221,133,.18)",.8);
  for (let i=0;i<18;i++) {
    const x = 190 + (i * 41) % 590;
    const y = 330 - ((time * .025 + i * 29) % 210);
    introPx(ctx,x,y,2,5,i%3 ? "#ffe9aa" : "#fff7d2");
  }
}

function introDrawKarmaSeed(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,w,h,[[0,"#110d18"],[.55,"#281528"],[1,"#4d202e"]]);
  ctx.fillRect(0,0,w,h);
  introGlow(ctx,255,242,235,"rgba(125,24,53,.28)",1);
  ctx.save();
  ctx.translate(185,368);
  ctx.scale(2.65,2.65);
  introDemon(ctx,0,0,1,1,time * .008,1);
  ctx.restore();
  ctx.fillStyle = "#30142b";
  ctx.beginPath();
  ctx.moveTo(340,276);
  ctx.bezierCurveTo(430,235,465,248,530,294);
  ctx.lineTo(516,330);
  ctx.bezierCurveTo(450,302,405,309,344,338);
  ctx.closePath();
  ctx.fill();
  for (let finger=0;finger<4;finger++) {
    ctx.strokeStyle = "#7a2945";
    ctx.lineWidth = 8 - finger;
    ctx.beginPath();
    ctx.moveTo(490,298 + finger * 8);
    ctx.quadraticCurveTo(548 + finger * 5,272 + finger * 4,610,298 + finger * 2);
    ctx.stroke();
  }
  introHuman(ctx,716,407,1.55,-1,0,{armor:"#6d7180",cloth:"#544354"});
  const runeAlpha = introClamp((p - .18) * 3.2);
  introKarmaRune(ctx,716,323,1.25,time,runeAlpha);
  for (let i=0;i<12;i++) {
    const a = i / 12 * Math.PI * 2 + time * .0005;
    const radius = 38 + ((time * .025 + i * 13) % 120);
    ctx.save();ctx.globalAlpha = runeAlpha * (1 - radius / 190);
    introPx(ctx,716 + Math.cos(a) * radius,323 + Math.sin(a) * radius * .55,3,3,"#ef3d58");
    ctx.restore();
  }
  ctx.fillStyle = "rgba(233,63,82,.15)";
  ctx.fillRect(595,170,235,245);
}

function introDrawRedNight(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#160f1d"],[.58,"#5a2033"],[1,"#ad443a"]]);
  ctx.fillRect(0,0,w,h);
  introHills(ctx,310,"#221724",65,72,140);
  introHouse(ctx,55,390,.92,"#5a3a3a","#321d2c",false);
  introHouse(ctx,770,392,1.05,"#603c3b","#361d2b",false);
  introFlame(ctx,102,323,1.2,time,1);
  introFlame(ctx,851,309,1.35,time,2);
  introPx(ctx,0,389,w,151,"#231822");
  const aura = .7 + Math.sin(time * .005) * .12;
  introGlow(ctx,485,297,170,"rgba(41,8,39,.74)",aura);
  for (let ring=0;ring<4;ring++) {
    ctx.strokeStyle = `rgba(114,25,67,${.45 - ring * .08})`;
    ctx.lineWidth = 8 - ring;
    ctx.beginPath();
    ctx.ellipse(485,317,75 + ring * 22 + Math.sin(time * .004 + ring) * 7,112 + ring * 12,0,0,Math.PI * 2);
    ctx.stroke();
  }
  introHuman(ctx,485,402,1.55,1,time * .012,{armor:"#383443",cloth:"#321e35",skin:"#c58a72",sword:"#7d243e"});
  introKarmaRune(ctx,485,307,.76,time,1);
  introPx(ctx,476,294,5,3,"#ff4059");
  introPx(ctx,491,294,5,3,"#ff4059");
  for (const [x,y,face] of [[195,408,1],[277,414,-1],[675,410,1],[746,417,-1]]) {
    ctx.save();ctx.translate(x,y);ctx.rotate(face * .08);
    introPx(ctx,-30,-10,58,10,"#2b2330");
    introPx(ctx,20,-14,17,14,"#5c3540");
    ctx.restore();
  }
  for (let i=0;i<16;i++) {
    const x = (i * 67 + time * .021) % w;
    const y = 385 - ((i * 31 + time * .027) % 190);
    introPx(ctx,x,y,2 + i%3,3 + i%4,i%2 ? "#70263b" : "#db4b44");
  }
}

function introDrawMarked(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#171a25"],[.6,"#363242"],[1,"#71605d"]]);
  ctx.fillRect(0,0,w,h);
  introPx(ctx,0,102,w,18,"#252735");
  for (let x=0;x<w;x+=96) {
    introPx(ctx,x,70,66,32,"#2d3040");
    introPx(ctx,x + 13,41,40,29,"#343747");
  }
  introPx(ctx,0,384,w,156,"#292834");
  ctx.fillStyle = "rgba(230,210,174,.12)";
  ctx.beginPath();ctx.moveTo(480,0);ctx.lineTo(285,384);ctx.lineTo(675,384);ctx.closePath();ctx.fill();
  const prisoners = [250,340,430,520,610];
  prisoners.forEach((x,i) => {
    introHuman(ctx,x,395,.82,1,0,{armor:"#665b62",cloth:"#51404e",skin:"#bc8d74",weapon:false});
    introKarmaRune(ctx,x,340,.36,time + i * 220,1);
    introPx(ctx,x - 17,386,34,3,"#161821");
  });
  [105,185,755,835].forEach((x,i) => introHuman(ctx,x,397,1.02,i<2?1:-1,time * .003 + i,{armor:"#242b38",cloth:"#6e3344",skin:"#b98770",sword:"#d9d0b9"}));
  introPx(ctx,692,225,13,160,"#231c25");
  introPx(ctx,812,225,13,160,"#231c25");
  introPx(ctx,685,218,147,15,"#31252e");
  introPx(ctx,742,233,12,65,"#9b806d");
  introPx(ctx,755,233,12,65,"#9b806d");
  ctx.save();ctx.globalAlpha = .2 + Math.sin(time * .003) * .05;
  introGlow(ctx,480,328,190,"rgba(224,56,73,.24)",1);
  ctx.restore();
}

function introDrawFugitive(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#161c2b"],[.58,"#283848"],[1,"#755045"]]);
  ctx.fillRect(0,0,w,h);
  introGlow(ctx,770,122,70,"rgba(241,197,112,.27)",1);
  introHills(ctx,315,"#1c2633",time * .018,72,150);
  introHills(ctx,352,"#26313b",time * .032,54,110);
  for (let i=0;i<9;i++) introTree(ctx,70 + i * 125 - (time * .025 % 125),389,.72 + i%3 * .08,i%2 ? "#25363b" : "#2d3b40");
  introPx(ctx,0,389,w,151,"#24262d");
  introPx(ctx,0,405,w,8,"#4e4540");
  for (let i=0;i<8;i++) {
    const x = 84 + i * 121 - (time * .07 % 121);
    introPx(ctx,x,414,58,4,"#695747");
    introPx(ctx,x + 13,422,31,3,"#3b3535");
  }
  const heroBob = Math.abs(Math.sin(time * .014)) * 4;
  introHuman(ctx,535,397 - heroBob,1.17,1,time * .02,{
    armor:"#7c8795",cloth:"#7c4050",sword:"#e8d8bc",weaponAngle:-.82,weaponScale:1.12
  });
  introKarmaRune(ctx,535,325,.4,time,.72);
  [92,172,253].forEach((x,i) => {
    introHuman(ctx,x,401,1,1,time * .017 + i,{armor:"#343b49",cloth:"#633546",sword:"#c5bcaa"});
    introFlame(ctx,x - 18,346,.55,time,i);
  });
  for (let i=0;i<20;i++) {
    const x = (i * 61 - time * .09 + w * 2) % w;
    const y = 175 + (i * 43 % 205);
    introPx(ctx,x,y,i%4===0?5:3,2,i%2 ? "#80917d" : "#596b61");
  }
}

function introDrawDuskvale(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#493f69"],[.46,"#d17a68"],[.76,"#f2ad6c"],[1,"#5f493f"]]);
  ctx.fillRect(0,0,w,h);
  const sunX = 725;
  const sunY = 154;
  introGlow(ctx,sunX,sunY,120,"rgba(255,211,127,.42)",1);
  ctx.fillStyle = "#ffd488";
  ctx.beginPath();ctx.arc(sunX,sunY,34,0,Math.PI * 2);ctx.fill();
  introCloud(ctx,95,92,1.1,"#aa6e71",.62);
  introCloud(ctx,598,72,1.3,"#b97777",.48);
  introHills(ctx,300,"#443b51",30,95,180);
  introHills(ctx,342,"#5b4a4d",100,62,135);
  introPx(ctx,0,383,w,157,"#5a493d");
  introPx(ctx,0,399,w,12,"#86644d");
  introHouse(ctx,515,394,.92,"#8f6049","#5b3642",true);
  introHouse(ctx,700,397,1.05,"#91634d","#573543",true);
  introHouse(ctx,858,396,.74,"#87604e","#503441",true);
  introTree(ctx,455,395,.78,"#334746");
  introTree(ctx,930,395,.7,"#314342");
  introPx(ctx,340,254,16,141,"#49383a");
  introPx(ctx,452,254,16,141,"#49383a");
  introPx(ctx,326,245,156,17,"#65474a");
  introPx(ctx,365,267,12,128,"#302c35");
  introPx(ctx,430,267,12,128,"#302c35");
  introPx(ctx,377,267,53,9,"#5d4745");
  for (let y=285;y<370;y+=19) introPx(ctx,377,y,53,4,"#4c3d40");
  const arrival = introEase(introClamp((p - .08) * 1.45));
  const heroX = 70 + arrival * 285;
  introHuman(ctx,heroX,403,1.04,1,time * .012,{
    armor:"#7f8b98",cloth:"#7c4050",sword:"#e8d7bb",weaponAngle:-.82,weaponScale:1.08
  });
  [605,785,890].forEach((x,i) => introHuman(ctx,x,404,.68,i===1?-1:1,time * .003 + i,{
    armor:"#8d786f",cloth:i%2?"#6b5968":"#72514b",weapon:false
  }));
  for (let i=0;i<12;i++) {
    const x = (i * 91 + time * .012) % w;
    const y = 180 + Math.sin(time * .002 + i * 1.7) * 40 + i%3 * 43;
    introPx(ctx,x,y,3,2,i%2 ? "#d9a467" : "#80675a");
  }
  ctx.save();
  ctx.globalAlpha = introClamp((p - .72) * 3.4) * .35;
  ctx.fillStyle = "#fff0c2";
  ctx.fillRect(0,0,w,h);
  ctx.restore();
}

function introDrawCaption(ctx,state,scene,w,h) {
  const progress = introSceneProgress(state);
  const fadeIn = introEase(introClamp(state.sceneTime / 760));
  const fadeOut = introEase(introClamp((scene.duration - state.sceneTime) / 900));
  const opacity = Math.min(fadeIn,fadeOut);
  const panel = introGradient(ctx,0,350,0,h,[[0,"rgba(10,9,16,0)"],[.18,"rgba(12,10,18,.83)"],[1,"rgba(9,8,14,.98)"]]);
  ctx.fillStyle = panel;
  ctx.fillRect(0,340,w,200);
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.textAlign = "left";
  ctx.fillStyle = "#d59a63";
  ctx.font = "700 11px monospace";
  ctx.letterSpacing = "2px";
  ctx.fillText(scene.chapter,48,400);
  ctx.fillStyle = "#ffe2ae";
  ctx.font = "700 27px monospace";
  ctx.fillText(scene.title,48,435);
  scene.lines.forEach((line,index) => {
    const lineAlpha = introEase(introClamp((state.sceneTime - 1050 - index * 460) / 720));
    ctx.globalAlpha = opacity * lineAlpha;
    ctx.fillStyle = index ? "#c9bdc2" : "#ead8c4";
    ctx.font = "700 14px monospace";
    ctx.fillText(line,49,469 + index * 25);
  });
  ctx.globalAlpha = opacity;
  ctx.textAlign = "right";
  ctx.fillStyle = scene.style === "ingame" ? "#8ed3b5" : "#a99bb3";
  ctx.font = "700 9px monospace";
  ctx.fillText(scene.style === "ingame" ? "IN-GAME MEMORY" : "PIXEL ILLUSTRATION",w - 48,400);
  ctx.fillStyle = "#8e828f";
  ctx.fillText("ENTER · 다음     ` 콘솔에서 skip",w - 48,510);
  ctx.restore();
  const meterX = 48;
  const meterY = 527;
  const meterWidth = w - 96;
  introPx(ctx,meterX,meterY,meterWidth,2,"#342d3b");
  introPx(ctx,meterX,meterY,meterWidth * ((state.sceneIndex + progress) / INTRO_SCENES.length),2,"#d19761");
  for (let index=0;index<INTRO_SCENES.length;index++) {
    ctx.save();
    ctx.translate(w / 2 + (index - 3) * 18,24);
    ctx.rotate(Math.PI / 4);
    introPx(ctx,-3,-3,6,6,index <= state.sceneIndex ? "#e1ac6c" : "#534757");
    ctx.restore();
  }
  ctx.fillStyle = "#817483";
  ctx.textAlign = "right";
  ctx.font = "700 9px monospace";
  ctx.fillText(`${String(state.sceneIndex + 1).padStart(2,"0")} / ${String(INTRO_SCENES.length).padStart(2,"0")}`,w - 22,28);
}

export function drawIntroCinematic(
  ctx,
  state,
  { width = 960,height = 540,now = 0 } = {}
) {
  const scene = introCurrentScene(state);
  const progress = introSceneProgress(state);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0,0,width,height);
  if (scene.id === "ashen-war") introDrawAshenWar(ctx,progress,now,width,height);
  else if (scene.id === "angelic-grace") introDrawAngelicGrace(ctx,progress,now,width,height);
  else if (scene.id === "karma-seed") introDrawKarmaSeed(ctx,progress,now,width,height);
  else if (scene.id === "red-night") introDrawRedNight(ctx,progress,now,width,height);
  else if (scene.id === "the-marked") introDrawMarked(ctx,progress,now,width,height);
  else if (scene.id === "the-fugitive") introDrawFugitive(ctx,progress,now,width,height);
  else introDrawDuskvale(ctx,progress,now,width,height);
  for (let x=0;x<width;x+=8) {
    ctx.fillStyle = x % 24 ? "rgba(255,255,255,.012)" : "rgba(0,0,0,.025)";
    ctx.fillRect(x,0,1,height);
  }
  ctx.fillStyle = "rgba(8,7,13,.78)";
  ctx.fillRect(0,0,width,12);
  ctx.fillRect(0,height - 8,width,8);
  introDrawCaption(ctx,state,scene,width,height);
  const sceneFade = Math.min(
    introEase(introClamp(state.sceneTime / 700)),
    introEase(introClamp((scene.duration - state.sceneTime) / 820))
  );
  ctx.fillStyle = `rgba(8,7,13,${1 - sceneFade})`;
  ctx.fillRect(0,0,width,height);
  ctx.restore();
}
