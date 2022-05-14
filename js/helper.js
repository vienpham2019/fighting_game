import { canvas } from "./main.js";

import { Platform } from "./Platform.js";
import { Player } from "./Player.js";
import { Worm } from "./enemy/Worm.js";
import { Skeleton } from "./enemy/Skeleton.js";
import { Mushroom } from "./enemy/Mushroom.js";
import { Goblin } from "./enemy/Goblin.js";
import { FlyingEye } from "./enemy/FlyingEye.js";
import { JungleWolf } from "./enemy/JungleWolf.js";
import { WhiteWolf } from "./enemy/WhiteWolf.js";

import { player_data } from "./player_data.js";
import { enemy_data } from "./enemy_data.js";
import { GreenCornian } from "./enemy/GreenCornian.js";

export function getCoordinate(p) {
  return [
    p.position.x,
    p.position.x + p.width,
    p.position.y,
    p.position.y + p.height,
  ];
}

export function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function createPlayer({
  position,
  velocity,
  moveSpeed,
  flip = 1,
  player_name,
}) {
  return new Player({
    ...player_data[player_name],
    flip,
    position,
    velocity,
    moveSpeed,
  });
}

export function createEnemy({ platform, enemy_name }) {
  let enemy = enemy_data[enemy_name];
  let position = {
    x: getRandomArbitrary(
      platform.position.x + 10,
      platform.position.x + platform.width - enemy.width - 10
    ),
    y: platform.position.y - enemy.height,
  };
  let flip = Math.random() > 0.5 ? -1 : 1;
  let obj_val = {
    ...enemy,
    position,
    flip,
    platform,
  };
  switch (enemy_name) {
    case "worm":
      return new Worm({
        ...obj_val,
      });
    case "skeleton":
      return new Skeleton({
        ...obj_val,
      });
    case "mushroom":
      return new Mushroom({
        ...obj_val,
      });
    case "goblin":
      return new Goblin({
        ...obj_val,
      });
    case "flying_eye":
      return new FlyingEye({
        ...obj_val,
      });
    case "jungle_wolf":
      return new JungleWolf({
        ...obj_val,
      });
    case "white_wolf":
      return new WhiteWolf({
        ...obj_val,
      });
    case "green_cornian":
      return new GreenCornian({
        ...obj_val,
      });
  }
}

export function createEnemyByPlatform(platforms) {
  let result = [];
  let enemyOptionLV1 = ["skeleton", "mushroom", "goblin", "flying_eye"];
  let enemyOptionLV2 = ["worm"];
  let enemyOptionLV3 = ["jungle_wolf", "white_wolf", "green_cornian"];

  let enemyOption = enemyOptionLV3;
  platforms.forEach((p) => {
    if (p.width >= 200) {
      let number_of_enemy = Math.min(
        getRandomArbitrary(1, Math.floor(p.width / 100)),
        3
      );

      for (let i = 0; i < number_of_enemy; i++) {
        let enemy_name = enemyOption[getRandomArbitrary(0, enemyOption.length)];
        result.push(createEnemy({ platform: p, enemy_name }));
      }
    }
  });
  return result;
}

export function createPlatform(arr) {
  let result = [];
  for (let e of arr) {
    let { x, y, width, height } = e;
    result.push(
      new Platform({
        position: { x, y },
        width,
        height,
      })
    );
  }
  return result;
}
