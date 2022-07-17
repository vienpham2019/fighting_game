import { Controller } from "./controller/Controller.js";
import { EndGame } from "./controller/EndGame.js";
import { int, updatePlayer } from "./controller/Init.js";
import { StartGame } from "./controller/StartGame.js";
import { createEnemy, createPlatform } from "./helper.js";

export const canvas = document.querySelector("#canvas");
export const c = canvas.getContext("2d");

canvas.width = 1424;
canvas.height = 676;

c.fillRect(0, 0, canvas.width, canvas.height);

let initObj = int();
let controller = new Controller(initObj);
let player = initObj.player;
let gameStart = new StartGame({
  player,
});

let endGame = new EndGame({
  player,
});
// gameStart.isStartGame = true;

let enemy = createEnemy({
  platform: createPlatform(
    [{ x: 300, width: 500, offset: { x: 0, y: -252 } }],
    "platform"
  )[0],
  enemy_name: "turtle",
});

enemy.enemy = player;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  endGame.isEndGame = controller.player.health <= 0;
  if (gameStart.isStartGame === false || controller.gameLevel === 8) {
    if (controller.gameLevel === 8) {
      reset();
    }
    gameStart.run();
  } else {
    if (endGame.opacity < 1) {
      controller.run();
      controller.gameRun = true;
    }
    if (endGame.isEndGame === true) {
      endGame.run();
      controller.gameRun = false;
    }
  }

  // enemy.update();
}

animate();

window.addEventListener("keydown", (e) => {
  if (player.health > 0 && controller.gameRun) {
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
  if (player.health > 0 && controller.gameRun) {
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

  if (gameStart.isStartGame === false) {
    gameStart.buttons.forEach((b) => {
      if (
        b.x <= offsetX &&
        b.x + b.w >= offsetX &&
        b.y <= offsetY &&
        b.y + b.h >= offsetY
      ) {
        if (b.type === "start") {
          gameStart.handleStartGame();
        } else if (b.type === "options") {
          gameStart.selectPlayer.open = true;
        }
      }
    });

    if (gameStart.selectPlayer.open === true) {
      gameStart.selectPlayer.buttons.forEach((b) => {
        if (
          b.x <= offsetX &&
          b.x + b.w >= offsetX &&
          b.y <= offsetY &&
          b.y + b.h >= offsetY
        ) {
          player = updatePlayer({ player_name: b.name });
          gameStart.player = player;
          controller.player = player;
          gameStart.selectPlayer.open = false;
        }
      });
    }
  }
  if (endGame.openEndGame === true) {
    endGame.buttons.forEach((b) => {
      if (
        b.x <= offsetX &&
        b.x + b.w >= offsetX &&
        b.y <= offsetY &&
        b.y + b.h >= offsetY
      ) {
        reset(b.type);
      }
    });
  }

  if (controller.gameWin.isWinGame === true) {
    if (
      controller.gameWin.goldChest.position.x <= offsetX &&
      controller.gameWin.goldChest.position.x +
        controller.gameWin.goldChest.width >=
        offsetX &&
      controller.gameWin.goldChest.position.y <= offsetY &&
      controller.gameWin.goldChest.position.y +
        controller.gameWin.goldChest.height >=
        offsetY
    ) {
      controller.gameWin.openGoldChest();
    }
  }
});

function reset(type = "no") {
  initObj = int();
  player = updatePlayer({ player_name: player.name });

  gameStart = new StartGame({
    imageSrc: "./img/background/start game cover.png",
    player,
  });

  if (type === "yes") {
    gameStart.isStartGame = true;
    player.position = { x: 0, y: 0 };
    player.gameCurrentX = 0;
  }

  controller = new Controller({ ...initObj, player });
  endGame = new EndGame({
    imageSrc: "./img/background/End Game.png",
    player,
  });
}
