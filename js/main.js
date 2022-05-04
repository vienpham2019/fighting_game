import { Sprite } from "../js/Sprite.js";

export const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 10 },
  offset: { x: 0, y: 0 },
});

player.draw();

const enemy = new Sprite({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
});

const speed = {
  x: 5,
  y: 20,
};

enemy.draw();
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
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

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  player.velocity.x =
    keys.a.pressed && player.last_key === "a"
      ? -speed.x
      : keys.d.pressed && player.last_key === "d"
      ? speed.x
      : 0;

  enemy.velocity.x =
    keys.ArrowLeft.pressed && enemy.last_key === "ArrowLeft"
      ? -speed.x
      : keys.ArrowRight.pressed && enemy.last_key === "ArrowRight"
      ? speed.x
      : 0;

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
      player.last_key = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.last_key = "a";
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
      enemy.last_key = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.last_key = "ArrowRight";
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
      break;
    case "a":
      keys.a.pressed = false;
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
});
