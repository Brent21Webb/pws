class Segment {
	//         Vector Vector Int Int(1-4)  IntArray (ID) Canvas
 	constructor(begin, end, speed, dir, connected, canvas) {
		this.begin = begin;
		this.end = end;
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
	}

	draw(ctx) {
		// Calculate the difference in x and y values
		var dx = this.end.x - this.begin.x;
		var dy = this.end.y - this.begin.y;
		var t = Math.max(dx, dy);

		for(var i = 0; i < t; i++) {
			// Calculate for every piece of the length of the road where it should be located
			var x = (dx === 0 ? this.begin.x * 30 : i * 30 + (this.begin.x) * 30);
			var y = (dy === 0 ? this.begin.y * 30 : i * 30 + (this.begin.y) * 30);
			// Calculate width and height (horz/vert)
			var w = 60 * (this.dir % 2 === 1 ? 1 : 0.5);
			var h = 60 * (this.dir % 2 === 0 ? 1 : 0.5);
			ctx.drawImage(this.sprite, x, y, w, h);
		}
	}
} // class Segment

Segment.ID = 1;







