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
  offset: { x: 0, y: 290 },
  imageSrc: "./img/Forest copy.png",
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
  position: { x: 500, y: canvas.height - 200 },
  velocity: { x: 0, y: 0 },
  moveSpeed: { x: 4, y: 15 },
  player_name: "warior",
});

const platforms = createPlatform([
  { x: 0, width: 95, height: 2, offset: { x: 0, y: -192 } },
  { x: 0, width: canvas.width * 2, height: 2, offset: { x: 0, y: 192 } },
  { x: 95, width: 44, height: 2, offset: { x: 0, y: -152 } },
  { x: 200, width: 200, height: 2, offset: { x: 0, y: -230 } },
  { x: 295, width: 300, height: 2, offset: { x: 0, y: -250 } },
  { x: 295, width: 300, height: 2, offset: { x: 0, y: -350 } },
  { x: 595, width: 200, height: 2, offset: { x: 0, y: -380 } },
  { x: 765, width: 200, height: 2, offset: { x: 0, y: -480 } },
  { x: 1065, width: 300, height: 2, offset: { x: 0, y: -580 } },
  { x: 1465, width: 300, height: 2, offset: { x: 0, y: -680 } },
  { x: 1765, width: 500, height: 2, offset: { x: 0, y: -550 } },
  { x: 89, width: 110, height: 2, offset: { x: 0, y: -110 } },
  { x: 198, width: 633, height: 2, offset: { x: 0, y: -69 } },
  { x: 740, width: 680, height: 2, offset: { x: 0, y: -132 } },
  { x: 1670, width: 200, height: 2, offset: { x: 0, y: -129 } },
]);

const walls = createPlatform([
  {
    x: -1,
    width: 1,
    height: canvas.height + 2,
    offset: { x: 0, y: -(canvas.height - 2) },
  },
  { x: 95, width: 2, height: 42, offset: { x: 0, y: -192 } },
  { x: 198, width: 2, height: 42, offset: { x: 0, y: -110 } },
]);

const camera = {
  x1: 300,
  x2: 500,
  y: player.position.y + player.height / 2,
  offset: { y: 0, diff: 0, delay_frame: 25 },
};

player.platform = platforms[0];
player.walls = walls;

let enemys = createEnemyByPlatform(platforms);

// player.enemys = enemys;
enemys.forEach((e) => (e.enemy = player));

// let enemy = createEnemy({
//   platform: platforms[3],
//   enemy_name: "sygnus",
//   enemy_type: "boss",
// });

player.enemys = [];
player.enemys.forEach((e) => (e.enemy = player));

// enemy.enemy = player;

let d = -100;
// floorImage.position.x -= canvas.width + d;
// platforms.forEach((p) => (p.position.x -= canvas.width + d));
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  cloudBG.update();
  mountainBG.update();
  tree4BG.update();
  tree3BG.update();
  tree2BG.update();
  tree1BG.update();

  floorImage.update();
  player.floorImage.x = floorImage.image.width * floorImage.scale;

  // enemy.update();
  platforms.forEach((p) => p.draw());
  // walls.forEach((p) => p.draw());
  // player move
  player.move({ left: "a", right: "d" }, [floorImage]);
  for (let i = 0; i < walls.length; i++) {
    player.sideColition(walls[i]);
  }

  for (let i = 0; i < platforms.length; i++) {
    player.floorColition(platforms[i], camera);
  }
  player.update();
  // update each enemy
  player.enemys.forEach((e) => e.update());

  player.gameCurrentX += player.gameVelocity.x;

  if (
    player.velocity.x === 0 &&
    floorImage.position.x + player.gameVelocity.x * -1 <= 0
  ) {
    player.walls.forEach((w) => (w.position.x += player.gameVelocity.x * -1));
    // backgorund and floor x
    floorImage.position.x += player.gameVelocity.x * -1;
    cloudBG.position.x += player.gameVelocity.x * -0.1;
    mountainBG.position.x += player.gameVelocity.x * -0.1;
    tree4BG.position.x += player.gameVelocity.x * -0.2;
    tree3BG.position.x += player.gameVelocity.x * -0.3;
    tree2BG.position.x += player.gameVelocity.x * -0.5;
    tree1BG.position.x += player.gameVelocity.x * -0.7;

    platforms.forEach((p) => {
      p.position.x += player.gameVelocity.x * -1;
    });
    // enemy
    // enemy.handleGameMove({ position: { x: player.gameVelocity.x * -1 } });
    player.enemys.forEach((e) => {
      e.handleGameMove({ position: { x: player.gameVelocity.x * -1 } });
    });
  }

  if (
    (camera.offset.diff < 0 && camera.offset.y < 0) ||
    (camera.offset.diff > 0 && camera.offset.y > 0)
  ) {
    if (Math.abs(camera.offset.y) < Math.abs(camera.offset.diff)) {
      camera.offset.diff = camera.offset.y;
    }
    floorImage.position.y += camera.offset.diff * -1;
    platforms.forEach((p) => {
      p.position.y += camera.offset.diff * -1;
    });
    player.position.y += camera.offset.diff * -1;
    camera.offset.y += camera.offset.diff * -1;
  }

  c.beginPath();
  c.moveTo(player.position.x, camera.y);
  c.lineTo(player.position.x + player.width, camera.y);
  c.stroke();
  // floorImage.position.y += player.gameVelocity.y * -1;
  // Update player enemys
  if (player.enemys.length > 0)
    player.enemys = player.enemys.filter((e) => !e.is_death);
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
