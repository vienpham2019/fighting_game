const swordsman = {
  height: 88,
  width: 52,
  imageSrc: "./img/swordsman/Idle.png",
  scale: 1.7,
  framesMax: 8,
  framesHold: 4,
  offset: { x: 142, y: 121 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 130,
    height: 25,
    offset: { x: 65, y: 20 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/swordsman/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./img/swordsman/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/swordsman/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/swordsman/Fall.png",
      framesMax: 2,
    },
    takeHit: {
      imageSrc: "./img/swordsman/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/swordsman/Death.png",
      framesMax: 6,
    },
    attack: [
      {
        imageSrc: "./img/swordsman/Attack1.png",
        hitFrame: 5,
        framesMax: 6,
        damge: 6,
      },
      {
        imageSrc: "./img/swordsman/Attack2.png",
        hitFrame: 5,
        framesMax: 6,
        damge: 6,
      },
    ],
  },
};

const warior = {
  height: 88,
  width: 52,
  imageSrc: "./img/warior/Idle.png",
  scale: 1.9,
  framesMax: 10,
  framesHold: 4,
  offset: { x: 130, y: 104 },
  attack_box: {
    position: { x: 0, y: 0 },
    width: 110,
    height: 50,
    offset: { x: 60, y: 30 },
  },
  sprites: {
    idle: {
      imageSrc: "./img/warior/Idle.png",
      framesMax: 10,
    },
    run: {
      imageSrc: "./img/warior/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/warior/Jump.png",
      framesMax: 3,
    },
    fall: {
      imageSrc: "./img/warior/Fall.png",
      framesMax: 3,
    },
    takeHit: {
      imageSrc: "./img/warior/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./img/warior/Death.png",
      framesMax: 7,
    },
    attack: [
      {
        imageSrc: "./img/warior/Attack1.png",
        hitFrame: 5,
        framesMax: 7,
        damge: 5,
      },
      {
        imageSrc: "./img/warior/Attack2.png",
        hitFrame: 3,
        framesMax: 7,
        damge: 5,
      },
      {
        imageSrc: "./img/warior/Attack3.png",
        hitFrame: 5,
        framesMax: 8,
        damge: 10,
      },
    ],
  },
};

export let player_data = { swordsman, warior };
