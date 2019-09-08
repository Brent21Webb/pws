class Segment {
	//         Vector Vector Int IntArray (ID) Int
 	constructor(begin, end, speed, connected, ID) {

	} // constructor
} // class Segment

Segment.ID = 1;

// Highlight the node where the segment will be starting
Segment.highlightGridNode = function(x, y, c) {
	c.ctx.fillStyle = c.ctx.strokeStyle = "#6666DD";
	c.ctx.globalAlpha = 0.5;
	c.ctx.fillRect(x - 5, y - 5, 10, 10);
	c.ctx.globalAlpha = 1.0;
}

Segment.creating = { x: undefined, y: undefined };

Segment.create = function(x, y, gridX, gridY, c) {
	if(Segment.creating.x) {
		Segment.finish(gridX * 40, gridY * 40, c);
	}
	else {
		Segment.highlightGridNode(gridX * 40, gridY * 40, c);
		Segment.creating = { x: gridX * 40, y: gridY * 40 };
	}
}

Segment.finish = function(x, y, c) {
	var s = new Segment(new Vector(Segment.creating.x, Segment.creating.y), new Vector(x, y), 50, [], Segment.ID++);
	c.appendSegment(s);
	Segment.creating = { x: undefined, y: undefined };
}





