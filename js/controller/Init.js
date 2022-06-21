import {
  createPlayer,
  createPlatform,
  createEnemyByPlatform,
  getRandomArbitrary,
} from "../helper.js";
import { Sprite } from "../Sprite.js";
import { platform } from "../data/platform_data.js";
import { canvas } from "../main.js";

// let width = 1424;
// let height = 676;

// let width = 2000;
// let height = -900;

export function int() {
  const floorImage = new Sprite({
    position: { x: 0, y: 100 },
    offset: { x: 0, y: 1000 },
    imageSrc: "..//img/platforms/platform lv6.png",
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
    imageSrc: "../img/gameObj/Health bar.png",
  });

  const playerInfo = new Sprite({
    position: { x: 200, y: 200 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/player info.png",
  });

  const infoPanel = new Sprite({
    position: { x: -20, y: canvas.height - 190 },
    offset: { x: 0, y: 0 },
    scale: 0.7,
    imageSrc: "../img/gameObj/info panel.png",
  });

  const shopPanel = new Sprite({
    position: { x: 200, y: 200 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/shop_panel.png",
  });

  const itemsPanel = new Sprite({
    position: { x: canvas.width - 260, y: canvas.height - 120 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/items_panel.png",
  });

  const itemsPanelDetails = new Sprite({
    position: { x: canvas.width - 256, y: canvas.height - 171 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/items_panel_details.png",
  });

  const bossHealth = new Sprite({
    position: { x: 800, y: 0 },
    offset: { x: 0, y: 0 },
    scale: 0.5,
    imageSrc: "../img/gameObj/boss health.png",
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
  const platforms = createPlatform(platform.platforms_6, "platform");
  const walls = createPlatform(platform.walls_6, "wall");
  const portalPlatforms = platforms.filter((p) => p.portalPlatform);
  const portalCordinate =
    portalPlatforms[getRandomArbitrary(0, portalPlatforms.length)];
  const portal = new Sprite({
    position: {
      x:
        portalCordinate.position.x +
        (portalCordinate.portalFlip === 1 ? portalCordinate.width - 100 : 0),
      y: portalCordinate.position.y - 200,
    },
    offset: { x: 80, y: 30 },
    width: 100,
    height: 200,
    scale: 0.5,
    framesMax: 9,
    framesHold: 7,
    flip: portalCordinate.portalFlip,
    imageSrc: "../img/gameObj/portal.png",
  });
  const player = createPlayer({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    moveSpeed: { x: 4, y: 15 },
    player_name: "warior",
  });

  player.platform = platforms[0];
  player.walls = walls;

  const camera = {
    x1: 300,
    x2: 500,
    y: platforms[0].position.y,
    fall_offset: { y: 30, delay_frame: 5 },
    offset: { y: 0, diff: 0, delay_frame: 25 },
  };

  player.enemys = createEnemyByPlatform(platforms);
  player.enemys.forEach((e) => (e.enemy = player));

  // floorImage.position.x -= width;
  // floorImage.position.y -= height;
  // portal.position.x -= width;
  // portal.position.y -= height;
  // platforms.forEach((p) => {
  //   p.position.x -= width;
  //   p.position.y -= height;
  // });

  // walls.forEach((w) => {
  //   w.position.x -= width;
  //   w.position.y -= height;
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
    bossHealth,
  };
}
