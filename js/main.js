import { Player } from "./Player.js";
import { Sprite } from "./Sprite.js";
import { Platform } from "./Platform.js";
import { createPlatform, createPlayer } from "./helper.js";

export const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 290 },
  imageSrc: "./img/Forest copy.png",
  scale: 1.5,
});

const shop = new Sprite({
  position: { x: 630, y: 127 },
  imageSrc: "./img/shop_anim.png",
  scale: 2.75,
  framesMax: 6,
  framesHold: 5,
});

const player = createPlayer({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  moveSpeed: { x: 5, y: 13 },
  player_name: "swordsman",
});

const enemy = new Player({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  flip: -1,
  height: 133,
  width: 60,
  imageSrc: "./img/warior/Idle.png",
  scale: 2.9,
  framesMax: 10,
  framesHold: 4,
  offset: { x: 200, y: 160 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 110,
    height: 50,
    offset: { x: 60, y: 30 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/warior/Idle.png",
      framesMax: 10,
    },
    run: {
      imageSrc: "./img/warior/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/warior/Jump.png",
      framesMax: 3,
    },
    fall: {
      imageSrc: "./img/warior/Fall.png",
      framesMax: 3,
    },
    takeHit: {
      imageSrc: "./img/warior/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/warior/Death.png",
      framesMax: 7,
    },
    attack: [
      {
        imageSrc: "./img/warior/Attack1.png",
        hitFrame: 5,
        framesMax: 7,
        damge: 5,
      },
      {
        imageSrc: "./img/warior/Attack2.png",
        hitFrame: 3,
        framesMax: 7,
        damge: 5,
      },
      {
        imageSrc: "./img/warior/Attack3.png",
        hitFrame: 5,
        framesMax: 8,
        damge: 10,
      },
    ],
  },
});

const platforms = createPlatform([
  { width: 4, height: canvas.height },
  { width: 95, height: 192 },
  { width: 44, height: 152 },
  { width: 59, height: 109 },
  { width: 540, height: 68 },
  { width: 286, height: 132 },
  { width: 4, height: canvas.height },
]);

player.platforms = platforms;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.enemy = enemy;
  enemy.enemy = player;
  background.update();
  // shop.update();
  platforms.forEach((p) => p.draw());
  player.update();
  // enemy.update();

  // player move
  player.move({ left: "a", right: "d" });

  // enemy move
  // enemy.move({ left: "ArrowLeft", right: "ArrowRight" });
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

window.addEventListener("keydown", (e) => {
  if (enemy.health > 0) {
    switch (e.key) {
      case "ArrowLeft":
        enemy.keys.ArrowLeft.pressed = true;
        if (enemy.last_key[0] !== "ArrowLeft")
          enemy.last_key.unshift("ArrowLeft");
        break;
      case "ArrowRight":
        enemy.keys.ArrowRight.pressed = true;
        if (enemy.last_key[0] !== "ArrowRight")
          enemy.last_key.unshift("ArrowRight");
        break;
      case "ArrowUp":
        enemy.jump();
        break;

      case "ArrowDown":
        enemy.attack();
        break;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (enemy.health > 0) {
    switch (e.key) {
      case "ArrowLeft":
        enemy.keys.ArrowLeft.pressed = false;
        if (enemy.last_key[0] === "ArrowLeft") enemy.last_key.shift();
        else enemy.last_key.pop();
        break;
      case "ArrowRight":
        enemy.keys.ArrowRight.pressed = false;
        if (enemy.last_key[0] === "ArrowRight") enemy.last_key.shift();
        else enemy.last_key.pop();
        break;
    }
  }
});
