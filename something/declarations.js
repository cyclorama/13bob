vector = {
	_x: 1,
	_y: 0,

	create: function(x, y) {
		let obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	},

	setX: function(val) {
		this._x = val;
	},

	getX: function() {
		return this._x;
	},

	setY: function(val) {
		this._y = val;
	},

	getY: function() {
		return this._y;
	},

	setAngle: function(angle) {
		let length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	setLength: function(length) {
		let angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	add: function(v2) {
		return vector.create(this._x + v2.getX(), this._y + v2.getY());
	},

	subtract: function(v2) {
		return vector.create(this._x - v2.getX(), this._y - v2.getY());
	},

	multiply: function(val) {
		return vector.create(this._x * val, this._y * val);
	},

	divide: function(val) {
		return vector.create(this._x / val, this._y / val);
	},

	addTo: function(v2) {
		this._x += v2.getX();
		this._y += v2.getY();
	},

	subtractFrom: function(v2) {
		this._x -= v2.getX();
		this._y -= v2.getY();
	},

	multiplyBy: function(val) {
		this._x *= val;
		this._y *= val;
	},

	divideBy: function(val) {
		this._x /= val;
		this._y /= val;
	}
};

particle = {
	position: null,
	velocity: null,
	mass: 1,
	radius: 0,
	bounce: -1,
	friction: 1,

	create: function(x, y, speed, direction, grav) {
		let obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		obj.gravity = vector.create(0, grav || 0);
		return obj;
	},

	accelerate: function(accel) {
		this.velocity.addTo(accel);
	},

	update: function() {
		this.velocity.multiplyBy(this.friction);
		this.velocity.addTo(this.gravity);
		this.position.addTo(this.velocity);
	},

	angleTo: function(p2) {
		return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
	},

	distanceTo: function(p2) {
		let dx = p2.position.getX() - this.position.getX(), dy = p2.position.getY() - this.position.getY();
		return Math.sqrt(dx * dx + dy * dy);
	},

	gravitateTo: function(p2) {
		let grav = vector.create(0, 0), dist = this.distanceTo(p2);
		grav.setLength(p2.mass / (dist * dist));
		grav.setAngle(this.angleTo(p2));
		this.velocity.addTo(grav);
	}
};

particles = [], planets = [];

function loadLevel(lvl) {
    let f = new XMLHttpRequest();
    f.responseType = 'text';
    f.open('GET', `lvls/${lvl}.txt`, true);
    f.onreadystatechange = () => {
    	if (f.readyState == 4 && (f.status === 200 || f.status == 0)) {
            let lines = f.responseText.split('\n');
            for (let i = 0; i < lines.length; i++) {
            	switch(lines[i].split('=')[0]) {
                	case 'planet':
						let planetPoints = lines[i].split('=')[1];
						planets.push(planetPoints.split(','));
                	break;
                	case 'target':
                		let targetPoint = lines[i].split('=')[1];
                		// ...
                	break;
                }
            }
        }
    }
    f.send(null);
}