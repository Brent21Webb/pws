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
		this.lastLightSwitch = undefined;
		this.runtime = undefined;

		this.__init();
	} // constructor

	__init() {
		// Set dimensions and prevent blurry lines
		this.ctx = this.canvas.getContext("2d");
		this.ctx.width = this.canvas.width = this.width;
		this.ctx.height = this.canvas.height = this.height;
		this.ctx.translate(0.5, 0.5);

		this.lastSpawn = this.lastLightSwitch = this.runtime = new Date();
		this.update();
	} // __init()


	initSegmentSpawning() {
		const ids = [];
		const connectedFrom = [];
		// Initialise arrays for checking the overlap, and initialising their traffic signs
		for(var i in this.segments) {
			var s = this.segments[i];
			s.__lateInit();
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
		// Check if spawning is necessary
		var d = new Date();
		if(timeDiff(this.lastSpawn, d) > 1) {
			this.lastSpawn = d;

			for(var i in this.spawners) {
				this.spawners[i].spawn(Math.floor(Math.random() * 10));
			}
		}
		// Check if traffic light switch is necessary
		if(timeDiff(this.lastLightSwitch, d) > 5) {
			this.lastLightSwitch = d;
			var crossings = {};
			// Find crossings
			for(var i in this.segments) {
				if(this.segments[i].connected[2]) {
					var c = crossings[this.segments[i].connected[2]];
					if(c) { c.push(this.segments[i]); }
					else { crossings[this.segments[i].connected[2]] = [this.segments[i]]; }
				}
			}

			// For each crossing...
			for(let i in crossings) {
				// If it's a traffic light crossing, continue
				var c = crossings[i];
				if(!(c[0].connected[3] === 1 || c[0].connected[3] === 2)) {
					continue;
				}
				// Find which one has the green traffic light
				var g = undefined;
				for(let j in c) {
					if(c[j].connected[3] === 1) {
						g = parseInt(j);
						break;
					}
				}
				// Make the one after the green one green
				var nextG = ((g + 1) >= c.length ? 0 : (g + 1));
				for(let j in c) {
					c[j].connected[3] = 2;
					if(nextG == j) { c[j].connected[3] = 1; }
				}
			} // for i in crossing
		} // if lightswitch

		// Check if a minute has passed
		if(timeDiff(this.runtime, d) > 60) {
			html.innerHTML = "RESULT: " + this.PASSED_VEHICLES;
			pause = true;
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









