// BASIC FUNCTIONS
function geti(s) { // getElementById shortcut
	return document.getElementById(s);
}

// Make the canvas element
var canvas = new Canvas(930, 930, "#A2C969", geti("map"));

// Make the segments and add them to the canvas
var seg1 = new Segment(new Vector(1, 1), new Vector(1, 6), 50, [[2, 1]], canvas);
// var seg2 = new Segment(new Vector(15, 6), new Vector(15, 1), 50, [], canvas);
var seg3 = new Segment(new Vector(3, 6), new Vector(10, 6), 50, [[], []], canvas);
// var seg4 = new Segment(new Vector(6, 8), new Vector(3, 8), 50, [], canvas);

// console.log(seg1.ID);
console.log(canvas.segments);
// canvas.addSegment(seg1);