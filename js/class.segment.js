class Segment {
	//         Vector Vector Int array (ID, conn), bool, Canvas
 	constructor(begin, end, speed, connected, visible, canvas) {
		this.begin = begin;
		this.end = end;
		this.dx = this.end.x - this.begin.x;
		this.dy = this.end.y - this.begin.y;
		this.speed = speed;
		this.connected = connected;
		this.outsideConnections = [];
		this.isVisible = visible;
		this.canvas = canvas;

		this.spawner = undefined;
		this.routes = [];
		this.endpoint = false;

		this.dir; // 1> Goes down -- 2> Goes right -- 3> Goes up -- 4> Goes left
		this.__init();
	} // constructor

	__init() {
		this.ID = Segment.ID++;
		this.canvas.addSegment(this);

		// Catch possible errors
		try {
			if(this.dx !== 0 && this.dy !== 0) throw "there can only be one axis which changes value. ";
		} catch(err) {
			console.error("Error: " + err);
		}

		if(this.dy > 0) { this.dir = 1; }
		else if(this.dx > 0) { this.dir = 2; }
		else if(this.dy < 0) { this.dir = 3; }
		else if(this.dx < 0) { this.dir = 4; }

		// If negative dx/dy, swap begin and endpoint
		if(this.dx < 0 || this.dy < 0) {
			this.dx *= -1; this.dy *= -1;
		}

		// SPRITE LOADING
		this.sprite = new Image();
		this.sprite.src = (this.dir % 2 === 0 ? "sprites/roads/roadHalfHorizontalNew.png" : "sprites/roads/roadHalfNew.png");

		// Load connection images
		this.CONNECTION_PATHS = ["intersection", "turn12", "turn23", "turn34", "turn41", "deadEnd"];
		for(var i in this.CONNECTION_PATHS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/roads/" + this.CONNECTION_PATHS[i] + "New.png";
			Segment.CONNECTIONS[i] = TEMP_IMG;
		}
	} // __init()


	__lateInit() {
		// Set priority signs
		var cr = this.connected[2];
		if(cr) {
			var ss = this.canvas.segments;
			var others = [];
			for(let i in ss) {
				if(ss[i].connected[2] === cr && ss[i].ID !== this.ID) {
					others.push(ss[i]);
				}
			}
		}
		if(!others) { return; }

		var isFirst = true;
		for(let i = 0; i < others.length; i++) {
			if(others[i].connected[3] || others[i].connected[3] === 0) { isFirst = false; }
		}

		if(isFirst) {
			this.connected[3] = Math.floor(Math.random() * 3);
		}
		else {
			if(others[0].connected[3] === 2 && others[1] && others[1].connected[3] === 2) {
				this.connected[3] = 1;
			}
			else if(others[0].connected[3] === 1 || (others[1] && others[1].connected[3] === 1)) {
				this.connected[3] = 2;
			}
			else if(others[0].connected[3] === 0 || (others[1] && others[1].connected[3] === 0)) {
				this.connected[3] = undefined;
			}
		}
	}


	initAsSpawner() {
		this.spawner = true;
	}


	spawn(x) {
		// if(x && !this.canvas.vehicles[0] && (this.ID === 1 || this.ID === 1)) {
		var cvs = this.canvas.vehicles;
		var vs = [];
		var canSpawn = true;
		for(let i in cvs) {
			if(cvs[i].segment.ID === this.ID) {
				vs.push(cvs[i]);
			}
		}
		for(let i in vs) {
			if(!vs[i].isPastPoint(this.begin.x + 2, this.begin.y + 2)) {
				canSpawn = false;
				break;
			}
		}
		if(canSpawn && x > 3) {
			var v = new Vehicle(this.canvas, this);
			this.canvas.vehicles.push(v);
		}
	}


	draw(ctx) {
		if(!this.isVisible) { return false; }
		// Calculate the correction and maximum
		const corr = (this.dir >= 3 ? -1 : 1);
		var max = (this.dx || this.dy) * corr;

		// For every piece of road
		for(var i = 0; (corr > 0 ? (i < max) : (i > max)); i += corr) {
			// Calculate x and y position (either fixed position, or i + the beginning - correction)
			var x = (this.dx === 0 ? this.begin.x * 30 : (i + this.begin.x) * 30 - (corr < 0 ? 30 : 0));
			var y = (this.dy === 0 ? this.begin.y * 30 : (i + this.begin.y) * 30 - (corr < 0 ? 30 : 0));

			// Calculate width and height (horz/vert)
			var w = (this.dir % 2 === 1 ? 60 : 30);
			var h = (this.dir % 2 === 0 ? 60 : 30);

			ctx.drawImage(this.sprite, x, y, w, h);
		} // for i

		// Draw the road connections
		if(this.connected[0] >= 0 && this.connected[0] !== 6) {
			ctx.drawImage(Segment.CONNECTIONS[this.connected[0]], this.end.x * 30, this.end.y * 30, 60, 60);
		} // if connected
	} // draw(ctx)
} // class Segment

Segment.ID = 1;
Segment.CONNECTIONS = [];







