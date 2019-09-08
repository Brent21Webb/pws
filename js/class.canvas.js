class Canvas {
	constructor(width, height, bg, elem) {
		this.width = width;
		this.height = height;
		this.bg = bg;
		this.canvas = elem;

		this.__init();
	} // constructor

	__init() {
		// Set dimensions
		this.ctx = this.canvas.getContext("2d");
		this.ctx.width = this.canvas.width = this.width;
		this.ctx.height = this.canvas.height = this.height;
		// Colour the background
		this.drawBackground();

		// Set eventlistener for canvas click ==> Draw/select road
		this.canvas.addEventListener("click", function(e) {
			this.clicked(e.clientX, e.clientY);
		});
	} // __init()

	clicked(x, y) {
		console.log("Canvas was clicked at " + x + "x" + y + ". ");
	} // clicked



	drawBackground() {
		this.ctx.fillStyle = this.bg;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	drawRoads() {

	}

	draw() {
		drawBackground();
		drawRoads();
	}
} // class Canvas