// BASIC FUNCTIONS
function geti(s) { // getElementById shortcut
	return document.getElementById(s);
}
function timeDiff(t1, t2) {
	return (t2.getTime() - t1.getTime()) / 1000;
}


var html = geti("data");


// Make the canvas element
var canvas = new Canvas(930, 930, "#A2C969", geti("map"));

var s1 = new Segment(new Vector(2, 2), new Vector(2, 16), 50, [1, [2]], true, canvas); // Top left to mid left
var s2 = new Segment(new Vector(4, 16), new Vector(8, 16), 50, [0, [13, 3]], true, canvas); // Mid left to more left
var s3 = new Segment(new Vector(10, 16), new Vector(16, 16), 50, [0, [9]], true, canvas); // More left to center

var s4 = new Segment(new Vector(6, 2), new Vector(16, 2), 50, [3, [5]], true, canvas); // Top left to top mid
var s5 = new Segment(new Vector(16, 4), new Vector(16, 6), 50, [0, [6, 7]], true, canvas); // Top mid to two down
var s6 = new Segment(new Vector(16, 8), new Vector(16, 16), 50, [6, [9]], true, canvas); // Top mid to center

var s7 = new Segment(new Vector(18, 6), new Vector(22, 6), 50, [3, [8]], true, canvas); // Top mid to top right
var s8 = new Segment(new Vector(22, 8), new Vector(22, 12), 50, [5, []], true, canvas); // Top right to mid right

var s9 = new Segment(new Vector(18, 16), new Vector(22, 16), 50, [5, []], true, canvas); // Center to mid right

var s10 = new Segment(new Vector(26, 20), new Vector(26, 28), 50, [4, [11]], true, canvas); // Mid right to bottom right
var s11 = new Segment(new Vector(26, 28), new Vector(16, 28), 50, [1, [12]], true, canvas); // Bottom right to bottom mid
var s12 = new Segment(new Vector(16, 28), new Vector(16, 18), 50, [6, [9]], true, canvas); // Bottom mid to mid

var s13 = new Segment(new Vector(8, 16), new Vector(8, 6), 50, [2, [14]], true, canvas); // More left to top left
var s14 = new Segment(new Vector(10, 6), new Vector(16, 6), 50, [6, [6]], true, canvas); // Top left to top mid

var s15 = new Segment(new Vector(8, 28), new Vector(8, 18), 50, [6, [13, 3]], true, canvas); // Bottom left to mid left

// TODO: vehicles disappear for 1 frame when new vehicle spawns
// TODO: make a segment with multiple exit points => Done, now get them to move in different directions

canvas.initSegmentSpawning();
canvas.initEndpoints();

// console.log(seg1.ID);
console.info("Segments");
console.log(canvas.segments);
console.log("");

console.info("Spawners");
console.log(canvas.spawners);
console.log("");

console.info("Endings");
console.log(canvas.endpoints);
console.log("");


// canvas.addSegment(seg1);




