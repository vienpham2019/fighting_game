import { canvas } from "./main.js";

import { Platform } from "./Platform.js";
import { Player } from "./Player.js";

// Physic Enemy
import { Skeleton } from "./enemy/physic_enemy/Skeleton.js";
import { Mushroom } from "./enemy/physic_enemy/Mushroom.js";
import { Goblin } from "./enemy/physic_enemy/Goblin.js";
import { FlyingEye } from "./enemy/physic_enemy/FlyingEye.js";
import { JungleWolf } from "./enemy/physic_enemy/JungleWolf.js";
import { WhiteWolf } from "./enemy/physic_enemy/WhiteWolf.js";
import { GreenCornian } from "./enemy/physic_enemy/GreenCornian.js";
import { DarkCornian } from "./enemy/physic_enemy/DarkCornian.js";

// magic Enemy
import { DarkDrake } from "./enemy/magic_enemy/DarkDrake.js";
import { IceDrake } from "./enemy/magic_enemy/IceDrake.js";
import { Worm } from "./enemy/magic_enemy/Worm.js";

// Boss
import { InnerRage } from "./enemy/boss/InnerRage.js";
import { Andras } from "./enemy/boss/Andras.js";

//data
import { player_data } from "./player_data.js";
import { enemy_data } from "./enemy_data.js";
import { boss_data } from "./boss_data.js";

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

export function RectCircleColliding(circle, rect) {
  // temporary variables to set edges for testing
  let testX = circle.x;
  let testY = circle.y;

  // which edge is closest?
  if (circle.x < rect.x) testX = rect.x; // test left edge
  else if (circle.x > rect.x + rect.w) testX = rect.x + rect.w; // right edge
  if (circle.y < rect.y) testY = rect.y; // top edge
  else if (circle.y > rect.y + rect.h) testY = rect.y + rect.h; // bottom edge

  // get distance from closest edges
  let distX = circle.x - testX;
  let distY = circle.y - testY;
  let distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= circle.r) {
    return true;
  }
  return false;
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

export function createEnemy({ platform, enemy_name, enemy_type = "bot" }) {
  let enemy =
    enemy_type === "bot" ? enemy_data[enemy_name] : boss_data[enemy_name];
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
    case "dark_cornian":
      return new DarkCornian({
        ...obj_val,
      });
    case "dark_drake":
      return new DarkDrake({
        ...obj_val,
      });
    case "ice_drake":
      return new IceDrake({
        ...obj_val,
      });

    // Boss
    case "inner_rage":
      return new InnerRage({
        ...obj_val,
      });
    case "andras":
      return new Andras({
        ...obj_val,
      });
  }
}

export function createEnemyByPlatform(platforms) {
  let result = [];
  let enemyOptionLV1 = ["skeleton", "mushroom", "goblin", "flying_eye"];
  let enemyOptionLV2 = ["worm", "dark_drake"];
  let enemyOptionLV3 = [
    // "jungle_wolf",
    // "white_wolf",
    // "green_cornian",
    // "dark_cornian",
    "worm",
    "dark_drake",
    "ice_drake",
  ];

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
