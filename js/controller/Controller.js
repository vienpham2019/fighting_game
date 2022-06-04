import { c } from "../main.js";
import { UpdatePlayer } from "./UpdatePlayer.js";
export class Controller {
  constructor({
    player,
    objs,
    platforms,
    walls,
    camera,
    healthBar,
    playerInfo,
  }) {
    this.player = player;
    this.objs = objs;
    this.platforms = platforms;
    this.walls = walls;
    this.camera = camera;
    this.healthBar = healthBar;
    this.playerInfoObj = new UpdatePlayer({ player, playerInfo });
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

      this.platforms.forEach((p) => {
        p.position.x += this.camera.x * -1;
      });
      // enemy
      // enemy.handleGameMove({ position: { x: this.camera.x * -1 } });
      this.player.enemys.forEach((e) => {
        e.handleGameMove({ x: this.camera.x * -1, y: 0 });
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
    this.player.update();
    // Update player enemys
    if (this.player.enemys.length > 0) {
      // update each enemy
      this.player.enemys.forEach((e) => {
        // only load enemy if player in range
        if (
          e.position.x > this.player.position.x - 600 &&
          e.position.x + e.width <
            this.player.position.x + this.player.width + 600 &&
          e.position.y > this.player.position.y - 500 &&
          e.position.y + e.height <
            this.player.position.y + this.player.height + 500
        )
          e.update();
      });
      this.player.enemys = this.player.enemys.filter((e) => !e.is_death);
    }

    // Camera
    this.handleCamera();
    // camera
  }
}
