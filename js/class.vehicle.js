class Vehicle {
	constructor(segment, end) {
		this.segment = segment;
		this.end = end;
		this.sprite = undefined;

		this.__init();
	}

	__init() {
		// SPRITE LOADING
		// this.sprite = new Image();
		// this.sprite.src = (this.dir % 2 === 0 ? "sprites/roads/roadHalfHorizontalNew.png" : "sprites/roads/roadHalfNew.png");

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
}
Vehicle.SPRITES = [];