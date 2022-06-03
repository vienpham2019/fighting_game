import { Sprite } from "./Sprite.js";
import {
  createPlatform,
  createPlayer,
  createEnemyByPlatform,
  createEnemy,
} from "./helper.js";

export const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const floorImage = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 1000 },
  imageSrc: "./img/platform 1.png",
  scale: 1.5,
});

const tree1BG = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: "./img/background/tree1BG.png",
});

const tree2BG = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: "./img/background/tree2BG.png",
});

const tree3BG = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: "./img/background/tree3BG.png",
});

const tree4BG = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: "./img/background/tree4BG.png",
});

const mountainBG = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: "./img/background/mountainBG.png",
});

const cloudBG = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: "./img/background/cloudBG.png",
});

const shop = new Sprite({
  position: { x: 630, y: 127 },
  imageSrc: "./img/shop_anim.png",
  scale: 2.75,
  framesMax: 6,
  framesHold: 5,
});

const player = createPlayer({
  position: { x: 0, y: canvas.height - 200 },
  velocity: { x: 0, y: 0 },
  moveSpeed: { x: 4, y: 15 },
  player_name: "warior",
});

const platforms = createPlatform([
  { x: 0, width: 95, height: 2, offset: { x: 0, y: -272 } },
  { x: 0, width: 195, height: 2, offset: { x: 0, y: 661 } },
  { x: 0, width: 901, height: 2, offset: { x: 0, y: 951 } },
  { x: 95, width: 185, height: 2, offset: { x: 0, y: -200 } },
  { x: 150, width: 75, height: 2, offset: { x: 0, y: -368 } },
  { x: 195, width: 910, height: 2, offset: { x: 0, y: 734 } },
  { x: 225, width: 250, height: 2, offset: { x: 0, y: -472 } },
  { x: 280, width: 1095, height: 2, offset: { x: 0, y: -128 } },
  { x: 475, width: 230, height: 2, offset: { x: 0, y: -542 } },
  { x: 705, width: 200, height: 2, offset: { x: 0, y: -614 } },
  { x: 785, width: 60, height: 2, offset: { x: 0, y: -699 } },
  { x: 845, width: 210, height: 2, offset: { x: 0, y: -769 } },
  { x: 931, width: 200, height: 2, offset: { x: 0, y: 956 } },
  { x: 1020, width: 1010, height: 2, offset: { x: 0, y: 876 } },
  { x: 1055, width: 930, height: 2, offset: { x: 0, y: -698 } },
  { x: 1058, width: 70, height: 2, offset: { x: 0, y: 635 } },
  { x: 1115, width: 290, height: 2, offset: { x: 0, y: -899 } },
  { x: 1128, width: 215, height: 2, offset: { x: 0, y: 546 } },
  { x: 1375, width: 75, height: 2, offset: { x: 0, y: -56 } },
  { x: 1415, width: 290, height: 2, offset: { x: 0, y: -952 } },
  { x: 1428, width: 215, height: 2, offset: { x: 0, y: 486 } },
  { x: 1538, width: 284, height: 2, offset: { x: 0, y: 20 } },
  { x: 1720, width: 375, height: 2, offset: { x: 0, y: 428 } },
  { x: 1825, width: 370, height: 2, offset: { x: 0, y: -1085 } },
  { x: 1965, width: 284, height: 2, offset: { x: 0, y: 93 } },
  { x: 1985, width: 1435, height: 2, offset: { x: 0, y: -554 } },
  { x: 2090, width: 200, height: 2, offset: { x: 0, y: 836 } },
  { x: 2092, width: 82, height: 2, offset: { x: 0, y: 344 } },
  { x: 2170, width: 208, height: 2, offset: { x: 0, y: 271 } },
  { x: 2195, width: 70, height: 2, offset: { x: 0, y: -1170 } },
  { x: 2265, width: 210, height: 2, offset: { x: 0, y: -1241 } },
  { x: 2340, width: 65, height: 2, offset: { x: 0, y: 870 } },
  { x: 2405, width: 220, height: 2, offset: { x: 0, y: 800 } },
  { x: 2375, width: 215, height: 2, offset: { x: 0, y: 201 } },
  { x: 2475, width: 210, height: 2, offset: { x: 0, y: -1312 } },
  { x: 2590, width: 576, height: 2, offset: { x: 0, y: 274 } },
  { x: 2625, width: 555, height: 2, offset: { x: 0, y: 873 } },
  { x: 2685, width: 580, height: 2, offset: { x: 0, y: -1240 } },
  { x: 3265, width: 190, height: 2, offset: { x: 0, y: -1169 } },
  { x: 3420, width: 60, height: 2, offset: { x: 0, y: -482 } },
  { x: 3455, width: 1090, height: 2, offset: { x: 0, y: -1098 } },
  { x: 3584, width: 300, height: 2, offset: { x: 0, y: -470 } },
  { x: 3975, width: 420, height: 2, offset: { x: 0, y: -365 } },
  { x: 4395, width: 480, height: 2, offset: { x: 0, y: -435 } },
  { x: 4545, width: 70, height: 2, offset: { x: 0, y: -1025 } },
  { x: 4680, width: 214, height: 2, offset: { x: 0, y: -1017 } },
  { x: 4860, width: 214, height: 2, offset: { x: 0, y: -923 } },
  { x: 4930, width: 67, height: 2, offset: { x: 0, y: -507 } },
  { x: 4997, width: 340, height: 2, offset: { x: 0, y: -579 } },
  { x: 5070, width: 214, height: 2, offset: { x: 0, y: -830 } },
  { x: 5260, width: 1110, height: 2, offset: { x: 0, y: -725 } },
  { x: 6370, width: 1090, height: 2, offset: { x: 0, y: -652 } },
  { x: 6582, width: 730, height: 2, offset: { x: 0, y: -1292 } },
  { x: 7312, width: 1030, height: 2, offset: { x: 0, y: -1220 } },
  { x: 7460, width: 70, height: 2, offset: { x: 0, y: -582 } },
  { x: 7590, width: 280, height: 2, offset: { x: 0, y: -642 } },
  { x: 7990, width: 70, height: 2, offset: { x: 0, y: -718 } },
  { x: 8058, width: 1410, height: 2, offset: { x: 0, y: -787 } },
  { x: 8372, width: 210, height: 2, offset: { x: 0, y: -1174 } },
  { x: 8592, width: 67, height: 2, offset: { x: 0, y: -1120 } },
  { x: 8622, width: 214, height: 2, offset: { x: 0, y: -1062 } },
  { x: 8859, width: 67, height: 2, offset: { x: 0, y: -1018 } },
  { x: 8949, width: 210, height: 2, offset: { x: 0, y: -966 } },
  { x: 9167, width: 67, height: 2, offset: { x: 0, y: -903 } },
  { x: 9273, width: 67, height: 2, offset: { x: 0, y: -866 } },
  { x: 9468, width: 290, height: 2, offset: { x: 0, y: -715 } },
  { x: 9762, width: 370, height: 2, offset: { x: 0, y: -828 } },
  { x: 10182, width: 290, height: 2, offset: { x: 0, y: -923 } },
  { x: 10472, width: 440, height: 2, offset: { x: 0, y: -996 } },
  { x: 10912, width: 730, height: 2, offset: { x: 0, y: -1068 } },
  { x: 3165, width: 1090, height: 2, offset: { x: 0, y: 346 } },
  { x: 3475, width: 215, height: 2, offset: { x: 0, y: 246 } },
  { x: 3658, width: 215, height: 2, offset: { x: 0, y: 176 } },
  { x: 3880, width: 215, height: 2, offset: { x: 0, y: 105 } },
  { x: 4120, width: 360, height: 2, offset: { x: 0, y: 78 } },
  { x: 4255, width: 73, height: 2, offset: { x: 0, y: 417 } },
  { x: 4415, width: 290, height: 2, offset: { x: 0, y: 493 } },
  { x: 4680, width: 215, height: 2, offset: { x: 0, y: 598 } },
  { x: 4850, width: 215, height: 2, offset: { x: 0, y: 698 } },
  { x: 3180, width: 190, height: 2, offset: { x: 0, y: 943 } }, //
  { x: 3370, width: 1373, height: 2, offset: { x: 0, y: 1015 } }, //
  { x: 4740, width: 80, height: 2, offset: { x: 0, y: 932 } }, //
  { x: 4820, width: 202, height: 2, offset: { x: 0, y: 860 } }, //
  { x: 5020, width: 215, height: 2, offset: { x: 0, y: 788 } },
  { x: 5235, width: 1980, height: 2, offset: { x: 0, y: 861 } },
  { x: 7215, width: 600, height: 2, offset: { x: 0, y: 934 } },
  { x: 4480, width: 85, height: 2, offset: { x: 0, y: -7 } },
  { x: 4560, width: 210, height: 2, offset: { x: 0, y: -78 } },
  { x: 4770, width: 210, height: 2, offset: { x: 0, y: -150 } },
  { x: 4980, width: 1000, height: 2, offset: { x: 0, y: -78 } },
  { x: 5900, width: 1330, height: 2, offset: { x: 0, y: 66 } },
  { x: 7230, width: 936, height: 2, offset: { x: 0, y: 212 } },
  { x: 7662, width: 213, height: 2, offset: { x: 0, y: 110 } },
  { x: 7880, width: 213, height: 2, offset: { x: 0, y: 26 } },
  { x: 8110, width: 590, height: 2, offset: { x: 0, y: -44 } },
  { x: 8165, width: 190, height: 2, offset: { x: 0, y: 285 } },
  { x: 8355, width: 1080, height: 2, offset: { x: 0, y: 358 } },
  { x: 8700, width: 490, height: 2, offset: { x: 0, y: -115 } },
  { x: 9167, width: 67, height: 2, offset: { x: 0, y: -903 } },
  { x: 9210, width: 350, height: 2, offset: { x: 0, y: -3 } },
  { x: 9435, width: 80, height: 2, offset: { x: 0, y: 430 } },
  { x: 9560, width: 290, height: 2, offset: { x: 0, y: -117 } },
  { x: 9565, width: 65, height: 2, offset: { x: 0, y: 423 } },
  { x: 9760, width: 67, height: 2, offset: { x: 0, y: -215 } },
  { x: 9695, width: 210, height: 2, offset: { x: 0, y: 403 } },
  { x: 9820, width: 530, height: 2, offset: { x: 0, y: -308 } },
  { x: 9995, width: 210, height: 2, offset: { x: 0, y: 350 } },
  { x: 10220, width: 67, height: 2, offset: { x: 0, y: 275 } },
  { x: 10350, width: 434, height: 2, offset: { x: 0, y: -380 } },
  { x: 10330, width: 360, height: 2, offset: { x: 0, y: 215 } },
  { x: 10690, width: 86, height: 2, offset: { x: 0, y: 130 } },
  { x: 10976, width: 214, height: 2, offset: { x: 0, y: -12 } },
  { x: 10720, width: 213, height: 2, offset: { x: 0, y: -480 } },
  { x: 10776, width: 200, height: 2, offset: { x: 0, y: 59 } },
  { x: 11010, width: 300, height: 2, offset: { x: 0, y: -544 } },
  { x: 11310, width: 230, height: 2, offset: { x: 0, y: -472 } },
  { x: 11190, width: 210, height: 2, offset: { x: 0, y: -613 } },
  { x: 11190, width: 1040, height: 2, offset: { x: 0, y: 61 } },
  { x: 11316, width: 67, height: 2, offset: { x: 0, y: -678 } },
  { x: 11389, width: 67, height: 2, offset: { x: 0, y: -748 } },
  { x: 11465, width: 210, height: 2, offset: { x: 0, y: -824 } },
  { x: 11601, width: 67, height: 2, offset: { x: 0, y: -902 } },
  { x: 11692, width: 230, height: 2, offset: { x: 0, y: -956 } },
  { x: 11922, width: 300, height: 2, offset: { x: 0, y: -1026 } },
]);

const walls = createPlatform([
  {
    x: -1,
    width: 1,
    height: canvas.height * 5,
    offset: { x: 0, y: -(canvas.height - 2) },
  },
  { x: 95, width: 2, height: 75, offset: { x: 0, y: -272 } },
  { x: 195, width: 2, height: 77, offset: { x: 0, y: 661 } },
  { x: 225, width: 2, height: 110, offset: { x: 0, y: -472 } },
  { x: 280, width: 2, height: 75, offset: { x: 0, y: -200 } },
  { x: 475, width: 2, height: 75, offset: { x: 0, y: -542 } },
  { x: 705, width: 2, height: 75, offset: { x: 0, y: -612 } },
  { x: 845, width: 2, height: 75, offset: { x: 0, y: -771 } },
  { x: 1055, width: 2, height: 75, offset: { x: 0, y: -769 } },
  { x: 1128, width: 2, height: 50, offset: { x: 0, y: 546 } },
  { x: 1343, width: 2, height: 50, offset: { x: 0, y: 546 } },
  { x: 1375, width: 2, height: 73, offset: { x: 0, y: -128 } },
  { x: 1428, width: 2, height: 50, offset: { x: 0, y: 486 } },
  { x: 1450, width: 2, height: 150, offset: { x: 0, y: -56 } },
  { x: 1643, width: 2, height: 50, offset: { x: 0, y: 486 } },
  { x: 1720, width: 2, height: 50, offset: { x: 0, y: 428 } },
  { x: 1985, width: 2, height: 148, offset: { x: 0, y: -698 } },
  { x: 2092, width: 2, height: 86, offset: { x: 0, y: 344 } },
  { x: 2170, width: 2, height: 75, offset: { x: 0, y: 271 } },
  { x: 2195, width: 2, height: 85, offset: { x: 0, y: -1166 } },
  { x: 2265, width: 2, height: 75, offset: { x: 0, y: -1241 } },
  { x: 2375, width: 2, height: 75, offset: { x: 0, y: 201 } },
  { x: 2405, width: 2, height: 75, offset: { x: 0, y: 800 } },
  { x: 2475, width: 2, height: 75, offset: { x: 0, y: -1312 } },
  { x: 2590, width: 2, height: 76, offset: { x: 0, y: 201 } },
  { x: 2625, width: 2, height: 75, offset: { x: 0, y: 800 } },
  { x: 2685, width: 2, height: 75, offset: { x: 0, y: -1312 } },
  { x: 3165, width: 2, height: 75, offset: { x: 0, y: 274 } },
  { x: 3180, width: 2, height: 75, offset: { x: 0, y: 874 } }, //
  { x: 3265, width: 2, height: 75, offset: { x: 0, y: -1240 } },
  { x: 3370, width: 2, height: 75, offset: { x: 0, y: 943 } }, //
  { x: 3420, width: 2, height: 75, offset: { x: 0, y: -554 } },
  { x: 3455, width: 2, height: 75, offset: { x: 0, y: -1169 } },
  { x: 4255, width: 2, height: 75, offset: { x: 0, y: 346 } },
  { x: 4328, width: 2, height: 75, offset: { x: 0, y: 417 } },
  { x: 4395, width: 2, height: 75, offset: { x: 0, y: -435 } },
  { x: 4480, width: 2, height: 87, offset: { x: 0, y: -7 } },
  { x: 4560, width: 2, height: 75, offset: { x: 0, y: -78 } },
  { x: 4545, width: 2, height: 75, offset: { x: 0, y: -1098 } },
  { x: 4740, width: 2, height: 85, offset: { x: 0, y: 932 } }, //
  { x: 4770, width: 2, height: 75, offset: { x: 0, y: -150 } },
  { x: 4820, width: 2, height: 75, offset: { x: 0, y: 860 } }, //
  { x: 4980, width: 2, height: 75, offset: { x: 0, y: -150 } },
  { x: 4997, width: 2, height: 75, offset: { x: 0, y: -579 } },
  { x: 5020, width: 2, height: 75, offset: { x: 0, y: 788 } },
  { x: 5235, width: 2, height: 75, offset: { x: 0, y: 788 } },
  { x: 5900, width: 2, height: 75, offset: { x: 0, y: -6 } },
  { x: 6370, width: 2, height: 75, offset: { x: 0, y: -725 } },
  { x: 7215, width: 2, height: 75, offset: { x: 0, y: 861 } },
  { x: 7230, width: 2, height: 150, offset: { x: 0, y: 66 } },
  { x: 7312, width: 2, height: 75, offset: { x: 0, y: -1292 } },
  { x: 7460, width: 2, height: 75, offset: { x: 0, y: -650 } },
  { x: 7815, width: 2, height: 200, offset: { x: 0, y: 737 } },
  { x: 8058, width: 2, height: 75, offset: { x: 0, y: -787 } },
  { x: 8165, width: 2, height: 75, offset: { x: 0, y: 212 } },
  { x: 8355, width: 2, height: 75, offset: { x: 0, y: 285 } },
  { x: 8700, width: 2, height: 75, offset: { x: 0, y: -115 } },
  { x: 9435, width: 2, height: 75, offset: { x: 0, y: 358 } },
  { x: 9468, width: 2, height: 75, offset: { x: 0, y: -787 } },
  { x: 10350, width: 2, height: 75, offset: { x: 0, y: -380 } },
  { x: 10472, width: 2, height: 75, offset: { x: 0, y: -996 } },
  { x: 10690, width: 2, height: 87, offset: { x: 0, y: 130 } },
  { x: 10776, width: 2, height: 75, offset: { x: 0, y: 59 } },
  { x: 10912, width: 2, height: 75, offset: { x: 0, y: -1068 } },
  { x: 10976, width: 2, height: 75, offset: { x: 0, y: -12 } },
  { x: 11190, width: 2, height: 75, offset: { x: 0, y: -12 } },
  { x: 11310, width: 2, height: 75, offset: { x: 0, y: -544 } },
  { x: 11922, width: 2, height: 75, offset: { x: 0, y: -1026 } },
  { x: 12222, width: 2, height: canvas.height * 5, offset: { x: 0, y: -1526 } },
]);

// let dx = -canvas.width;
// let dy = -canvas.height;

// floorImage.position.x -= canvas.width + dx;
// floorImage.position.y -= canvas.height + dy;
// platforms.forEach((p) => {
//   p.position.x -= canvas.width + dx;
//   p.position.y -= canvas.height + dy;
// });
// walls.forEach((p) => {
//   p.position.x -= canvas.width + dx;
//   p.position.y -= canvas.height + dy;
// });

const camera = {
  x1: 300,
  x2: 500,
  y: player.position.y + player.height / 2,
  fall_offset: { y: 30, delay_frame: 5 },
  offset: { y: 0, diff: 0, delay_frame: 25 },
};

const objs = [
  cloudBG,
  mountainBG,
  tree4BG,
  tree3BG,
  tree2BG,
  tree1BG,
  floorImage,
];
function handleCamera() {
  player.gameCurrentX += camera.x;

  // X axis
  if (player.velocity.x === 0 && floorImage.position.x + camera.x * -1 <= 0) {
    player.walls.forEach((w) => (w.position.x += camera.x * -1));
    // backgorund and floor x
    floorImage.position.x += camera.x * -1;
    cloudBG.position.x += camera.x * -0.1;
    mountainBG.position.x += camera.x * -0.1;
    tree4BG.position.x += camera.x * -0.2;
    tree3BG.position.x += camera.x * -0.3;
    tree2BG.position.x += camera.x * -0.5;
    tree1BG.position.x += camera.x * -0.7;

    platforms.forEach((p) => {
      p.position.x += camera.x * -1;
    });
    // enemy
    // enemy.handleGameMove({ position: { x: camera.x * -1 } });
    player.enemys.forEach((e) => {
      e.handleGameMove({ x: camera.x * -1, y: 0 });
    });
  }
  // X axis

  // Y axis
  if (
    (camera.offset.diff < 0 && camera.offset.y < 0) ||
    (camera.offset.diff > 0 && camera.offset.y > 0)
  ) {
    if (Math.abs(camera.offset.y) < Math.abs(camera.offset.diff)) {
      camera.offset.diff = camera.offset.y;
    }
    floorImage.position.y += camera.offset.diff * -1;

    // walls
    walls.forEach((w) => {
      w.position.y += camera.offset.diff * -1;
    });

    // platforms
    platforms.forEach((p) => {
      p.position.y += camera.offset.diff * -1;
    });

    // enemys
    player.enemys.forEach((e) => {
      e.handleGameMove({ x: 0, y: camera.offset.diff * -1 });
    });

    player.position.y += camera.offset.diff * -1;
    camera.offset.y += camera.offset.diff * -1;
  }
  // Y axis

  c.beginPath();
  c.moveTo(player.position.x, camera.y);
  c.lineTo(player.position.x + player.width, camera.y);
  c.stroke();

  c.beginPath();
  c.moveTo(player.position.x, camera.y + camera.fall_offset.y);
  c.lineTo(player.position.x + player.width, camera.y + camera.fall_offset.y);
  c.stroke();
}
player.platform = platforms[0];
player.walls = walls;

// let enemys = createEnemyByPlatform(platforms);

// player.enemys = enemys;
// enemys.forEach((e) => (e.enemy = player));

// let enemy = createEnemy({
//   platform: platforms[3],
//   enemy_name: "sygnus",
//   enemy_type: "boss",
// });

player.enemys = [];
// player.enemys.forEach((e) => (e.enemy = player));

// enemy.enemy = player;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  objs.forEach((e) => e.update());
  player.floorImage.x = floorImage.image.width * floorImage.scale;

  // enemy.update();
  platforms.forEach((p) => {
    p.draw();
  });
  walls.forEach((p) => {
    p.draw();
  });
  // player move
  player.move({ left: "a", right: "d" }, camera);
  for (let i = 0; i < walls.length; i++) {
    player.sideColition(walls[i], camera);
  }

  for (let i = 0; i < platforms.length; i++) {
    player.floorColition(platforms[i], camera);
  }
  player.update();
  // Update player enemys
  if (player.enemys.length > 0) {
    // update each enemy
    player.enemys.forEach((e) => {
      // only load enemy if player in range
      if (
        e.position.x > player.position.x - 600 &&
        e.position.x + e.width < player.position.x + player.width + 600 &&
        e.position.y > player.position.y - 500 &&
        e.position.y + e.height < player.position.y + player.height + 500
      )
        e.update();
    });
    player.enemys = player.enemys.filter((e) => !e.is_death);
  }

  // Camera
  handleCamera();
  // camera
}

animate();

window.addEventListener("keydown", (e) => {
  if (player.health > 0) {
    switch (e.key) {
      case "d":
        player.keys.d.pressed = true;
        if (player.last_key[0] !== "d") player.last_key.unshift("d");
        break;
      case "a":
        player.keys.a.pressed = true;
        if (player.last_key[0] !== "a") player.last_key.unshift("a");
        break;
      case "w":
        player.jump();
        break;
      case " ":
        player.attack();
        break;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (player.health > 0) {
    switch (e.key) {
      case "d":
        player.keys.d.pressed = false;
        if (player.last_key[0] === "d") player.last_key.shift();
        else player.last_key.pop();
        break;
      case "a":
        player.keys.a.pressed = false;
        if (player.last_key[0] === "a") player.last_key.shift();
        else player.last_key.pop();
        break;
    }
  }
});
