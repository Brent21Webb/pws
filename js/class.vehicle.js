class Vehicle {
	constructor(segment, end) {
		this.segment = segment;
		this.x = this.segment.x * 30;
		this.y = this.segment.y * 30;
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

		this.draw();
		console.log("I'm updating :))");
	} // update()

	draw() {

	} // draw()
}
Vehicle.SPRITES = [];