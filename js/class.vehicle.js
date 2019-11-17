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
		this.CARS = ["blue", "green", "orange", "pink"];
		for(var i in this.CARS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/cars/" + this.CARS[i] + "CarPolished.png";
			Vehicle.SPRITES[i] = TEMP_IMG;
		}

		// Set sprite based on end point
		this.sprite = Vehicle.SPRITES[this.end];
	}

	update() {
		this.x += this.segment.dx * (50 / this.segment.speed);
		this.y += this.segment.dy * (50 / this.segment.speed);
	} // update()

	draw(ctx) {

		ctx.drawImage(this.sprite, this.x, this.y, 30, 30);
	} // draw()
}
Vehicle.SPRITES = [];