import { c, canvas } from "../main.js";
import { InfoPanel } from "./InfoPanel.js";
import { UpdatePlayer } from "./UpdatePlayer.js";
import { ShopPanel } from "./ShopPanel.js";
import { ItemsPanel } from "./ItemsPanel.js";
import {
  createEnemyByPlatform,
  createPlatform,
  createEnemy,
} from "../helper.js";
import { platform } from "../data/platform_data.js";

export class Controller {
  constructor({
    player,
    objs,
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
  }) {
    this.player = player;
    this.objs = objs;
    this.platforms = platforms;
    this.walls = walls;
    this.camera = camera;
    this.healthBar = healthBar;
    this.itemsPanel = itemsPanel;
    this.playerInfoObj = new UpdatePlayer({ player, playerInfo });
    this.playerInfoPanel = new InfoPanel({ player, infoPanel });
    this.shopInfoPanel = new ShopPanel({ player, shopPanel, itemsPanel });
    this.itemsInfoPanel = new ItemsPanel({
      player,
      itemsPanel,
      items,
      itemsPanelDetails,
    });

    this.itemsObj = [];
    this.portal = portal;

    this.gameLevel = 1;
    this.updateGameLevelCoolDown = [100, 100];
    this.updateGameLevel = false;

    // this.itemsObj.push(
    //   createItem({
    //     type: "permanetCritPotion",
    //     position: { x: 200, y: 300 },
    //     platform: this.platforms[3],
    //     itemsPanel,
    //   })
    // );
    // this.itemsObj[0].player = player;
  }

  handleCamera() {
    this.player.gameCurrentX += this.camera.x;

    // X axis
    if (
      this.player.velocity.x === 0 &&
      this.objs.floorImage.position.x + this.camera.x * -1 <= 0
    ) {
      this.player.walls.forEach((w) => (w.position.x += this.camera.x * -1));
      // backgorund and floor x
      this.objs.floorImage.position.x += this.camera.x * -1;
      this.objs.cloudBG.position.x += this.camera.x * -0.1;
      this.objs.mountainBG.position.x += this.camera.x * -0.1;
      this.objs.tree4BG.position.x += this.camera.x * -0.2;
      this.objs.tree3BG.position.x += this.camera.x * -0.3;
      this.objs.tree2BG.position.x += this.camera.x * -0.5;
      this.objs.tree1BG.position.x += this.camera.x * -0.7;

      this.portal.position.x += this.camera.x * -1;
      this.platforms.forEach((p) => {
        p.position.x += this.camera.x * -1;
      });
      // enemy
      // enemy.handleGameMove({ position: { x: this.camera.x * -1 } });
      this.player.enemys.forEach((e) => {
        e.handleGameMove({ x: this.camera.x * -1, y: 0 });
      });

      // itemObj
      this.itemsObj.forEach((i) => {
        i.position.x += this.camera.x * -1;
      });
    }
    // X axis

    // Y axis
    if (
      (this.camera.offset.diff < 0 && this.camera.offset.y < 0) ||
      (this.camera.offset.diff > 0 && this.camera.offset.y > 0)
    ) {
      if (Math.abs(this.camera.offset.y) < Math.abs(this.camera.offset.diff)) {
        this.camera.offset.diff = this.camera.offset.y;
      }
      this.objs.floorImage.position.y += this.camera.offset.diff * -1;

      // walls
      this.walls.forEach((w) => {
        w.position.y += this.camera.offset.diff * -1;
      });

      // platforms
      this.platforms.forEach((p) => {
        p.position.y += this.camera.offset.diff * -1;
      });

      // enemys
      this.player.enemys.forEach((e) => {
        e.handleGameMove({ x: 0, y: this.camera.offset.diff * -1 });
      });

      // itemObj
      this.itemsObj.forEach((i) => {
        i.position.y += this.camera.offset.diff * -1;
      });

      // portal
      this.portal.position.y += this.camera.offset.diff * -1;

      this.player.position.y += this.camera.offset.diff * -1;
      this.camera.offset.y += this.camera.offset.diff * -1;
    }
    // Y axis

    c.beginPath();
    c.moveTo(this.player.position.x, this.camera.y);
    c.lineTo(this.player.position.x + this.player.width, this.camera.y);
    c.stroke();

    c.beginPath();
    c.moveTo(this.player.position.x, this.camera.y + this.camera.fall_offset.y);
    c.lineTo(
      this.player.position.x + this.player.width,
      this.camera.y + this.camera.fall_offset.y
    );
    c.stroke();
  }

  calculatePercent(n, start_n, end_n) {
    let result = n - ((start_n - end_n) / start_n) * n;
    return result > 0 ? result : 0;
  }

  drawPlayerHealthBar() {
    //   Health
    c.font = "bold 10px Arial";
    c.fillStyle = "#3b3a3a";

    c.fillRect(
      this.healthBar.position.x + 52,
      this.healthBar.position.y + 16,
      208,
      14
    );

    c.fillStyle = "#FF1C1C";

    c.fillRect(
      this.healthBar.position.x + 52,
      this.healthBar.position.y + 16,
      this.calculatePercent(208, this.player.maxHealth, this.player.health),
      14
    );

    c.fillStyle = "white";
    c.fillText(
      `${this.player.health > 0 ? this.player.health : 0} / ${
        this.player.maxHealth
      }`,
      this.healthBar.position.x + 170,
      this.healthBar.position.y + 26
    );

    // Shield
    c.fillStyle = "#3b3a3a";

    c.fillRect(
      this.healthBar.position.x + 52,
      this.healthBar.position.y + 33,
      178,
      8
    );

    c.fillStyle = "#007bc2";

    c.fillRect(
      this.healthBar.position.x + 52,
      this.healthBar.position.y + 33,
      this.calculatePercent(178, this.player.maxShield, this.player.shield),
      8
    );

    c.fillStyle = "white";
    c.font = "bold 8px Arial";
    c.fillText(
      `${this.player.shield > 0 ? this.player.shield : 0} / ${
        this.player.maxShield
      }`,
      this.healthBar.position.x + 160,
      this.healthBar.position.y + 41
    );

    // Hp
    c.fillStyle = "#3b3a3a";

    c.fillRect(
      this.healthBar.position.x + 52,
      this.healthBar.position.y + 44,
      144,
      8
    );

    c.fillStyle = "#088f03";

    c.fillRect(
      this.healthBar.position.x + 52,
      this.healthBar.position.y + 44,
      this.calculatePercent(144, this.player.maxLevelHp, this.player.hp),
      8
    );

    c.fillStyle = "white";
    c.font = "bold 7px Arial";
    c.fillText(
      `${this.player.hp > 0 ? this.player.hp : 0} / ${this.player.maxLevelHp}`,
      this.healthBar.position.x + 140,
      this.healthBar.position.y + 52
    );

    this.healthBar.update();
    c.fillStyle = "light";
    c.font = "bold 10px Arial";
    c.fillText(
      `${this.player.level}`,
      this.healthBar.position.x + 40 + (this.player.level < 10 ? 3 : 1),
      this.healthBar.position.y + 66
    );

    c.fillText(
      `${this.player.totalCoints}`,
      this.healthBar.position.x + 77,
      this.healthBar.position.y + 67
    );
  }

  checkObjInPlayerRange(obj) {
    return (
      obj.position.x > -100 &&
      obj.position.x + obj.width <= canvas.width + 100 &&
      obj.position.y > this.player.position.y - 500 &&
      obj.position.y + obj.height <
        this.player.position.y + this.player.height + 500
    );
  }

  rectCollition() {
    return (
      this.portal.position.x + this.portal.width >= this.player.position.x &&
      this.portal.position.x <= this.player.position.x + this.player.width &&
      this.portal.position.y + this.portal.height >= this.player.position.y &&
      this.portal.position.y <= this.player.position.y + this.player.height
    );
  }

  resetPosition() {
    this.objs.floorImage.image.src = `..//img/platform lv${this.gameLevel}.png`;
    this.camera.x = 0;

    for (let obj in this.objs) {
      this.objs[obj].position = { x: 0, y: 0 };
    }
    this.objs.floorImage.position = { x: 0, y: 100 };
    this.player.position = { x: 0, y: canvas.height - 200 };
    this.player.gameCurrentX = 0;

    this.platforms = createPlatform(
      platform[`platforms_${this.gameLevel}`],
      "platform"
    );
    this.walls = createPlatform(platform[`walls_${this.gameLevel}`], "wall");
    this.player.enemys = createEnemyByPlatform(this.platforms);
    switch (this.gameLevel) {
      case 2:
        this.player.enemys.push(
          createEnemy({
            platform: this.platforms[0],
            enemy_name: "andras",
            enemy_type: "boss",
          })
        );
        break;
    }
    this.player.enemys.forEach((e) => (e.enemy = this.player));

    this.player.platform = this.platforms[0];
    this.player.walls = this.walls;

    this.updateGameLevelCoolDown[0] = this.updateGameLevelCoolDown[1];
    this.updateGameLevel = false;
  }

  handleGameLevel() {
    this.gameLevel++;

    switch (this.gameLevel) {
      case 2:
        this.resetPosition();
        this.portal.position = { x: 3000, y: 170 };
        break;

      default:
        break;
    }
  }

  handlePortal() {
    c.beginPath();
    c.strokeStyle = "red";
    c.rect(
      this.portal.position.x,
      this.portal.position.y,
      this.portal.width,
      this.portal.height
    );
    c.stroke();

    this.portal.update();
    if (this.rectCollition() && this.updateGameLevel === false) {
      if (--this.updateGameLevelCoolDown[0] <= 0) {
        this.updateGameLevel = true;
        this.handleGameLevel();
      }
    } else {
      this.updateGameLevelCoolDown[0] = this.updateGameLevelCoolDown[1];
    }
  }

  run() {
    for (let obj in this.objs) {
      this.objs[obj].update();
    }
    this.player.floorImage.x =
      this.objs.floorImage.image.width * this.objs.floorImage.scale;

    // enemy.update();
    this.platforms.forEach((p) => {
      p.draw();
    });
    this.walls.forEach((p) => {
      p.draw();
    });
    // player move
    this.player.move({ left: "a", right: "d" }, this.camera);
    for (let i = 0; i < this.walls.length; i++) {
      this.player.sideColition(this.walls[i], this.camera);
    }

    for (let i = 0; i < this.platforms.length; i++) {
      this.player.floorColition(this.platforms[i], this.camera);
    }

    this.handlePortal();

    this.player.update();
    // Update player enemys
    if (this.player.enemys.length > 0) {
      // update each enemy
      this.player.enemys.forEach((e) => {
        // only load enemy if player in range
        if (this.checkObjInPlayerRange(e)) e.update();
      });
      this.player.enemys = this.player.enemys.filter((e) => {
        if (e.health <= 0 && e.dropItems === false) {
          e.dropItems = true;
          e.itemsObj.forEach((i) => {
            i.position = { ...e.position };
            i.itemsPanel = this.itemsPanel;
            i.player = this.player;
            this.itemsObj.push(i);
          });
        }
        return !e.is_death;
      });
    }

    // itemsObj
    if (this.itemsObj.length > 0) {
      this.itemsObj.forEach((i) => {
        if (this.checkObjInPlayerRange(i)) i.run();
        if (--i.coolDown <= 0) i.isPickUp = true;
      });
      this.itemsObj = this.itemsObj.filter((i) => i.isPickUp === false);
    }

    // Camera
    this.handleCamera();
    // camera

    // game object
    this.drawPlayerHealthBar();
    this.playerInfoObj.run();
    this.playerInfoPanel.run();
    // this.shopInfoPanel.run();
    this.itemsInfoPanel.run();
  }
}
