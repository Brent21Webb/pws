class Canvas {
	constructor(width, height, bg, elem) {
		this.width = width;
		this.height = height;
		this.bg = bg;
		this.canvas = elem;

		this.segments = [];
		this.spawners = [];

		this.__init();
	} // constructor

	__init() {
		// Set dimensions and prevent blurry lines
		this.ctx = this.canvas.getContext("2d");
		this.ctx.width = this.canvas.width = this.width;
		this.ctx.height = this.canvas.height = this.height;
		this.ctx.translate(0.5, 0.5);

		this.update();
	} // __init()


	initSegmentSpawning() {
		const ids = [];
		const conn = [];
		// Initialise arrays for checking the overlap
		for(var i in this.segments) {
			ids.push(this.segments[i].ID);
			if(this.segments[i].connected[0]) {
				conn.push(this.segments[i].connected[1]);
			}
		}
		console.log("IDs: " + ids + "\nConnected: " + conn);
		// Get overlap
		const leftwith = [];
		for(var i in ids) {
			if(!conn.includes(ids[i])) {
				leftwith.push(ids[i]);
			}
		}
		// initialise the leftwiths as spawners
	}


	update() {
		this.draw(true);

		requestAnimationFrame(() => this.update());
	}


	drawBackground(grid) {
		this.ctx.translate(-0.5, -0.5); // Reset translation to prevent white lines on the edges
		this.ctx.fillStyle = this.bg;
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.translate(0.5, 0.5); // Back to the normal translation
		if(grid) {
			this.ctx.strokeStyle = "#555";
			this.ctx.lineWidth = 1;
			// Draw horizontal
			for(var i = 30; i < this.width; i += 30) {
				this.ctx.moveTo(0, i);
				this.ctx.lineTo(this.width, i);
				this.ctx.stroke();
			}
			// Draw vertical
			for(var i = 30; i < this.height; i += 30) {
				this.ctx.moveTo(i, 0);
				this.ctx.lineTo(i, this.height);
				this.ctx.stroke();
			}
		} // grid
	} // drawBackground

	drawRoads() {
		for(var i in this.segments) {
			this.segments[i].draw(this.ctx);
		}
	}

	draw(grid) {
		this.drawBackground(grid);
		this.drawRoads();
	}

	addSegment(s) {
		this.segments.push(s);
	}
} // class Canvas



// Canvas.clicked = function(x, y, canvas) {
// 	var newX = Math.round(x / 40);   newX = (newX >= 20 ? 19 : newX) || 1;
// 	var newY = Math.round(y / 40);   newY = (newY >= 20 ? 19 : newY) || 1;
// } // clicked








