class Segment {
	//         Vector Vector Int Int(1-4)  IntArray (ID) Canvas
 	constructor(begin, end, speed, dir, connected, canvas) {
		this.begin = begin;
		this.end = end;
		this.speed = speed;
		this.dir = dir;
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







