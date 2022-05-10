import { canvas } from "./main.js";
import { Platform } from "./Platform.js";
import { Player } from "./Player.js";
import { player_data } from "./player_data.js";
export function getCoordinate(p) {
  return [
    p.position.x,
    p.position.x + p.width,
    p.position.y,
    p.position.y + p.height,
  ];
}

export function createPlayer({ position, velocity, moveSpeed, player_name }) {
  return new Player({
    ...player_data[player_name],
    position,
    velocity,
    moveSpeed,
  });
}

export function createPlatform(arr) {
  let x = -4;
  let result = [];
  for (let e of arr) {
    let { width, height } = e;
    result.push(
      new Platform({
        position: { x, y: canvas.height - height },
        width,
        height,
      })
    );
    x += width;
  }
  return result;
}
