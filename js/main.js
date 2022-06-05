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

const controller = new Controller(int());
const player = controller.player;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  controller.run();
  controller.drawPlayerHealthBar();
  controller.playerInfoObj.run();
  controller.playerInfoPanel.run();
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

      case "p":
        controller.playerInfoPanel.open = !controller.playerInfoPanel.open;
        break;
      case "u":
        controller.playerInfoObj.open = !controller.playerInfoObj.open;
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

canvas.addEventListener("click", (e) => {
  let { offsetX, offsetY } = e;
  if (controller.playerInfoObj.open) {
    controller.playerInfoObj.buttons.forEach((b) => {
      if (
        b.x <= offsetX &&
        b.x + b.w >= offsetX &&
        b.y <= offsetY &&
        b.y + b.h >= offsetY
      ) {
        if (b.type === "exit") controller.playerInfoObj.open = false;
        else controller.playerInfoObj.handleUpdatePlayerInfo(b.type);
      }
    });
  }
});
