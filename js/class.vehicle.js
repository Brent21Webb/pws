class Vehicle {
	constructor(canvas, segment) {
		this.canvas = canvas;
		this.segment = segment;
		this.x = this.segment.begin.x * 30 + (this.segment.dx ? 0 : 15);
		this.y = this.segment.begin.y * 30 + (this.segment.dy ? 0 : 15);
		this.end = undefined;
		this.sprite = undefined;
		this.SPRITES = [];
		this.ID = Vehicle.ID++;

		this.isCloseToCrossing = false;

		this.nav = 0;

		this.__init();
	}

	__init() {
		// Load sprite images ==> All colours, all directions
		this.DIRECTIONS = ["down", "right", "top", "left"];
		this.COLOURS = ["pink", "green", "orange", "blue"];

		var end = Math.floor(Math.random() * this.canvas.endpoints.length);
		// end = 1;
		this.end = this.canvas.endpoints[end];
		this.colour = this.COLOURS[end];

		if(this.segment.spawner) {
			this.route = ROUTES[this.segment.ID][end];
		}

		for(var i in this.DIRECTIONS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/cars/" + this.colour + "/" + this.DIRECTIONS[i] + ".png";
			this.SPRITES[i] = TEMP_IMG;
		}

		let xCorr = (this.segment.dir === 4 ? -60 : 0);
		let yCorr = (this.segment.dir === 3 ? -60 : 0);
		this.x += xCorr; this.y += yCorr;
	}


	isPastPoint(x, y) {
		return (this.x >= x * 30 && this.segment.dir === 2) || (this.y >= y * 30 && this.segment.dir === 1) || (this.x <= x * 30 && this.segment.dir === 4) || (this.y <= y * 30 && this.segment.dir === 3);
	}


	applyTrafficRules() {
		let giveway = false;
		let prio = true;
		let tsc = this.segment.connected[3];

		if(tsc === 0 || tsc === 2) {
			prio = false;
		} // if

		if(tsc === 1) {
			giveway = false;
		}
		else if(tsc === 2) {
			giveway = true;
		}

		else { // else (if no traffic sign is present)
			let dirToFind = (this.segment.dir + 1 <= 4 ? this.segment.dir + 1 : 1);

			// Find the next segment this vehicle's gonna enter
			let nextInRoute = this.route[this.nav + 1] || this.route[this.nav];
			let nextSegment = this.canvas.segments[this.segment.connected[1][nextInRoute] - 1];

			// Check if one of the next segments entries has the direction that gets priority
			let giveWayTo = [];
			let nsoc = nextSegment.outsideConnections;

			// TODO: IF OPPOSITE DIRECTION, WHO GETS PRIORITY
			for(let i in nsoc) {
				if(((nsoc[i].dir === dirToFind || nsoc[i].dir === this.segment.dir + 2) && nsoc[i].connected[3] !== 0) || (!prio && this.segment.dir !== nsoc[i].dir)) {
					giveWayTo.push(nsoc[i]);
				}
			} // for

			// Check if there is a car on the road to give way to
			for(var i = 0; i < giveWayTo.length; i++) {
				let vs = this.canvas.vehicles;
				for(let j in vs) {
					var v = vs[j];
					if(v.segment.ID === giveWayTo[i].ID && v.isCloseToCrossing) {
						giveway = true;
						break;
					}
				} // for j in vehicles
			} // for i in giveWayTo
		} // else

		if(giveway) {
			this.x -= (this.segment.dx ? this.segment.speed / 25 : 0) * (this.segment.dir === 2 ? 1 : -1);
			this.y -= (this.segment.dy ? this.segment.speed / 25 : 0) * (this.segment.dir === 1 ? 1 : -1);
		}
	} // applyTrafficRules()


	update() {
		let ex = this.segment.end.x;
		let ey = this.segment.end.y + ((this.segment.dir === 3 && this.segment.connected[0] === 6) ? -2 : 0);
		let corr = (this.segment.dir >= 3 ? -1 : 1);

		// Calculate the next x position using the segment's direction and speed
		this.x += (this.segment.dx ? this.segment.speed / 25 : 0) * (this.segment.dir === 2 ? 1 : -1);
		this.y += (this.segment.dy ? this.segment.speed / 25 : 0) * (this.segment.dir === 1 ? 1 : -1);

		// If the car is past the segment
		if(this.isPastPoint(ex, ey)) {
			if(this.segment.endpoint) {
				this.destroySelf();
				return;
			}

			var olddir = this.segment.dir;

			var connectedToThis = this.segment.connected[1];
			var nextInRoute = this.route[this.nav++];
			this.segment = this.canvas.segments[connectedToThis[nextInRoute] - 1];

			// Calculate dx/dy for positioning the vehicle after the segment change
			var olddircorr = (olddir == this.segment.dir ? 0 : 1);
			let dx = 15 * (this.segment.dir % 2 === 0 ? 0 : 1) * olddircorr;
			let dy = 15 * (this.segment.dir % 2 === 1 ? 0 : 1) * olddircorr;

			// Forced is used for the negative x/y drawing values
			let forcedDX = 20 * (this.segment.dir === 4 ? -1 : 0) * olddircorr;
			let forcedDY = 30 * (this.segment.dir === 3 ? -1 : 0) * olddircorr;

			// Adjust vehicle up/down/right/left to drive in the center of the road, based on the calculations made before the segment changed
			this.x += dx + forcedDX;
			this.y += dy + forcedDY;
		} // if isPastPoint()

		else if((this.segment.connected[0] === 0 || this.segment.connected[0] === 6) && this.isPastPoint(ex - 3 * corr, ey - 3 * corr) && !this.isPastPoint(ex - 2 * corr, ey - 2 * corr)) {
			this.isCloseToCrossing = true;
			this.applyTrafficRules();
		}
		else if(this.isPastPoint(ex - 2 * corr, ey - 2 * corr) && !this.isPastPoint(ex, ey)) {
			this.isCloseToCrossing = true;
			this.isOnCrossing = true;
		}
		else if(this.isPastPoint(ex - 4 * corr, ey - 4 * corr)) {
			this.isCloseToCrossing = true;
		}
		else {
			this.isCloseToCrossing = false;
			this.isOnCrossing = false;
		}

		// Check for traffic jams
		this.hasToStop = false;
		let vs = [];
		let cvs = this.canvas.vehicles;
		let maxX = this.x; let maxY = this.y;
		let minX = this.x; let minY = this.y;
		for(let i in cvs) {
			if(cvs[i].segment.ID === this.segment.ID && cvs[i].ID !== this.ID) {
				maxX = Math.max(maxX, cvs[i].x); minX = Math.min(minX, cvs[i].x);
				maxY = Math.max(maxY, cvs[i].y); minY = Math.min(minX, cvs[i].y);
				vs.push(cvs[i]);
			}
		}

		for(let i in vs) {
			if(this.y !== maxY && this.segment.dir === 1 && this.y + 70 >= vs[i].y && this.y < vs[i].y) {
				this.hasToStop = true;
			} else if(this.x !== maxX && this.segment.dir === 2 && this.x + 70 >= vs[i].x && this.x < vs[i].x) {
				this.hasToStop = true;
			} else if(this.y !== minY && this.segment.dir === 3 && this.y - 70 <= vs[i].y && this.y > vs[i].y) {
				this.hasToStop = true;
			} else if(this.x !== minX && this.segment.dir === 4 && this.x - 70 <= vs[i].x && this.x > vs[i].x) {
				this.hasToStop = true;
			}
		} // for i
		if(((this.x === maxX || this.x === minX) && this.segment.dir % 2) || ((this.y === maxY || this.y === minY) && !(this.segment.dir % 2))) {
			if(this.isPastPoint(ex - 2 * corr, ey - 2 * corr)) {
				let nextInRoute = this.route[this.nav];
				let otherRoute = 1 - this.route[this.nav];
				let nextSegment = this.canvas.segments[this.segment.connected[1][nextInRoute] - 1];
				let otherSegment = this.canvas.segments[this.segment.connected[1][otherRoute] - 1];

				if(!nextSegment) {
					return;
				}

				let nsvs = []; // nextsegment vehicles
				let osvs = []; // othersegment vehicles
				let cvs = this.canvas.vehicles;
				for(let i in cvs) {
					if(cvs[i].segment.ID === nextSegment.ID) {
						nsvs.push(cvs[i]);
					}
					else if(otherSegment && cvs[i].segment.ID === otherSegment.ID) {
						// console.log("Found other segment vehicle ");
						osvs.push(cvs[i]);
					}
				}

				if(this.ID === 3 + (0 * 3)) {
					var t = (osvs[0] ? osvs[0] : undefined);
					if(otherSegment) console.log(otherSegment.ID);
				}

				for(let i in nsvs) {
					let xppcorr = (nsvs[i].segment.dir === 4 ? -2 : 0);
					let yppcorr = (nsvs[i].segment.dir === 1 ? 0 : -2);
					if(nsvs[i].segment.dir === this.segment.dir) { // if on same direction and next vehicle is close enough to me
						if((this.segment.dir === 1 && this.y + 70 >= nsvs[i].y) || (this.segment.dir === 2 && this.x + 70 >= nsvs[i].x) || (this.segment.dir === 3 && this.y - 70 <= nsvs[i].y) || (this.segment.dir === 4 && this.x - 70 <= nsvs[i].x)) {
							this.hasToStop = true;
							break;
						}
					}

					else if(!nsvs[i].isPastPoint(nsvs[i].segment.begin.x + xppcorr, nsvs[i].segment.begin.y + yppcorr) && !(nsvs[i].segment.dir === this.segment.dir)) { // if on different direction and vehicle not past
						this.hasToStop = true;
						break;
					}
				} // for i

				for(var i = 0; i < osvs.length; i++) {
					let xppcorr = (osvs[i].segment.dir === 4 ? -2 : 0);
					let yppcorr = (osvs[i].segment.dir === 1 ? 0 : -2);
					if(osvs[i].isPastPoint(osvs[i].segment.begin.x + xppcorr, osvs[i].segment.begin.y + yppcorr)) {
						this.hasToStop = true;
						break;
					}
				}
			} // if isPastPoint
		} // if first/last vehicle

		if(this.hasToStop) {
			this.x -= (this.segment.dx ? this.segment.speed / 25 : 0) * (this.segment.dir === 2 ? 1 : -1);
			this.y -= (this.segment.dy ? this.segment.speed / 25 : 0) * (this.segment.dir === 1 ? 1 : -1);
		}
	} // update()

	draw(ctx) {
		// Set sprite based on segment direction
		this.sprite = this.SPRITES[this.segment.dir - 1];
		var w, h;
		switch(this.segment.dir) {
			case 1: // If goes up or down
			case 3:
				w = 30; h = 60;
				break;
			case 2: // If goes right or left
			case 4:
				w = 60;	h = 30;
				break;
			default:
				console.error("Unknown direction. ");
		}
		ctx.drawImage(this.sprite, this.x, this.y, w, h);
	} // draw()

	destroySelf() {
		this.canvas.PASSED_VEHICLES++;
		// Find the vehicle array
		var v = this.canvas.vehicles;
		for(var i in v) { // For every vehicle
			if(this.ID === v[i].ID) { // If its ID matches this vehicle's ID...
				v.splice(i, 1); // ...remove it from the array
			}
		}
	} // destroySelf();
} // class Vehicle

Vehicle.ID = 1;







