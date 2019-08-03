class Vector2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x()  { return this._x; }
    set x(x) { this._x = x;    }

    get y()  { return this._y; }
    set y(y) { this._y = y;    }

    setAngle(angle) {
        const length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }

    getAngle() {
        return Math.atan2(this._y, this._x);
    }

    setLength(length) {
        const angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
    }
    
    getLength() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    addTo(v2) {
        this._x += v2.x;
        this._y += v2.y;
    }

    subtractFrom(v2) {
        this._x -= v2.x;
        this._y -= v2.y;
    }

    multiplyBy(scalar) {
        this._x *= scalar;
        this._y *= scalar;
    }

    divideBy(scalar) {
        this._x /= scalar;
        this._y /= scalar;
    }
}

class Particle {
    constructor(x, y, speed, direction, gravity) {
        this._x         = x;
        this._y         = y;
        this._speed     = speed;
        this._direction = direction;
        this._gravity   = gravity;
        this._position  = new Vector3(this._x, this._y);
        this._velocity  = new Vector3(0, 0);
        this._velocity  .setLength(speed);
        this._velocity  .setAngle(direction);
        this._gravity   = new Vector2(0, gravity || 0);
        this._mass      =  1;
        this._radius    =  0;
        this._bounce    = -1;
        this._friction  =  1;
    }

    get position()    { return this._position; }
    set position(pos) { this._position = pos;  }

    get velocity()    { return this._velocity; }
    set velocity(vel) { this._velocity = vel;  }

    get speed()       { return this._speed;    }
    set speed(val)    { this._speed = val;     }

    get mass()        { return this._mass;     }
    set mass(m)       { this._mass = m;        }

    accelerate(val)   {
        this.velocity.addTo(val);
    }

    update() {
        this._velocity.multiplyBy(this._friction);
        this._velocity.addTo(this._gravity);
        this._position.addTo(this._velocity);
    }

    angleTo(p2) {
        return Math.atan2(p2.position.y - this._position.y, p2.position.x - this._position.x);
    }

    distanceTo(p2) {
        let dx = p2.position.x - this._position.x, dy = p2.position.y - this._position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    gravitateTo(p2) {
        let   gravity  = new Vector2(0, 0);
        const distance = this.distanceTo(p2);
		gravity.setLength(p2.mass / (distance * distance));
		gravity.setAngle(this.angleTo(p2));
		this._velocity.addTo(gravity);
    }
}
