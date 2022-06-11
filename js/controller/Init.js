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
    position: { x: 0, y: 100 },
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
    position: { x: 200, y: 200 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/player info.png",
  });

  const infoPanel = new Sprite({
    position: { x: -20, y: canvas.height - 190 },
    offset: { x: 0, y: 0 },
    scale: 0.7,
    imageSrc: "../img/info panel.png",
  });

  const shopPanel = new Sprite({
    position: { x: 200, y: 200 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/shop_panel.png",
  });

  const itemsPanel = new Sprite({
    position: { x: canvas.width - 260, y: canvas.height - 120 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/items_panel.png",
  });

  const itemsPanelDetails = new Sprite({
    position: { x: canvas.width - 256, y: canvas.height - 171 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/items_panel_details.png",
  });

  const portal = new Sprite({
    position: { x: 200, y: 200 },
    offset: { x: 80, y: 30 },
    width: 100,
    height: 200,
    scale: 0.5,
    framesMax: 9,
    framesHold: 7,
    imageSrc: "../img/portal.png",
  });

  const items = {
    healPotion: new Sprite({
      position: {
        x: itemsPanel.position.x + 28,
        y: itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/heal potion.png",
    }),
    shieldPotion: new Sprite({
      position: {
        x: itemsPanel.position.x + 25,
        y: itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/shield potion.png",
    }),
    critPotion: new Sprite({
      position: {
        x: itemsPanel.position.x + 21,
        y: itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/crit potion.png",
    }),
    permanetCritPotion: new Sprite({
      position: {
        x: itemsPanel.position.x + 20,
        y: itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/permanent crit potion.png",
    }),
  };
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
    infoPanel,
    shopPanel,
    itemsPanel,
    items,
    itemsPanelDetails,
    portal,
  };
}
