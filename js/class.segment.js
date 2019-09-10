class Segment {
	//         Vector Vector Int IntArray (ID)
 	constructor(begin, end, speed, connected) {
		this.begin = begin;
		this.end = end;
		this.speed = speed;
		this.connected = connected;
		this.__init();
	} // constructor

	__init() {
		this.ID = Segment.ID++;
	}

	draw() {

	}
} // class Segment

Segment.ID = 1;







