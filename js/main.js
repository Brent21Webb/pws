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
// var seg1 = new Segment(new Vector(10, 1), new Vector(10, 6), 50, [1, [2]], true, canvas);
// var seg2 = new Segment(new Vector(12, 6), new Vector(15, 6), 50, [3, [3]], true, canvas);
// var seg3 = new Segment(new Vector(15, 8), new Vector(15, 11), 50, [0, [4, 6]], true, canvas);
// var seg4 = new Segment(new Vector(15, 11), new Vector(5, 11), 50, [1, [5]], true, canvas);
// var seg5 = new Segment(new Vector(5, 11), new Vector(5, 3), 50, [], true, canvas);
// var seg6 = new Segment(new Vector(15, 13), new Vector(15, 16), 50, [], true, canvas);


var s1 = new Segment(new Vector(28, 2), new Vector(2, 2), 50, [2, [3]], true, canvas);
var s2 = new Segment(new Vector(8, 4), new Vector(28, 4), 50, [5, []], true, canvas);
var s3 = new Segment(new Vector(2, 4), new Vector(2, 28), 50, [5, []], true, canvas);
var s4 = new Segment(new Vector(6, 28), new Vector(6, 4), 50, [2, [2]], true, canvas);
// var s5 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);
// var s6 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);
// var s7 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);
// var s8 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);
// var s9 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);
// var s10 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);
// var s11 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);
// var s12 = new Segment(new Vector(), new Vector(), speed, [contype, conn], true, canvas);


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




