class Vehicle {
	constructor(segment, end) {
		this.segment = segment;
		this.x = this.segment.begin.x * 30;
		this.y = this.segment.begin.y * 30;
		this.end = end;
		this.sprite = undefined;

		this.__init();
	}

	__init() {
		// Load sprite images
		// TODO: load all four directions
		this.DIRECTIONS = ["top", "right", "down", "left"];
		this.COLOURS = ["blue", "green", "orange", "pink"];
		this.colour = this.COLOURS[this.end];

		for(var i in this.DIRECTIONS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/cars/" + this.colour + "/" + this.DIRECTIONS[i] + ".png";
			Vehicle.SPRITES[i] = TEMP_IMG;
		}

		// Set sprite based on segment direction
		this.sprite = Vehicle.SPRITES[this.segment.dir];
	}

	update() {
		this.x += this.segment.dx * (50 / this.segment.speed);
		this.y += this.segment.dy * (50 / this.segment.speed);

		// TODO: if car exceeds the segment length (including the connector, so length + 1 segment part (= 60px))
	} // update()

	draw(ctx) {
		ctx.drawImage(this.sprite, this.x, this.y, 30, 30);

		// TODO: add height/length according to what direction the car is moving
	} // draw()
}
Vehicle.SPRITES = [];