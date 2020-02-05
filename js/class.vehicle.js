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
		if(this.segment.connected[2]) { // If a traffic sign is present

		} // if

		else { // else (if no traffic sign is present)
			let dirToFind = (this.segment.dir + 1 <= 4 ? this.segment.dir + 1 : 1);

			// Find the next segment this vehicle's gonna enter
			let nextInRoute = this.route[this.nav + 1] || this.route[this.nav];
			let nextSegment = this.canvas.segments[this.segment.connected[1][nextInRoute] - 1];

			// Check if one of the next segments entries has the direction that gets priority
			let giveWayTo;
			let nsoc = nextSegment.outsideConnections;
			for(let i in nsoc) {
				if(nsoc[i].dir === dirToFind) {
					giveWayTo = nsoc[i];
				}
			} // for

			// Check if there is a car on the road to give way to
			if(giveWayTo) {
				var vs = this.canvas.vehicles;
				for(let i in vs) {
					var v = vs[i];
					if(v.segment.ID === giveWayTo.ID && v.isCloseToCrossing) {
						giveway = true;
						break;
					}
				} // for i in vehicles
			} // if giveWayTo
		} // else

		if(giveway) {
			this.x -= (this.segment.dx ? this.segment.speed / 25 : 0) * (this.segment.dir === 2 ? 1 : -1);
			this.y -= (this.segment.dy ? this.segment.speed / 25 : 0) * (this.segment.dir === 1 ? 1 : -1);
		}
	} // applyTrafficRules()


	update() {
		let ex = this.segment.end.x;
		let ey = this.segment.end.y + ((this.segment.dir === 3 && this.segment.connected[0] === 6) ? -2 : 0);
		let pastpointCorr = (this.segment.dir >= 3 ? -1 : 1);

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
		}

		else if((this.segment.connected[0] === 0 || this.segment.connected[0] === 6) && this.isPastPoint(ex - 3 * pastpointCorr, ey - 3 * pastpointCorr) && !this.isPastPoint(ex - 2 * pastpointCorr, ey - 2 * pastpointCorr)) {
			this.isCloseToCrossing = true;
			this.applyTrafficRules();
		}
		else if(this.isPastPoint(ex - 2 * pastpointCorr, ey - 2 * pastpointCorr) && !this.isPastPoint(ex, ey)) {
			this.isCloseToCrossing = true;
		}
		else {
			this.isCloseToCrossing = false;
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
		ctx.fillStyle = "#FFF";
		ctx.fillRect(this.x, this.y, 5, 5);
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







