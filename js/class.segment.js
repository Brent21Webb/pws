class Segment {
	//         Vector Vector Int    bool     IntArray (ID) Canvas
 	constructor(begin, end, speed, isNorthSouth, connected, canvas) {
		this.begin = begin;
		this.end = end;
		this.speed = speed;
		this.ns = isNorthSouth;
		this.connected = connected;
		this.canvas = canvas;

		this.sprite = new Image();
		this.sprite.src = "sprites/roads/roadHalf.png";
		this.__init();
	} // constructor

	__init() {
		this.ID = Segment.ID++;
		this.canvas.addSegment(this);
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, 30, 30, 60, 60);
	}
} // class Segment

Segment.ID = 1;







