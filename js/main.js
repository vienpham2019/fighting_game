import { Character } from "./Character.js";
import { Sprite } from "./Sprite.js";

export const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});

const shop = new Sprite({
  position: { x: 630, y: 127 },
  imageSrc: "./img/shop_anim.png",
  scale: 2.75,
  framesMax: 6,
  framesHold: 5,
});

const player = new Character({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  height: 133,
  width: 65,
  imageSrc: "./img/swordsman/Idle.png",
  scale: 2.5,
  framesMax: 8,
  framesHold: 4,
  offset: { x: 215, y: 171 },
  sprites: {
    idle: {
      imageSrc: "./img/swordsman/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/swordsman/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/swordsman/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/swordsman/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/swordsman/Attack1.png",
      framesMax: 6,
    },
    attack2: {
      imageSrc: "./img/swordsman/Attack2.png",
      framesMax: 6,
    },
  },
});

const enemy = new Character({
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
    attack1: {
      imageSrc: "./img/warior/Attack1.png",
      framesMax: 7,
    },
    attack2: {
      imageSrc: "./img/warior/Attack2.png",
      framesMax: 7,
    },
  },
});

const speed = {
  x: 5,
  y: 18,
};

enemy.draw();
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },

  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function rectCollition(box_1, box_2) {
  return (
    box_1.attack_box.position.x + box_1.attack_box.width >= box_2.position.x &&
    box_1.attack_box.position.x <= box_2.position.x + box_2.width &&
    box_1.attack_box.position.y + box_1.attack_box.height >= box_2.position.y &&
    box_1.attack_box.position.y <= box_2.position.y + box_2.height
  );
}

function character_move(char, m) {
  if (keys[m.left].pressed && char.last_key[0] === m.left) {
    char.velocity.x = -speed.x;
    char.flip = -1;
    if (!char.is_jump) char.updateSprite("run");
  } else if (keys[m.right].pressed && char.last_key[0] === m.right) {
    char.velocity.x = speed.x;
    char.flip = 1;
    if (!char.is_jump) char.updateSprite("run");
  } else {
    if (!char.is_jump) {
      char.velocity.x = 0;
      char.updateSprite("idle");
    }
  }

  if (char.velocity.y < 0) {
    char.updateSprite("jump");
  } else if (char.velocity.y > 0) {
    char.updateSprite("fall");
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  player.update();
  enemy.update();

  // player move
  character_move(player, { left: "a", right: "d" });

  // enemy move
  character_move(enemy, { left: "ArrowLeft", right: "ArrowRight" });

  //   Detect colition
  if (rectCollition(player, enemy) && player.is_attacking) {
    player.is_attacking = false;
    console.log("player attack");
  }

  if (rectCollition(enemy, player) && enemy.is_attacking) {
    enemy.is_attacking = false;
    console.log("enemy attack");
  }
}

animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = true;
      if (player.last_key[0] !== "d") player.last_key.unshift("d");
      break;
    case "a":
      keys.a.pressed = true;
      if (player.last_key[0] !== "a") player.last_key.unshift("a");
      break;
    case "w":
      if (!player.is_jump) {
        player.velocity.y = -speed.y;
        player.is_jump = true;
      }
      break;
    case " ":
      player.attack();
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      if (enemy.last_key[0] !== "ArrowLeft")
        enemy.last_key.unshift("ArrowLeft");
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      if (enemy.last_key[0] !== "ArrowRight")
        enemy.last_key.unshift("ArrowRight");
      break;
    case "ArrowUp":
      if (!enemy.is_jump) {
        enemy.velocity.y = -speed.y;
        enemy.is_jump = true;
      }
      break;

    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      if (player.last_key[0] === "d") player.last_key.shift();
      else player.last_key.pop();
      break;
    case "a":
      keys.a.pressed = false;
      if (player.last_key[0] === "a") player.last_key.shift();
      else player.last_key.pop();
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      if (enemy.last_key[0] === "ArrowLeft") enemy.last_key.shift();
      else enemy.last_key.pop();
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      if (enemy.last_key[0] === "ArrowRight") enemy.last_key.shift();
      else enemy.last_key.pop();
      break;
  }
});
