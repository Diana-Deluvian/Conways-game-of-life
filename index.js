//  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//  Any live cell with two or three live neighbours lives on to the next generation.
//  Any live cell with more than three live neighbours dies, as if by overpopulation.
//  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

var size = 25;

function generateCells(){
    let container = document.getElementById('cellContainer');
    for (let i = 0; i < size; i++){
        for(let j = 0; j < size; j++) {
            const newCell = document.createElement("div");
            newCell.classList.add("cell", "dead");
            newCell.setAttribute("id", i*size + j + '');
            newCell.onclick = function(event) {
                newCell.classList.toggle("alive");
                }
            container.appendChild(newCell);
        }
    }
}

function advanceGeneration(){
    for(let i = 0; i < allCells.length; i++){
        let cell = allCells[i];
        let cellSurroundings = surroundings(allCells, Math.floor(cell.id/size), cell.id%size);
        getNearbyAlive(cell, cellSurroundings);
    }
    killCells();
    liveCells();
}

function autoAdvance(button) {
    update = !update;
    button.classList.toggle("toggle");
    if(update) interval = setInterval(advanceGeneration, 100);
    else clearInterval(interval);
}

function clearBoard() {
    Array.from(document.getElementsByClassName("alive")).map(elem => {
        elem.classList.remove("alive");
});
}


function getCell(matrix, y, x) {
    let NO_VALUE = false;
    let value;
    try {
        value = true ? document.getElementById(y*size + x + '').classList.contains('alive') : NO_VALUE;
    } catch(e) {
        value = NO_VALUE;
    }
  
    return value;
  }
  
  function surroundings(matrix, y, x) {
    // Directions are clockwise
    return {
      up:        getCell(matrix, y-1, x),
      upRight:   x === size-1 ? false : getCell(matrix, y-1, x+1),
      right:     x === size-1 ? false : getCell(matrix, y,   x+1),
      downRight: x === size-1 ? false : getCell(matrix, y+1, x+1),
      down:      getCell(matrix, y+1, x),
      downLeft:  x === 0 ? false : getCell(matrix, y+1, x-1),
      left:      x === 0 ? false : getCell(matrix, y,   x-1),
      upLeft:    x === 0 ? false : getCell(matrix, y-1, x-1)
    }
  }

function getNearbyAlive(cell, surroundings) {
    let totalAlive = 0;
    for (const neighbour in surroundings) {
        if(surroundings[neighbour]) totalAlive++;
    }
    if(totalAlive < 2) toDie.push(cell.id); //first rule
    if(totalAlive === 3) toLive.push(cell.id);//third rule
    if(totalAlive > 3) toDie.push(cell.id); //fourth rule
}


window.onload = function() {
    window.interval;
    window.update = false;
    generateCells();
    window.allCells = document.getElementsByClassName("cell");
    window.toDie = [];
    window.toLive = [];
  };

function killCells() {
    toDie.forEach(id => {
        document.getElementById(id).classList.remove("alive");
    });
    toDie = [];
}

function liveCells() {
    toLive.forEach(id => {
        document.getElementById(id).classList.add("alive");
    });
    toLive = [];
}

function toggleBorder(button) {
    Array.from(allCells).forEach(elem => elem.classList.toggle("border"));
    button.classList.toggle("toggle");
}

  
