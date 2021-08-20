//  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//  Any live cell with two or three live neighbours lives on to the next generation.
//  Any live cell with more than three live neighbours dies, as if by overpopulation.
//  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function generateCells(){
    let containers = document.getElementById('container');
    for (let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++) {
            const newCell = document.createElement("div");
            newCell.classList.add("cell", "dead");
            newCell.setAttribute("id", i*10 + j + '');
            newCell. onclick = function(event) {
                newCell.classList.add("alive");
                newCell.classList.remove("dead");
                }
            container.appendChild(newCell);
        }
    }
    
}

function advanceGeneration(){
    for(let i = 0; i < allCells.length; i++){
        let cell = allCells[i];
        let cellSurroundings = surroundings(allCells, Math.floor(cell.id/10), cell.id%10);
        getNearbyAlive(cell, cellSurroundings);
    }
    killCells();
    liveCells();
}

function autoAdvance() {
    //to implement
}

function getCell(matrix, y, x) {
    let NO_VALUE = false;
    let value;
    try {
        value = true ? document.getElementById(y*10 + x + '').classList.contains('alive') : NO_VALUE;
    } catch(e) {
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
    window.interval = false;
    generateCells();
    window.allCells = document.getElementsByClassName("cell");
    window.toDie = [];
    window.toLive = [];
  };

function killCells() {
    console.log(toDie);
    toDie.forEach(id => {
        document.getElementById(id).classList.remove("alive");
        document.getElementById(id).classList.add("dead");
    });
    toDie = [];
}

function liveCells() {
    console.log(toLive);
    toLive.forEach(id => {
        document.getElementById(id).classList.remove("dead");
        document.getElementById(id).classList.add("alive");
    });
    toLive = [];
}

  
