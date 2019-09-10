class Segment {
	//         Vector Vector Int    bool     IntArray (ID)
 	constructor(begin, end, speed, isNorthSouth, connected) {
		this.begin = begin;
		this.end = end;
		this.speed = speed;
		this.ns = isNorthSouth;
		this.connected = connected;

		this.sprite = new Image();
		this.sprite.src = "sprites/road.png";
		this.__init();
	} // constructor

	__init() {
		this.ID = Segment.ID++;
	}

	draw(ctx) {
		ctx.drawImage(this.sprite, 40, 40);
	}
} // class Segment

Segment.ID = 1;







