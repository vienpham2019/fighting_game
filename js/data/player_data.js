
const warior = {
  name: "warior",
  height: 110,
  width: 70,
  imageSrc: "./img/player_character/warior/Idle.png",
  scale: 1,
  attack_box: {
    position: { x: 0, y: 0 },
    width: 110,
    height: 50,
    offset: { x: 60, y: 30 },
  },
  damage: 20,
  sprites: {
    idle: {
      imageSrc: "./img/player_character/warior/Idle.png",
      framesMax: 6,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
    }},
    run: {
      imageSrc: "./img/player_character/warior/Run.png",
      framesMax: 8,
      framesHold: 7,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    jump: {
      imageSrc: "./img/player_character/warior/Jump.png",
      framesMax: 3,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    fall: {
      imageSrc: "./img/player_character/warior/Fall.png",
      framesMax: 3,
      framesHold: 7,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    takeHit: {
      imageSrc: "./img/player_character/warior/Take hit.png",
      framesMax: 4,
      framesHold: 3,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    death: {
      imageSrc: "./img/player_character/warior/Death.png",
      framesMax: 8,
      framesHold: 14,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      }
    },
    skill1: {
      imageSrc: "./img/player_character/warior/Attack Skill 1.png",
      framesMax: 45,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      },
      hitFrames: [
        [4,5], 
        [13,14], 
        [24,25], 
        [33,34], 
        [36,45]
      ], 
      attack_box: [
        {
          width: 176,
          height: 100,
          offset: { x: -70, y: 0 },
        },
        {
          width: 249,
          height: 100,
          offset: { x: -130, y: 0 },
        },
        {
          width: 138,
          height: 183,
          offset: { x: 0, y: -45 },
        },
        {
          width: 198,
          height: 103,
          offset: { x: -105, y: 0 },
        },
        {
          width: 156,
          height: 33,
          offset: { x: -25, y: 30 },
        }
      ]
    }, 
    skill2: {
      imageSrc: "./img/player_character/warior/Attack Skill 2.png",
      framesMax: 16,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      },
      activate_frame: 13, 
      magic:{
        fly_obj: {
          height: 72,
          width: 75,
          imageSrc: "./img/player_character/warior/fly obj.png",
          framesMax: 2,
          framesHold: 4,
          offset: { x: 10, y: 15 },
          scale: 1,
          move_speed: 9, 
          pos_offset: {
            "1": { x: 100, y: -20 },
            "-1": { x: -100, y: -20 }
          },
        }, 
        explosion: {
          imageSrc: "./img/player_character/warior/expl.png",
          height: 72,
          width: 75,
          framesMax: 4,
          framesHold: 5,
          offset: { x: 10, y: 15 },
          scale: 1,
          pos_offset: {
            "1": { x: 76, y: 73 },
            "-1": { x: 160, y: 75 }
          },
        }
      }
      
    }, 
    skill3: {
      imageSrc: "./img/player_character/warior/Attack Skill 3.png",
      framesMax: 61,
      framesHold: 5,
      offset: {
        "1": { x: 76, y: 73 },
        "-1": { x: 160, y: 75 }
      },
      hitFrames: [
        [3,4], 
        [9,10], 
        [14,15], 
        [17,22],
        [22,29], 
        [29,35], 
        [36,42], 
        [43,52], 
        [53,60]
      ], 
      attack_box: [
        {
          width: 233,
          height: 113,
          offset: { x: -130, y: 5 },
        },
        {
          width: 103,
          height: 86,
          offset: { x: 0, y: 20 },
        },
        {
          width: 83,
          height: 176,
          offset: { x: -30, y: -70 },
        },
        {
          width: 185,
          height: 150,
          offset: { x: -70, y: -30 },
        },
        {
          width: 185,
          height: 150,
          offset: { x: -70, y: -30 },
        },
        {
          width: 185,
          height: 70,
          offset: { x: -50, y: 60 },
        },
        {
          width: 225,
          height: 130,
          offset: { x: -140, y: -40 },
        },
        {
          width: 245,
          height: 90,
          offset: { x: -90, y: 20 },
        },
        {
          width: 115,
          height: 160,
          offset: { x: 20, y: -45 },
        }
      ]
    }, 
    attack: [
      {
        imageSrc: "./img/player_character/warior/Attack1.png",
        hitFrame: 5,
        framesMax: 7,
      },
      {
        imageSrc: "./img/player_character/warior/Attack2.png",
        hitFrame: 3,
        framesMax: 7,
      },
      {
        imageSrc: "./img/player_character/warior/Attack3.png",
        hitFrame: 5,
        framesMax: 8,
        heavyAttack: 1.4,
      },
    ],
  },
};

const swordsman = {
  name: "swordsman",
  height: 110,
  width: 70,
  imageSrc: "./img/player_character/swordsman/Idle.png",
  scale: 1,
  attack_box: {
    position: { x: 0, y: 0 },
    width: 110,
    height: 50,
    offset: { x: 60, y: 30 },
  },
  damage: 20,
  sprites: {
    idle: {
      imageSrc: "./img/player_character/swordsman/Idle.png",
      framesMax: 6,
      framesHold: 5,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
    }},
    run: {
      imageSrc: "./img/player_character/swordsman/Run.png",
      framesMax: 6,
      framesHold: 4,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    jump: {
      imageSrc: "./img/player_character/swordsman/Jump.png",
      framesMax: 3,
      framesHold: 4,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    fall: {
      imageSrc: "./img/player_character/swordsman/Fall.png",
      framesMax: 2,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    takeHit: {
      imageSrc: "./img/player_character/swordsman/Take Hit.png",
      framesMax: 2,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    death: {
      imageSrc: "./img/player_character/swordsman/Death.png",
      framesMax: 5,
      framesHold: 14,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    skill1: {
      imageSrc: "./img/player_character/swordsman/Attack Skill 1.png",
      framesMax: 24,
      framesHold: 5,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      },
      hitFrames: [
        [4,5], 
        [13,14], 
        [24,25], 
        [33,34], 
        [36,45]
      ], 
      attack_box: [
        {
          width: 176,
          height: 100,
          offset: { x: -70, y: 0 },
        },
        {
          width: 249,
          height: 100,
          offset: { x: -130, y: 0 },
        },
        {
          width: 138,
          height: 183,
          offset: { x: 0, y: -45 },
        },
        {
          width: 198,
          height: 103,
          offset: { x: -105, y: 0 },
        },
        {
          width: 156,
          height: 33,
          offset: { x: -25, y: 30 },
        }
      ]
    }, 
    skill2: {
      imageSrc: "./img/player_character/swordsman/Attack Skill 2.png",
      framesMax: 14,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      },
      activate_frame: 13, 
      magic:{
        flame_obj: {
          height: 90,
          width: 425,
          imageSrc: "./img/player_character/swordsman/Attack Skill 2 Effect.png",
          framesMax: 20,
          framesHold: 4,
          offset: { x: 4, y: 35 },
          scale: 0.6,
          pos_offset: {
            "1": { x: 100, y: -20 },
            "-1": { x: -100, y: -20 }
          },
        }
      }
      
    }, 
    skill3: {
      imageSrc: "./img/player_character/swordsman/Attack Skill 3.png",
      framesMax: 59,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      },
      hitFrames: [
        [3,4], 
        [9,10], 
        [14,15], 
        [17,22],
        [22,29], 
        [29,35], 
        [36,42], 
        [43,52], 
        [53,60]
      ], 
      attack_box: [
        {
          width: 233,
          height: 113,
          offset: { x: -130, y: 5 },
        },
        {
          width: 103,
          height: 86,
          offset: { x: 0, y: 20 },
        },
        {
          width: 83,
          height: 176,
          offset: { x: -30, y: -70 },
        },
        {
          width: 185,
          height: 150,
          offset: { x: -70, y: -30 },
        },
        {
          width: 185,
          height: 150,
          offset: { x: -70, y: -30 },
        },
        {
          width: 185,
          height: 70,
          offset: { x: -50, y: 60 },
        },
        {
          width: 225,
          height: 130,
          offset: { x: -140, y: -40 },
        },
        {
          width: 245,
          height: 90,
          offset: { x: -90, y: 20 },
        },
        {
          width: 115,
          height: 160,
          offset: { x: 20, y: -45 },
        }
      ], 
      activate_frame: 13, 
      magic:{
        flame_obj: {
          height: 130,
          width: 205,
          imageSrc: "./img/player_character/swordsman/Attack Skill 3 Effect.png",
          framesMax: 10,
          framesHold: 4,
          offset: { x: 30, y: 10 },
          scale: 0.6,
          pos_offset: {
            "1": { x: 100, y: -20 },
            "-1": { x: -100, y: -20 }
          },
        }
      }
    }, 
  },
};

const hitman = {
  name: "hitman",
  height: 110,
  width: 70,
  imageSrc: "./img/player_character/hitman/Idle.png",
  scale: 1,
  attack_box: {
    position: { x: 0, y: 0 },
    width: 110,
    height: 50,
    offset: { x: 60, y: 30 },
  },
  damage: 20,
  sprites: {
    idle: {
      imageSrc: "./img/player_character/hitman/Idle.png",
      framesMax: 6,
      framesHold: 5,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
    }},
    run: {
      imageSrc: "./img/player_character/hitman/Run.png",
      framesMax: 6,
      framesHold: 4,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    jump: {
      imageSrc: "./img/player_character/hitman/Jump.png",
      framesMax: 3,
      framesHold: 4,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    fall: {
      imageSrc: "./img/player_character/hitman/Fall.png",
      framesMax: 2,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    takeHit: {
      imageSrc: "./img/player_character/hitman/Take Hit.png",
      framesMax: 2,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    death: {
      imageSrc: "./img/player_character/hitman/Death.png",
      framesMax: 5,
      framesHold: 14,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      }
    },
    skill1: {
      imageSrc: "./img/player_character/hitman/Attack Skill 1.png",
      framesMax: 24,
      framesHold: 5,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      },
      hitFrames: [
        [4,5], 
        [13,14], 
        [24,25], 
        [33,34], 
        [36,45]
      ], 
      attack_box: [
        {
          width: 176,
          height: 100,
          offset: { x: -70, y: 0 },
        },
        {
          width: 249,
          height: 100,
          offset: { x: -130, y: 0 },
        },
        {
          width: 138,
          height: 183,
          offset: { x: 0, y: -45 },
        },
        {
          width: 198,
          height: 103,
          offset: { x: -105, y: 0 },
        },
        {
          width: 156,
          height: 33,
          offset: { x: -25, y: 30 },
        }
      ]
    }, 
    skill2: {
      // imageSrc: "./img/player_character/hitman/Attack Skill 2.png",
      framesMax: 14,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      },
      activate_frame: 13, 
      magic:{
        flame_obj: {
          height: 90,
          width: 425,
          imageSrc: "./img/player_character/hitman/Attack Skill 2 Effect.png",
          framesMax: 20,
          framesHold: 4,
          offset: { x: 4, y: 35 },
          scale: 0.6,
          pos_offset: {
            "1": { x: 100, y: -20 },
            "-1": { x: -100, y: -20 }
          },
        }
      }
      
    }, 
    skill3: {
      imageSrc: "./img/player_character/hitman/Attack Skill 3.png",
      framesMax: 59,
      framesHold: 6,
      offset: {
        "1": { x: 55, y: 78 },
        "-1": { x: 104, y: 75 }
      },
      hitFrames: [
        [3,4], 
        [9,10], 
        [14,15], 
        [17,22],
        [22,29], 
        [29,35], 
        [36,42], 
        [43,52], 
        [53,60]
      ], 
      attack_box: [
        {
          width: 233,
          height: 113,
          offset: { x: -130, y: 5 },
        },
        {
          width: 103,
          height: 86,
          offset: { x: 0, y: 20 },
        },
        {
          width: 83,
          height: 176,
          offset: { x: -30, y: -70 },
        },
        {
          width: 185,
          height: 150,
          offset: { x: -70, y: -30 },
        },
        {
          width: 185,
          height: 150,
          offset: { x: -70, y: -30 },
        },
        {
          width: 185,
          height: 70,
          offset: { x: -50, y: 60 },
        },
        {
          width: 225,
          height: 130,
          offset: { x: -140, y: -40 },
        },
        {
          width: 245,
          height: 90,
          offset: { x: -90, y: 20 },
        },
        {
          width: 115,
          height: 160,
          offset: { x: 20, y: -45 },
        }
      ], 
      activate_frame: 13, 
      magic:{
        flame_obj: {
          height: 130,
          width: 205,
          // imageSrc: "./img/player_character/hitman/Attack Skill 3 Effect.png",
          framesMax: 10,
          framesHold: 4,
          offset: { x: 30, y: 10 },
          scale: 0.6,
          pos_offset: {
            "1": { x: 100, y: -20 },
            "-1": { x: -100, y: -20 }
          },
        }
      }
    }, 
  },
};

export let player_data = { swordsman, warior , hitman};
