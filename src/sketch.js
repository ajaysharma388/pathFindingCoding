var cols = 75;
var rows = 75;
var grid = new Array(cols);
var width = 750;
var height = 750;

var openSet = [];
var closeSet = [];
var path = [];

var start;
var end;
var w, h;

function removeFromArray(arr, element) {
  for (var i = arr.length - 1; i >= 0; --i) {
    if(arr[i] == element) {
      arr.splice(i, 1);
    }
  }
}

function heiuristics(a, b) {
  var d = dist(a.i,a.j,b.i,b.j);
  return d;
}

function Spot(x, y) {
  this.x = x;
  this.y = y;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.isWall = false;
  if(random(1) < 0.15) {
    this.isWall = true;
  }
  this.previous = undefined;
  this.neighbours = [];
  this.show = function (colr) {
    fill(colr);
    if(this.isWall) {
      fill(0);
      noStroke();
      ellipse(this.x*w + w/2, this.y*h + h/2, w-1, h-1);
    }
  }
  this.addNeighbours = function (grid) {
    for(var i = this.x - 1; i <= this.x+1; ++i) {
      for(var j = this.y - 1; j <= this.y+1; ++j) {
        if (i == this.x && j == this.y) {
          continue;
        }
        if((j >= 0 && j < rows) && (i >= 0 && i < cols)) {
          this.neighbours.push(grid[i][j]);
        }
      }
    }
  }
}


function setup() {
  // put setup code here
  createCanvas(750, 750);
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

  for(var i = 0; i < cols; ++i) {
    for(var j = 0; j < rows; ++j) {
      grid[i][j].addNeighbours(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];
  start.isWall = false;
  end.isWall = false;


  openSet.push(start);
  console.log(grid);
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
    var current = openSet[win];
    if(current == end) {
      noLoop();
      console.log("DONE!");
    }
    removeFromArray(openSet, current);
    closeSet.push(current);
    var neighbours = current.neighbours;
    for (var i = 0; i < neighbours.length; ++i) {
      var nbr = neighbours[i];
      if(!closeSet.includes(nbr) && !nbr.isWall) {
        var tmpG = current.g + 1;
        var newPath = false;
        if(openSet.includes(nbr)) {
          if(nbr.g > tmpG) {
            nbr.g = tmpG;
            newPath = true;
          }
        } else {
          nbr.g = tmpG;
          openSet.push(nbr);
          newPath = true;
        }
        if(newPath) {
          nbr.h = heiuristics(nbr, end);
          nbr.f = nbr.g + nbr.h;
          nbr.previous = current;
        }
      }
    }
  } else {
    console.log("No Solution!");
    noLoop();
    return;
  }
  background(255);
  // Printing the cells of the grid.
  for(var i = 0; i < cols; ++i) {
    for(var j = 0; j < rows; ++j) {
      grid[i][j].show(color(255))
    }
  }

  // Printing the closeSet cells of the grid.
  for(var j = 0; j < closeSet.length; ++j) {
    closeSet[j].show(color(255, 0, 0))
  }

  // Printing the openSet cells of the grid.
  for(var j = 0; j < openSet.length; ++j) {
    openSet[j].show(color(0, 255, 0))
  }

  path = [];
  var tmp = current;
  while(tmp) {
    path.push(tmp);
    tmp = tmp.previous;
  }

  noFill();
  stroke(255, 0, 255);
  strokeWeight(w / 2);
  beginShape();
  for(var j = 0; j < path.length; ++j) {
    vertex(path[j].x * w + w / 2, path[j].y * h + h / 2);
  }
  endShape();

}
