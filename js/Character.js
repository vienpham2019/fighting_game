import { c, canvas } from "./main.js";
import { Sprite } from "./Sprite.js";

export class Character extends Sprite {
  constructor({
    position,
    velocity,
    width = 60,
    height = 150,
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesHold = 1,
    offset = { x: 0, y: 0 },
    sprites,
    flip = 1,
    attack_box,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      framesHold,
      offset,
      flip,
    });
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.attack_box = attack_box;
    this.sprites = sprites;
    this.attack_sprite_count = 0;
    this.attack_sprite = false;
    this.enemy;
    this.get_hit = false;
    this.health = 100;

    for (const sprite in sprites) {
      if (Array.isArray(sprites[sprite])) {
        for (let index in sprites[sprite]) {
          sprites[sprite][index].image = new Image();
          sprites[sprite][index].image.src = sprites[sprite][index].imageSrc;
        }
      } else {
        sprites[sprite].image = new Image();
        sprites[sprite].image.src = sprites[sprite].imageSrc;
      }
    }
  }

  hitboxdraw() {
    let { x, y } = this.position;
    c.beginPath();
    c.strokeStyle = "red";
    c.rect(x, y, this.width, this.height);
    c.stroke();

    // attack box
    if (this.is_attacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attack_box.position.x,
        this.attack_box.position.y,
        this.attack_box.width,
        this.attack_box.height
      );
    }
  }

  updateSprite(sprite) {
    // override death
    if (this.image === this.sprites.death.image) {
      if (this.frameCurrent === this.sprites.death.framesMax - 1)
        this.stop_animation = true;
      return;
    }

    // override take hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.frameCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;

    //override attack
    if (this.attack_sprite) return;

    if (sprite.image !== this.image) {
      this.image = sprite.image;
      this.framesMax = sprite.framesMax;
      this.frameCurrent = 0;
    }
  }

  rectCollition(enemy) {
    return (
      this.attack_box.position.x + this.attack_box.width >= enemy.position.x &&
      this.attack_box.position.x <= enemy.position.x + enemy.width &&
      this.attack_box.position.y + this.attack_box.height >= enemy.position.y &&
      this.attack_box.position.y <= enemy.position.y + enemy.height
    );
  }

  attack() {
    if (this.attack_sprite_count === 0 && !this.is_attacking) {
      this.is_attacking = true;
      this.attack_sprite_count = this.sprites.attack.length;
    }
  }

  handelAttack() {
    if (this.attack_sprite_count > 0) {
      let sprite =
        this.sprites.attack[
          this.sprites.attack.length - this.attack_sprite_count
        ];

      this.updateSprite(sprite);
      this.attack_sprite = true;
      if (
        !this.enemy.get_hit &&
        this.frameCurrent === sprite.hitFrame &&
        this.rectCollition(this.enemy)
      ) {
        this.enemy.get_hit = true;
        if (this.enemy.health <= 0)
          this.enemy.updateSprite(this.enemy.sprites.death);
        else {
          this.enemy.health -= sprite.damge;
          this.enemy.updateSprite(this.enemy.sprites.takeHit);
        }
      }

      if (this.frameCurrent === this.framesMax - 1) {
        this.attack_sprite = false;
        this.enemy.get_hit = false;
        this.attack_sprite_count--;
      }
    } else this.is_attacking = false;
  }

  update() {
    super.update();

    // attack
    this.handelAttack();

    this.attack_box.offset.x =
      this.flip === -1 ? -(this.attack_box.width - 5) : this.width;

    this.attack_box.position.x = this.position.x + this.attack_box.offset.x;
    this.attack_box.position.y = this.position.y + this.attack_box.offset.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    // this.hitboxdraw();
  }
}
