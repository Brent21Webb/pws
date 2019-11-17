// BASIC FUNCTIONS
function geti(s) { // getElementById shortcut
	return document.getElementById(s);
}
function timeDiff(t1, t2) {
	return (t2.getTime() - t1.getTime()) / 1000;
}

// Make the canvas element
var canvas = new Canvas(930, 930, "#A2C969", geti("map"));

// Make the segments and add them to the canvas
var seg1 = new Segment(new Vector(1, 1), new Vector(1, 6), 50, [1, [2]], canvas);
// var seg2 = new Segment(new Vector(15, 6), new Vector(15, 1), 50, [], canvas);
var seg3 = new Segment(new Vector(3, 6), new Vector(10, 6), 50, [3, [3]], canvas);
var seg4 = new Segment(new Vector(10, 8), new Vector(10, 11), 50, [], canvas)
// var seg4 = new Segment(new Vector(6, 8), new Vector(3, 8), 50, [], canvas);


// TODO: make a segment with multiple exit points
// TODO: make all of this more efficient => Gets slow really quick


canvas.initSegmentSpawning();

// console.log(seg1.ID);
console.log(canvas.segments);
// canvas.addSegment(seg1);