class Ship {
  constructor() {
    this.rotation = 90;
    this.x = 0;
    this.y = 0;
  }

  turnLeft(deg) {
    this.turnRight(360 - (deg % 360));
  }

  turnRight(deg) {
    this.rotation = (this.rotation + deg) % 360;
  }

  forward(n) {
    switch (this.rotation) {
      case 0: {
        this.y += n;
        break;
      }
      case 90: {
        this.x += n;
        break;
      }
      case 180: {
        this.y -= n;
        break;
      }
      case 270: {
        this.x -= n;
        break;
      }
      default: {
        break;
      }
    }
  }

  back(n) {
    this.forward(n * -1);
  }

  left(n) {
    switch (this.rotation) {
      case 0: {
        this.x -= n;
        break;
      }
      case 90: {
        this.y += n;
        break;
      }
      case 180: {
        this.x += n;
        break;
      }
      case 270: {
        this.y -= n;
        break;
      }
      default: {
        break;
      }
    }
  }

  right(n) {
    this.left(n * -1);
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

  manhattan() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

module.exports = { Ship };
