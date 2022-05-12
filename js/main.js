import { Sprite } from "./Sprite.js";
import { createPlatform, createPlayer, createEnemy } from "./helper.js";

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
  position: { x: 500, y: 0 },
  velocity: { x: 0, y: 0 },
  moveSpeed: { x: 4, y: 12 },
  player_name: "warior",
});

const platforms = createPlatform([
  { x: 0, y: canvas.height - 192, width: 95, height: 2 },
  { x: 95, y: canvas.height - 152, width: 44, height: 2 },
  { x: 89, y: canvas.height - 110, width: 110, height: 2 },
  { x: 198, y: canvas.height - 69, width: 633, height: 2 },
  { x: 740, y: canvas.height - 132, width: 680, height: 2 },
  { x: 1670, y: canvas.height - 129, width: 200, height: 2 },
]);

const walls = createPlatform([
  { x: -1, y: 2, width: 1, height: canvas.height + 2 },
  { x: 95, y: canvas.height - 192, width: 2, height: 42 },
  { x: 198, y: canvas.height - 110, width: 2, height: 42 },
]);

player.platforms = platforms;
player.walls = walls;

const enemy = createEnemy({
  velocity: { x: 0, y: 0 },
  moveSpeed: { x: 1, y: 0 },
  platform: platforms[3],
  enemy_name: "worm",
});
const enemy2 = createEnemy({
  velocity: { x: 0, y: 0 },
  moveSpeed: { x: 1, y: 0 },
  platform: platforms[3],
  enemy_name: "skeleton",
});

let enemys = [enemy, enemy2];

player.enemys = enemys;
enemys.forEach((e) => (e.enemy = player));

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
  player.update();
  enemys.forEach((e) => !e.is_death && e.update());

  // platforms.forEach((p) => p.draw());
  // walls.forEach((p) => p.draw());

  // player move
  player.move({ left: "a", right: "d" }, [floorImage]);
  for (let i = 0; i < walls.length; i++) {
    player.sideColition(walls[i]);
  }
  player.floor = canvas.height;
  for (let i = 0; i < platforms.length; i++) {
    player.floorColition(platforms[i]);
  }

  player.gameCurrentX += player.gameVelocity.x;
  if (
    player.velocity.x === 0 &&
    floorImage.position.x + player.gameVelocity.x * -1 <= 0
  ) {
    player.platforms.forEach(
      (p) => (p.position.x += player.gameVelocity.x * -1)
    );
    player.walls.forEach((w) => (w.position.x += player.gameVelocity.x * -1));
    floorImage.position.x += player.gameVelocity.x * -1;
    cloudBG.position.x += player.gameVelocity.x * -0.1;
    mountainBG.position.x += player.gameVelocity.x * -0.1;
    tree4BG.position.x += player.gameVelocity.x * -0.2;
    tree3BG.position.x += player.gameVelocity.x * -0.3;
    tree2BG.position.x += player.gameVelocity.x * -0.5;
    tree1BG.position.x += player.gameVelocity.x * -0.7;
    enemys.forEach((e) => (e.position.x += player.gameVelocity.x * -1));
  }
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
