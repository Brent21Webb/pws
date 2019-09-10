// BASIC FUNCTIONS
function geti(s) { // getElementById shortcut
	return document.getElementById(s);
}

// Make the canvas element
var canvas = new Canvas(920, 920, "#A2C969", geti("map"));

// Make the segments and add them to the canvas
var seg1 = new Segment(new Vector(1, 1), new Vector(1, 6), 50, true, [], canvas);

console.log(seg1.ID);
// canvas.addSegment(seg1);
