export function getCoordinate(player, platform) {
  return {
    x1: player.position.x,
    x2: player.position.x + player.width,
    y1: player.position.y,
    y2: player.position.y + player.height,

    p_x1: platform.position.x,
    p_x2: platform.position.x + platform.width,
    p_y1: platform.position.y,
    p_y2: platform.position.y + platform.height,
  };
}
