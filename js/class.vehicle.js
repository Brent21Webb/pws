class Vehicle {
	constructor(canvas, segment, end) {
		this.canvas = canvas;
		this.segment = segment;
		this.x = this.segment.begin.x * 30 + (this.segment.dx ? 0 : 15);
		this.y = this.segment.begin.y * 30 + (this.segment.dy ? 0 : 15);
		this.end = end;
		this.sprite = undefined;

		this.__init();
	}

	__init() {
		// Load sprite images
		// TODO: load all four directions
		this.DIRECTIONS = ["down", "right", "top", "left"];
		this.COLOURS = ["blue", "green", "orange", "pink"];
		this.colour = this.COLOURS[this.end];

		for(var i in this.DIRECTIONS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/cars/" + this.colour + "/" + this.DIRECTIONS[i] + ".png";
			Vehicle.SPRITES[i] = TEMP_IMG;
		}
	}

	update() {
		this.x += (this.segment.dx ? this.segment.speed / 25 : 0);
		this.y += (this.segment.dy ? this.segment.speed / 25 : 0);

		// TODO: if car exceeds the segment length (including the connector, so length + 1 segment part (= 60px))
		if((this.x >= this.segment.end.x * 30 && this.segment.dx !== 0) || (this.y >= this.segment.end.y * 30 && this.segment.dy !== 0)) {
			this.segment = this.canvas.segments[this.segment.connected[1][0] - 1]; // Equal to next segment --> Either the only one or the one which leads to the shortest route to the end
			console.log(this.segment);
			this.x += (this.segment.dx ? 0 : 15);
			this.y += (this.segment.dy ? 0 : 15);
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

	destroyVehicle() {

	}
}
Vehicle.SPRITES = [];







