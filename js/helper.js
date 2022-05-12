import { canvas } from "./main.js";

import { Platform } from "./Platform.js";
import { Player } from "./Player.js";
import { Worm } from "./enemy/Worm.js";

import { player_data } from "./player_data.js";
import { enemy_data } from "./enemy_data.js";

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

export function createEnemy({ velocity, moveSpeed, platform, enemy_name }) {
  let enemy = enemy_data[enemy_name];
  let position = {
    x: getRandomArbitrary(
      platform.position.x + 10,
      platform.position.x + platform.width - enemy.width - 10
    ),
    y: platform.position.y - enemy.height,
  };
  let flip = Math.random() > 0.5 ? -1 : 1;
  switch (enemy_name) {
    case "worm":
      return new Worm({
        ...enemy,
        position,
        flip,
        platform,
        velocity,
        moveSpeed,
      });
  }
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
