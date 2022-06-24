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
let obj = {
  floorImage: null,
  tree1BG: null,
  tree2BG: null,
  tree3BG: null,
  tree4BG: null,
  mountainBG: null,
  cloudBG: null,
  healthBar: null,
  playerInfo: null,
  infoPanel: null,
  shopPanel: null,
  itemsPanel: null,
  itemsPanelDetails: null,
  bossHealth: null,
  items: null,
  platforms: null,
  walls: null,
  player: null,
  camera: null,
  portal: null,
};

export function int() {
  obj.floorImage = new Sprite({
    position: { x: 0, y: 100 },
    offset: { x: 0, y: 1000 },
    imageSrc: "..//img/platforms/platform lv6.png",
    scale: 1.5,
  });

  obj.tree1BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree1BG.png",
  });

  obj.tree2BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree2BG.png",
  });

  obj.tree3BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree3BG.png",
  });

  obj.tree4BG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/tree4BG.png",
  });

  obj.mountainBG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/mountainBG.png",
  });

  obj.cloudBG = new Sprite({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: "../img/background/cloudBG.png",
  });

  let shop = new Sprite({
    position: { x: 630, y: 127 },
    imageSrc: "../img/shop_anim.png",
    scale: 2.75,
    framesMax: 6,
    framesHold: 5,
  });

  obj.healthBar = new Sprite({
    position: { x: 20, y: 0 },
    offset: { x: 0, y: 0 },
    scale: 0.5,
    imageSrc: "../img/gameObj/Health bar.png",
  });

  obj.playerInfo = new Sprite({
    position: { x: 200, y: 200 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/player info.png",
  });

  obj.infoPanel = new Sprite({
    position: { x: -20, y: canvas.height - 190 },
    offset: { x: 0, y: 0 },
    scale: 0.7,
    imageSrc: "../img/gameObj/info panel.png",
  });

  obj.shopPanel = new Sprite({
    position: { x: 200, y: 200 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/shop_panel.png",
  });

  obj.itemsPanel = new Sprite({
    position: { x: canvas.width - 260, y: canvas.height - 120 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/items_panel.png",
  });

  obj.itemsPanelDetails = new Sprite({
    position: { x: canvas.width - 256, y: canvas.height - 171 },
    offset: { x: 0, y: 0 },
    scale: 1,
    imageSrc: "../img/gameObj/items_panel_details.png",
  });

  obj.bossHealth = new Sprite({
    position: { x: 800, y: 0 },
    offset: { x: 0, y: 0 },
    scale: 0.5,
    imageSrc: "../img/gameObj/boss health.png",
  });

  obj.items = {
    healPotion: new Sprite({
      position: {
        x: obj.itemsPanel.position.x + 28,
        y: obj.itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/heal potion.png",
    }),
    shieldPotion: new Sprite({
      position: {
        x: obj.itemsPanel.position.x + 25,
        y: obj.itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/shield potion.png",
    }),
    critPotion: new Sprite({
      position: {
        x: obj.itemsPanel.position.x + 21,
        y: obj.itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/crit potion.png",
    }),
    permanetCritPotion: new Sprite({
      position: {
        x: obj.itemsPanel.position.x + 20,
        y: obj.itemsPanel.position.y + 34,
      },
      offset: { x: 0, y: 0 },
      scale: 1,
      imageSrc: "../img/items/permanent crit potion.png",
    }),
  };
  obj.platforms = createPlatform(platform.platforms_6, "platform");
  obj.walls = createPlatform(platform.walls_6, "wall");
  const portalPlatforms = obj.platforms.filter((p) => p.portalPlatform);
  const portalCordinate =
    portalPlatforms[getRandomArbitrary(0, portalPlatforms.length)];
  obj.portal = new Sprite({
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
  obj.player = createPlayer({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    moveSpeed: { x: 4, y: 15 },
    player_name: "warior",
  });

  obj.player.platform = obj.platforms[0];
  obj.player.walls = obj.walls;

  obj.camera = {
    x1: 300,
    x2: 500,
    y: obj.platforms[0].position.y,
    fall_offset: { y: 30, delay_frame: 5 },
    offset: { y: 0, diff: 0, delay_frame: 25 },
  };

  obj.player.enemys = createEnemyByPlatform(obj.platforms);
  obj.player.enemys.forEach((e) => (e.enemy = obj.player));

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
      cloudBG: obj.cloudBG,
      mountainBG: obj.mountainBG,
      tree4BG: obj.tree4BG,
      tree3BG: obj.tree3BG,
      tree2BG: obj.tree2BG,
      tree1BG: obj.tree1BG,
      floorImage: obj.floorImage,
    },
    player: obj.player,
    platforms: obj.platforms,
    walls: obj.walls,
    camera: obj.camera,
    healthBar: obj.healthBar,
    playerInfo: obj.playerInfo,
    infoPanel: obj.infoPanel,
    shopPanel: obj.shopPanel,
    itemsPanel: obj.itemsPanel,
    items: obj.items,
    itemsPanelDetails: obj.itemsPanelDetails,
    portal: obj.portal,
    bossHealth: obj.bossHealth,
  };
}

export function updatePlayer({ player_name }) {
  let u_player = createPlayer({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    moveSpeed: { x: 4, y: 15 },
    player_name,
  });

  u_player.enemys = obj.player.enemys;
  u_player.platform = obj.platforms[0];
  u_player.walls = obj.walls;
  u_player.enemys.forEach((e) => (e.enemy = u_player));
  obj.player = u_player;
  return obj.player;
}
