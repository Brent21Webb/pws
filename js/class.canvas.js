class Canvas {
	constructor(width, height, bg, elem) {
		this.width = width;
		this.height = height;
		this.bg = bg;
		this.canvas = elem;

		this.__init();
	} // constructor

	__init() {
		// Set dimensions and prevent blurry lines
		this.ctx = this.canvas.getContext("2d");
		this.ctx.width = this.canvas.width = this.width;
		this.ctx.height = this.canvas.height = this.height;
		this.ctx.translate(0.5, 0.5);
		// Draw the background with grid
		this.drawBackground(true);

		// Set eventlistener for canvas click ==> Draw/select road
		this.canvas.addEventListener("click", function(e) {
			Canvas.clicked(e.clientX, e.clientY);
		});
	} // __init()

	drawBackground(grid) {
		this.ctx.translate(-0.5, -0.5); // Reset translation to prevent white lines on the edges
		this.ctx.fillStyle = this.bg;
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.translate(0.5, 0.5); // Back to the normal translation 
		if(grid) {
			this.ctx.strokeStyle = "#444";
			this.ctx.lineWidth = 1;
			// Draw horizontal
			for(var i = 40; i < this.width; i += 40) {
				this.ctx.moveTo(0, i);
				this.ctx.lineTo(this.width, i);
				this.ctx.stroke();
			}
			// Draw vertical
			for(var i = 40; i < this.height; i += 40) {
				this.ctx.lineStyle = "#444";
				this.ctx.moveTo(i, 0);
				this.ctx.lineTo(i, this.height);
				this.ctx.stroke();
			}
		} // grid
	} // drawBackground

	drawRoads() {

	}

	draw() {
		drawBackground();
		drawRoads();
	}
} // class Canvas



Canvas.clicked = function(x, y) {
	console.log("Canvas was clicked at " + x + "x" + y + ". ");
} // clicked








