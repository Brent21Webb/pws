class Vehicle {
	constructor(canvas, segment, end) {
		this.canvas = canvas;
		this.segment = segment;
		this.nextSegment = undefined;
		this.x = this.segment.begin.x * 30 + (this.segment.dx ? 0 : 15);
		this.y = this.segment.begin.y * 30 + (this.segment.dy ? 0 : 15);
		this.end = end;
		this.sprite = undefined;
		this.ID = Vehicle.ID++;

		this.__init();
	}

	__init() {
		// Load sprite images ==> All colours, all directions
		this.DIRECTIONS = ["down", "right", "top", "left"];
		this.COLOURS = ["pink", "green", "orange", "blue"];
		this.colour = this.COLOURS[this.end];

		for(var i in this.DIRECTIONS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/cars/" + this.colour + "/" + this.DIRECTIONS[i] + ".png";
			Vehicle.SPRITES[i] = TEMP_IMG;
		}

		this.nextSegment = this.canvas.segments[this.segment.connected[1][0] - 1];
		console.log(this.canvas.endpoints);
	}

	update() {
		// Calculate the next x position using the segment's direction and speed
		this.x += (this.segment.dx ? this.segment.speed / 25 : 0) * (this.segment.dir === 2 ? 1 : -1);
		this.y += (this.segment.dy ? this.segment.speed / 25 : 0) * (this.segment.dir === 1 ? 1 : -1);

		// If the car is past the segment
		if((this.x >= this.segment.end.x * 30 && this.segment.dir === 2) || (this.y >= this.segment.end.y * 30 && this.segment.dir === 1) || (this.x <= this.segment.end.x * 30 && this.segment.dir === 4) || (this.y <= this.segment.end.y * 30 && this.segment.dir === 3)) {

			if(this.segment.endpoint) {
				this.destroySelf();
			}

			var olddir = this.segment.dir
			this.segment = this.nextSegment; // Make its new segment the next segment...

			// ...and find the new nextSegment
			var thisConnected = this.segment.connected[1];
			if(thisConnected && this.canvas.segments[thisConnected[0] - 1]) {
				var n = thisConnected.length - 1; n = 0;
				this.nextSegment = this.canvas.segments[thisConnected[n] - 1];
			}

			// Calculate dx/dy for positioning the vehicle after the segment change
			let dx = 15 * (this.segment.dir % 2 === 0 ? 0 : 1) * (olddir == this.segment.dir ? 0 : 1);
			let dy = 15 * (this.segment.dir % 2 === 1 ? 0 : 1) * (olddir == this.segment.dir ? 0 : 1);

			// Forced is used for the negative x/y drawing values
			let forcedDX = 20 * (this.segment.dir === 4 ? -1 : 0);
			let forcedDY = 30 * (this.segment.dir === 3 ? -1 : 0);

			// Adjust vehicle up/down/right/left to drive in the center of the road, based on the calculations made before the segment changed
			this.x += dx + forcedDX;
			this.y += dy + forcedDY;
		}
	} // update()

	draw(ctx) {
		// Set sprite based on segment direction
		this.sprite = Vehicle.SPRITES[this.segment.dir - 1];
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
		// Find the vehicle array
		var v = this.canvas.vehicles;
		for(var i in v) { // For every vehicle
			if(this.ID === v[i].ID) { // If its ID matches this vehicle's ID...
				v.splice(i, 1); // ...remove it from the array
			}
		}
	} // destroySelf();
} // class Vehicle
Vehicle.SPRITES = [];
Vehicle.ID = 1;







