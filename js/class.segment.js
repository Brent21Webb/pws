class Segment {
	//         Vector Vector Int Int(1-4)  IntArray (ID) Canvas
 	constructor(begin, end, speed, dir, connected, canvas) {
		this.begin = begin;
		this.end = end;
		this.dx = this.end.x - this.begin.x;
		this.dy = this.end.y - this.begin.y;
		this.speed = speed;
		this.dir = dir; // 1> Right goes up -- 2> Right goes left -- 3> Right goes down -- 4> Right goes right
		this.connected = connected;
		this.canvas = canvas;

		this.sprite = new Image();
		this.sprite.src = (this.dir % 2 === 0 ? "sprites/roads/roadHalfHorizontal.png" : "sprites/roads/roadHalf.png");
		this.__init();
	} // constructor

	__init() {
		this.ID = Segment.ID++;
		this.canvas.addSegment(this);

		// Load connection images
		this.CONNECTION_PATHS = ["intersection", "turn12", "turn23", "turn34", "turn41", "deadEnd"];
		for(var i in this.CONNECTION_PATHS) {
			var TEMP_IMG = new Image();
			TEMP_IMG.src = "sprites/roads/" + this.CONNECTION_PATHS[i] + ".png";
			Segment.CONNECTIONS[i] = TEMP_IMG;
		}
	} // __init()

	draw(ctx) {
		// Calculate the difference in x and y values
		var t = Math.max(this.dx, this.dy);

		for(var i = 0; i < t; i++) {
			// Calculate for every piece of the length of the road where it should be located
			var x = (this.dx === 0 ? this.begin.x * 30 : (i + this.begin.x) * 30);
			var y = (this.dy === 0 ? this.begin.y * 30 : (i + this.begin.y) * 30);
			// Calculate width and height (horz/vert)
			var w = (this.dir % 2 === 1 ? 60 : 30);
			var h = (this.dir % 2 === 0 ? 60 : 30);
			ctx.drawImage(this.sprite, x, y, w, h);

			// White square on end vector
			ctx.fillStyle = "#FFF";
			var tx = this.end.x * 30 + (25 * (this.dir % 2)) - (10 * (1 - this.dir % 2));
			var ty = this.end.y * 30 + (25 * (1 - this.dir % 2)) - (10 * (this.dir % 2));
			ctx.fillRect(tx, ty, 10, 10);
		}

		// Draw the road connections
		for(var i in this.connected) {
			ctx.drawImage(Segment.CONNECTIONS[this.connected[i][1]], this.end.x * 30, this.end.y * 30, 60, 60);
		} // for i in connected
	} // draw(ctx)
} // class Segment

Segment.ID = 1;
Segment.CONNECTIONS = [];







