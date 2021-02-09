var cols = 10;
var rows = 10;
var grid = new Array(cols);
var width = 500;
var height = 500;

var openSet = [];
var closeSet = [];

var start;
var end;
var w, h;

function Spot(x, y) {
  this.x = x;
  this.y = y;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.show = function (colr) {
    fill(colr);
    stroke(0);
    rect(this.x*w, this.y*h, w-1, h-1);
  }
}


function setup() {
  // put setup code here
  createCanvas(500, 500);
  console.log('A* Coding Implementation.');
  //  Making a 2D Array.
  w = width / cols;
  h = height / rows;
  for(var i = 0; i < rows; ++i) {
    grid[i] = new Array(rows);
  }
  for(var i = 0; i < cols; ++i) {
    for(var j = 0; j < rows; ++j) {
      grid[i][j] = new Spot(i, j);
    }
  }
  start = grid[0][0];
  end = grid[cols-1][rows-1];



  openSet.push(start);



}

function draw() {
  // put drawing code here
  if(openSet.length > 0) {
    // We can keep going.
    var win = 0;
    for (var i = 1; i < openSet.length; i++) {
      if(openSet[i].f < openSet[win].f) {
        win = i;
      }
    }

  } else {


  }

  background(0);
  ellipse(200, 200, 50, 50);

  for(var i = 0; i < cols; ++i) {
    for(var j = 0; j < rows; ++j) {
      grid[i][j].show(color(255))
    }
  }

  for(var j = 0; j < openSet.length; ++j) {
    openSet[j].show(color(0, 255, 0))
  }

  for(var j = 0; j < closeSet.length; ++j) {
    closeSet[j].show(color(255, 0, 0))
  }

}



          // [X-1][Y-1]   [X-1] [Y]   [X-1][Y+1]
          // [X][Y-1]     [X] [Y]     [X][Y+1]
          // [X+1][Y-1]   [X+1] [Y]   [X+1][Y+1]
