class Waypoint {
  constructor(ship) {
    this.ship = ship;
    this.x = 10;
    this.y = 1;
  }

  north(n) {
    this.y += n;
  }

  south(n) {
    this.y -= n;
  }

  east(n) {
    this.x += n;
  }

  west(n) {
    this.x -= n;
  }

  turnLeft(deg) {
    this.turnRight(360 - (deg % 360));
  }

  turnRight(deg) {
    const { x, y } = this;
    const rad = deg * (Math.PI / 180);
    const cos = Math.abs(Math.cos(rad)) > 0.5 ? Math.cos(rad) : 0;
    const sin = Math.abs(Math.sin(rad)) > 0.5 ? Math.sin(rad) : 0;

    this.x = cos * x + sin * y;
    this.y = sin * x * -1 + cos * y;
  }
}

module.exports = { Waypoint };
