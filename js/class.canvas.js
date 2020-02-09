class Canvas {
	constructor(width, height, bg, elem) {
		this.width = width;
		this.height = height;
		this.bg = bg;
		this.canvas = elem;

		this.segments = [];
		this.spawners = [];
		this.endpoints = [];

		this.vehicles = [];
		this.PASSED_VEHICLES = 0;

		this.lastSpawn = undefined;

		this.__init();
	} // constructor

	__init() {
		// Set dimensions and prevent blurry lines
		this.ctx = this.canvas.getContext("2d");
		this.ctx.width = this.canvas.width = this.width;
		this.ctx.height = this.canvas.height = this.height;
		this.ctx.translate(0.5, 0.5);

		this.lastSpawn = new Date();
		this.update();
	} // __init()


	initSegmentSpawning() {
		const ids = [];
		const connectedFrom = [];
		// Initialise arrays for checking the overlap
		for(var i in this.segments) {
			var s = this.segments[i];
			ids.push(s.ID);
			if(s.connected[0] >= 0) {
				for(var i in s.connected[1]) {
					connectedFrom.push(s.connected[1][i]);
				}
			}
		}
		// Get overlap
		const leftwith = [];
		for(var i in ids) {
			// If ID has no connection from somewhere
			if(!connectedFrom.includes(ids[i])) {
				leftwith.push(this.segments[ids[i] - 1]);
			}
		}

		// initialise the leftwiths as spawners
		for(var i in leftwith) {
			leftwith[i].initAsSpawner();
		}
		this.spawners = leftwith;
	}


	initEndpoints() {
		var ends = [];
		for(var i in this.segments) {
			var s = this.segments[i];
			if(s.connected[1][0] == null || s.connected[1][0] == undefined) {
				s.endpoint = true;
				ends.push(s);
			}
		}
		this.endpoints = ends;
	}


	initSegmentConnections() {
		for(var i in this.segments) {
			var s = this.segments[i];
			for(var j in this.segments) {
				if(!(i === j)) { // If it's not the same segment...
					var s2 = this.segments[j];
					if(s2.connected[1].includes(s.ID)) {
						s.outsideConnections.push(s2);
					}
				} // if not same segment
			} // for j
		} // for i
	}


	update() {
		// html.innerHTML = "";
		// for(var i in this.vehicles) {
		// 	var vl = this.vehicles[i];
		// 	html.innerHTML += "Vehicle ID: " + vl.ID;
		// 	html.innerHTML += "<br>Segment ID: " + vl.segment.ID;
		// 	html.innerHTML += "<br>Segment begin: " + vl.segment.begin.x + "x" + vl.segment.begin.y;
		// 	html.innerHTML += "<br>Segment end: " + vl.segment.end.x + "x" + vl.segment.end.y + " (" + (vl.segment.end.x * 30) + "x" + (vl.segment.end.y * 30) + ")";
		// 	html.innerHTML += "<br>Vehicle position: " + vl.x + "x" + vl.y;
		// 	html.innerHTML += "<br>Is close: " + vl.isCloseToCrossing;
		// 	html.innerHTML += "<br>Is on: " + vl.isOnCrossing;
		// 	html.innerHTML += "<br><br><br>";
		// }

		// Check if spawning is necessary
		var d = new Date();
		if(timeDiff(this.lastSpawn, d) > 1) {
			this.lastSpawn = d;

			for(var i in this.spawners) {
				this.spawners[i].spawn(Math.floor(Math.random() * 10));
			}
		}

		// Update all vehicles
		for(var i in this.vehicles) {
			this.vehicles[i].update();
		}

		// Draw everything
		this.draw(true);

		// Request new update
		if(!pause) { requestAnimationFrame(() => this.update()); }
	}


	drawBackground(grid) {
		this.ctx.beginPath();
		this.ctx.translate(-0.5, -0.5); // Reset translation to prevent white lines on the edges
		this.ctx.fillStyle = this.bg;
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.translate(0.5, 0.5); // Back to the normal translation
		if(grid) {
			this.ctx.strokeStyle = "#555";
			this.ctx.lineWidth = 1;
			// Draw horizontal
			for(var i = 30; i < this.width; i += 30) {
				this.ctx.moveTo(0, i);
				this.ctx.lineTo(this.width, i);
				this.ctx.stroke();
			}
			// Draw vertical
			for(var i = 30; i < this.height; i += 30) {
				this.ctx.moveTo(i, 0);
				this.ctx.lineTo(i, this.height);
				this.ctx.stroke();
			}
		} // grid
			this.ctx.closePath();
	} // drawBackground

	drawRoads() {
		this.ctx.beginPath();
		for(var i in this.segments) {
			this.segments[i].draw(this.ctx);
		}
		this.ctx.closePath();
	}

	drawVehicles() {
		this.ctx.beginPath();
		for(var i in this.vehicles) {
			this.vehicles[i].draw(this.ctx);
		}
		this.ctx.closePath();
	}

	draw(grid) {
		this.drawBackground(grid);
		this.drawRoads();
		this.drawVehicles();
	}

	addSegment(s) {
		this.segments.push(s);
	}
} // class Canvas



// Canvas.clicked = function(x, y, canvas) {
// 	var newX = Math.round(x / 40);   newX = (newX >= 20 ? 19 : newX) || 1;
// 	var newY = Math.round(y / 40);   newY = (newY >= 20 ? 19 : newY) || 1;
// } // clicked








