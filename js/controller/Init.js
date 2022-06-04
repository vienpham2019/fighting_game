import {
  createPlayer,
  createPlatform,
  createEnemyByPlatform,
} from "../helper.js";
import { Sprite } from "../Sprite.js";
import { platform } from "../data/platform_data.js";
import { canvas } from "../main.js";

export function int() {
  const floorImage = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 1000 },
    imageSrc: "..//img/platform lv1.png",
    scale: 1.5,
  });

  const tree1BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree1BG.png",
  });

  const tree2BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree2BG.png",
  });

  const tree3BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree3BG.png",
  });

  const tree4BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree4BG.png",
  });

  const mountainBG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/mountainBG.png",
  });

  const cloudBG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/cloudBG.png",
  });

  const shop = new Sprite({
    position: { x: 630, y: 127 },
    imageSrc: "../img/shop_anim.png",
    scale: 2.75,
    framesMax: 6,
    framesHold: 5,
  });

  const healthBar = new Sprite({
    position: { x: 20, y: 0 },
    offset: { x: 0, y: 0 },
    scale: 0.5,
    imageSrc: "../img/Health bar.png",
  });

  const playerInfo = new Sprite({
    position: { x: 100, y: 100 },
    offset: { x: 0, y: 0 },
    scale: 2,
    imageSrc: "../img/player_info.png",
  });

  const platforms = createPlatform(platform.platforms_1, "platform");
  const walls = createPlatform(platform.walls_1, "wall");

  const player = createPlayer({
    position: { x: 0, y: canvas.height - 200 },
    velocity: { x: 0, y: 0 },
    moveSpeed: { x: 4, y: 15 },
    player_name: "warior",
  });

  player.platform = platforms[0];
  player.walls = walls;

  const camera = {
    x1: 300,
    x2: 500,
    y: player.position.y + player.height / 2,
    fall_offset: { y: 30, delay_frame: 5 },
    offset: { y: 0, diff: 0, delay_frame: 25 },
  };

  player.enemys = createEnemyByPlatform(platforms);
  player.enemys.forEach((e) => (e.enemy = player));

  // let enemy = createEnemy({
  //   platform: platforms[3],
  //   enemy_name: "sygnus",
  //   enemy_type: "boss",
  // });

  // player.enemys = [];

  return {
    objs: {
      cloudBG,
      mountainBG,
      tree4BG,
      tree3BG,
      tree2BG,
      tree1BG,
      floorImage,
    },
    player,
    platforms,
    walls,
    camera,
    healthBar,
    playerInfo,
  };
}
