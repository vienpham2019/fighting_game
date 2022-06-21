import { Controller } from "./controller/Controller.js";
import { int } from "./controller/Init.js";

export const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

canvas.width = 1424;
canvas.height = 676;

c.fillRect(0, 0, canvas.width, canvas.height);

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

      case "r":
        controller.resetPosition();

      case "p":
        controller.playerInfoPanel.open = !controller.playerInfoPanel.open;
        break;
      case "u":
        controller.playerInfoObj.open = !controller.playerInfoObj.open;
        break;
      case "i":
        controller.shopInfoPanel.open = !controller.shopInfoPanel.open;
        break;

      case "1":
        controller.itemsInfoPanel.handleUseItems(1);
        break;
      case "2":
        controller.itemsInfoPanel.handleUseItems(2);
        break;
      case "3":
        controller.itemsInfoPanel.handleUseItems(3);
        break;
      case "4":
        controller.itemsInfoPanel.handleUseItems(4);
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
        controller.playerInfoObj.handleUpdatePlayerInfo(b.type);
      }
    });
  }

  if (controller.shopInfoPanel.open) {
    controller.shopInfoPanel.buttons.forEach((b) => {
      if (
        b.x <= offsetX &&
        b.x + b.w >= offsetX &&
        b.y <= offsetY &&
        b.y + b.h >= offsetY
      ) {
        controller.shopInfoPanel.handleButton(b.type);
      }
    });
  }

  controller.itemsInfoPanel.openItemInfo = false;
  player.playerItems.forEach((e, i) => {
    if (
      e.box.x + 49 * i <= offsetX &&
      e.box.x + 49 * i + e.box.w >= offsetX &&
      e.box.my <= offsetY &&
      e.box.my + e.box.mh >= offsetY
    ) {
      controller.itemsInfoPanel.itemInfoType = e.type;
      controller.itemsInfoPanel.openItemInfo = true;
    }
  });
});
