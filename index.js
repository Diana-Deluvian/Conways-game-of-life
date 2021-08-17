//  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//  Any live cell with two or three live neighbours lives on to the next generation.
//  Any live cell with more than three live neighbours dies, as if by overpopulation.
//  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function generateCells(){
    let containers = document.getElementById('container');
    for (let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++) {
            const newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.setAttribute("id", i*10 + j + '');
            newCell. onclick = function(event) {
                newCell.classList.add("alive");
                }
            container.appendChild(newCell);
        }
    }
    
}

function advanceGeneration(){
    let cells = document.getElementsByClassName("alive");
    for(let i = 0; i < cells.length; i++){
        let cell = cells[i];
        let cellSurroundings = surroundings(allCells, Math.floor(cell.id/10), cell.id%10);
        checkFirstRule(cell, cellSurroundings);
    }
    killCells();
    liveCells();
}

function getCell(matrix, y, x) {
    let NO_VALUE = false;
    let value;
    try {
        value = true ? document.getElementById(y*10 + x + '').classList.contains('alive') : NO_VALUE;
    } catch(e) {
        console.log(e);
        value = NO_VALUE;
    }
  
    return value;
  }
  
  function surroundings(matrix, y, x) {
    // Directions are clockwise
    return {
      up:        getCell(matrix, y-1, x),
      upRight:   getCell(matrix, y-1, x+1),
      right:     getCell(matrix, y,   x+1),
      downRight: getCell(matrix, y+1, x+1),
      down:      getCell(matrix, y+1, x),
      downLeft:  getCell(matrix, y+1, x-1),
      left:      getCell(matrix, y,   x-1),
      upLeft:    getCell(matrix, y-1, x-1)
    }
  }

function checkFirstRule(cell, surroundings){
    let totalAlive = 0;
    for (const neighbour in surroundings) {
        console.log(surroundings[neighbour]);
        if(surroundings[neighbour]) totalAlive++;
    }
    console.log(cell.id, totalAlive);
    if(totalAlive < 2) toDie.push(cell.id);
}

window.onload = function() {
    generateCells();
    window.allCells = document.getElementsByClassName("cell");
    window.toDie = [];
    window.toLive = [];
  };

function killCells() {
    toDie.forEach(id => {
        document.getElementById(id).classList.remove("alive");
        document.getElementById(id).classList.add("dead");
    })
}

function liveCells() {
    toLive.forEach(id => {
        document.getElementById(id).classList.remove("dead");
        document.getElementById(id).classList.add("alive");
    })
}

  
