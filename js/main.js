import { Sprite } from "./Sprite.js";
import {
  createPlatform,
  createPlayer,
  createEnemyByPlatform,
  createEnemy,
} from "./helper.js";

import { Controller } from "./controller/Controller.js";
import { int } from "./controller/Init.js";

export const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// const floorImage = new Sprite({
//   position: { x: 0, y: 0 },
//   offset: { x: 0, y: 1000 },
//   imageSrc: "./img/platform 1.png",
//   scale: 1.5,
// });

// const tree1BG = new Sprite({
//   position: { x: 0, y: 0 },
//   offset: { x: 0, y: 0 },
//   imageSrc: "./img/background/tree1BG.png",
// });

// const tree2BG = new Sprite({
//   position: { x: 0, y: 0 },
//   offset: { x: 0, y: 0 },
//   imageSrc: "./img/background/tree2BG.png",
// });

// const tree3BG = new Sprite({
//   position: { x: 0, y: 0 },
//   offset: { x: 0, y: 0 },
//   imageSrc: "./img/background/tree3BG.png",
// });

// const tree4BG = new Sprite({
//   position: { x: 0, y: 0 },
//   offset: { x: 0, y: 0 },
//   imageSrc: "./img/background/tree4BG.png",
// });

// const mountainBG = new Sprite({
//   position: { x: 0, y: 0 },
//   offset: { x: 0, y: 0 },
//   imageSrc: "./img/background/mountainBG.png",
// });

// const cloudBG = new Sprite({
//   position: { x: 0, y: 0 },
//   offset: { x: 0, y: 0 },
//   imageSrc: "./img/background/cloudBG.png",
// });

// const shop = new Sprite({
//   position: { x: 630, y: 127 },
//   imageSrc: "./img/shop_anim.png",
//   scale: 2.75,
//   framesMax: 6,
//   framesHold: 5,
// });

// const player = createPlayer({
//   position: { x: 0, y: canvas.height - 200 },
//   velocity: { x: 0, y: 0 },
//   moveSpeed: { x: 4, y: 15 },
//   player_name: "warior",
// });

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

// const camera = {
//   x1: 300,
//   x2: 500,
//   y: player.position.y + player.height / 2,
//   fall_offset: { y: 30, delay_frame: 5 },
//   offset: { y: 0, diff: 0, delay_frame: 25 },
// };

// const objs = [
//   cloudBG,
//   mountainBG,
//   tree4BG,
//   tree3BG,
//   tree2BG,
//   tree1BG,
//   floorImage,
// ];
// function handleCamera() {
//   player.gameCurrentX += camera.x;

//   // X axis
//   if (player.velocity.x === 0 && floorImage.position.x + camera.x * -1 <= 0) {
//     player.walls.forEach((w) => (w.position.x += camera.x * -1));
//     // backgorund and floor x
//     floorImage.position.x += camera.x * -1;
//     cloudBG.position.x += camera.x * -0.1;
//     mountainBG.position.x += camera.x * -0.1;
//     tree4BG.position.x += camera.x * -0.2;
//     tree3BG.position.x += camera.x * -0.3;
//     tree2BG.position.x += camera.x * -0.5;
//     tree1BG.position.x += camera.x * -0.7;

//     platforms.forEach((p) => {
//       p.position.x += camera.x * -1;
//     });
//     // enemy
//     // enemy.handleGameMove({ position: { x: camera.x * -1 } });
//     player.enemys.forEach((e) => {
//       e.handleGameMove({ x: camera.x * -1, y: 0 });
//     });
//   }
//   // X axis

//   // Y axis
//   if (
//     (camera.offset.diff < 0 && camera.offset.y < 0) ||
//     (camera.offset.diff > 0 && camera.offset.y > 0)
//   ) {
//     if (Math.abs(camera.offset.y) < Math.abs(camera.offset.diff)) {
//       camera.offset.diff = camera.offset.y;
//     }
//     floorImage.position.y += camera.offset.diff * -1;

//     // walls
//     walls.forEach((w) => {
//       w.position.y += camera.offset.diff * -1;
//     });

//     // platforms
//     platforms.forEach((p) => {
//       p.position.y += camera.offset.diff * -1;
//     });

//     // enemys
//     player.enemys.forEach((e) => {
//       e.handleGameMove({ x: 0, y: camera.offset.diff * -1 });
//     });

//     player.position.y += camera.offset.diff * -1;
//     camera.offset.y += camera.offset.diff * -1;
//   }
//   // Y axis

//   c.beginPath();
//   c.moveTo(player.position.x, camera.y);
//   c.lineTo(player.position.x + player.width, camera.y);
//   c.stroke();

//   c.beginPath();
//   c.moveTo(player.position.x, camera.y + camera.fall_offset.y);
//   c.lineTo(player.position.x + player.width, camera.y + camera.fall_offset.y);
//   c.stroke();
// }
// player.platform = platforms[0];
// player.walls = walls;

// let enemys = createEnemyByPlatform(platforms);

// player.enemys = enemys;
// enemys.forEach((e) => (e.enemy = player));

// let enemy = createEnemy({
//   platform: platforms[3],
//   enemy_name: "sygnus",
//   enemy_type: "boss",
// });

// player.enemys.forEach((e) => (e.enemy = player));

// enemy.enemy = player;

const controller = new Controller(int());
const player = controller.player;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  controller.run();
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
