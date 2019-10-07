class Segment {
	//         Vector Vector Int IntArray (ID) Canvas
 	constructor(begin, end, speed, connected, canvas) {
		this.begin = begin;
		this.end = end;
		this.dx = this.end.x - this.begin.x;
		this.dy = this.end.y - this.begin.y;
		this.speed = speed;
		this.connected = connected;
		this.canvas = canvas;

		this.dir; // 1> Right goes down -- 2> Right goes right -- 3> Right goes up -- 4> Right goes left
		this.__init();
	} // constructor

	__init() {
		this.ID = Segment.ID++;
		this.canvas.addSegment(this);

		// Catch possible errors
		try {
			if(this.dx !== 0 && this.dy !== 0) throw "there can only be one axis which changes value. ";
		} catch(err) {
			console.error("Error: " + err);
		}

		if(this.dy > 0) { this.dir = 1; }
		else if(this.dx > 0) { this.dir = 2; }
		else if(this.dy < 0) { this.dir = 3; }
		else if(this.dx < 0) { this.dir = 4; }

		// If negative dx/dy, swap begin and endpoint
		if(this.dx < 0 || this.dy < 0) {
			this.dx *= -1; this.dy *= -1;
		}

		// Load road sprite
		this.sprite = new Image();
		this.sprite.src = (this.dir % 2 === 0 ? "sprites/roads/roadHalfHorizontal.png" : "sprites/roads/roadHalf.png");

		// Load connection images
		this.CONNECTION_PATHS = ["intersection", "turn12", "turn23", "turn34", "turn41", "deadEnd"];
		for(var i in this.CONNECTION_PATHS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/roads/" + this.CONNECTION_PATHS[i] + ".png";
			Segment.CONNECTIONS[i] = TEMP_IMG;
		}
	} // __init()

	draw(ctx) {
		console.log(this.dx + " - " + this.dy + " (" + this.dir + ")");

		const corr = (this.dir >= 3 ? -1 : 1);
		var max = (this.dx || this.dy) * corr;

		for(var i = 0; (corr > 0 ? (i < max) : (i > max)); i += corr) {
			var x = (this.dx === 0 ? this.begin.x * 30 : (i + this.begin.x) * 30 - (corr < 0 ? 30 : 0));
			var y = (this.dy === 0 ? this.begin.y * 30 : (i + this.begin.y) * 30 - (corr < 0 ? 30 : 0));

			// Calculate width and height (horz/vert)
			var w = (this.dir % 2 === 1 ? 60 : 30);
			var h = (this.dir % 2 === 0 ? 60 : 30);


			ctx.drawImage(this.sprite, x, y, w, h);


			// White square on end vector
			ctx.fillStyle = "#FFF";
			var tx = this.end.x * 30 + (25 * (this.dir % 2)) - (10 * (1 - this.dir % 2));
			var ty = this.end.y * 30 + (25 * (1 - this.dir % 2)) - (10 * (this.dir % 2));
			ctx.fillRect(tx, ty, 10, 10);
		} // for i

		// Draw the road connections
		for(var i in this.connected) {
			ctx.drawImage(Segment.CONNECTIONS[this.connected[i][1]], this.end.x * 30, this.end.y * 30, 60, 60);
		} // for i in connected



		// var t = Math.max(this.dx, this.dy);
		// for(var i = 0; i < t; i++) {
		// 	// Calculate for every piece of the length of the road where it should be located
		// 	var x = (this.dx === 0 ? this.begin.x * 30 : (i + this.begin.x) * 30);
		// 	var y = (this.dy === 0 ? this.begin.y * 30 : (i + this.begin.y) * 30);
		// 	// Calculate width and height (horz/vert)
		// 	var w = (this.dir % 2 === 1 ? 60 : 30);
		// 	var h = (this.dir % 2 === 0 ? 60 : 30);
		// 	ctx.drawImage(this.sprite, x, y, w, h);
		//
		// 	// White square on end vector
		// 	ctx.fillStyle = "#FFF";
		// 	var tx = this.end.x * 30 + (25 * (this.dir % 2)) - (10 * (1 - this.dir % 2));
		// 	var ty = this.end.y * 30 + (25 * (1 - this.dir % 2)) - (10 * (this.dir % 2));
		// 	ctx.fillRect(tx, ty, 10, 10);
		// }
		//
		// // Draw the road connections
		// for(var i in this.connected) {
		// 	ctx.drawImage(Segment.CONNECTIONS[this.connected[i][1]], this.end.x * 30, this.end.y * 30, 60, 60);
		// } // for i in connected


	} // draw(ctx)
} // class Segment

Segment.ID = 1;
Segment.CONNECTIONS = [];







