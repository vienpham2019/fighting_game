const worm = {
  height: 58,
  width: 105,
  imageSrc: "./img/bot/Worm/Idle.png",
  scale: 2,
  framesMax: 9,
  framesHold: 4,
  offset: { x: 40, y: 60 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 130,
    height: 40,
    offset: { x: 0, y: 10 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/bot/Worm/Idle.png",
      framesMax: 9,
    },
    run: {
      imageSrc: "./img/bot/Worm/Walk.png",
      framesMax: 9,
    },
    takeHit: {
      imageSrc: "./img/bot/Worm/Get Hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/bot/Worm/Death.png",
      framesMax: 8,
    },
    attack: [
      {
        imageSrc: "./img/bot/Worm/Attack.png",
        framesMax: 16,
        hitFrame: 11,
        damge: 6,
      },
    ],
    fire_ball: {
      move: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/Worm/Move.png",
        framesMax: 6,
        framesHold: 4,
        offset: { x: 20, y: 25 },
        scale: 1.3,
      },
      explosion: {
        height: 20,
        width: 20,
        imageSrc: "./img/bot/Worm/Explosion.png",
        framesMax: 7,
        framesHold: 4,
        offset: { x: 20, y: 25 },
        scale: 1.3,
      },
    },
  },
};

export let enemy_data = { worm };
