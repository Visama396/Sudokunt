let unfinishedCells = []
let selectedCells = []
var id = 1;

function checkLines() {
  let board = document.querySelector("#board")

  for (let row of Array.from(board.children)) {
    console.log(row)
  }
}

function checkSelectedCells() {
  let isValid = false;
  let posIsValid = false;

  // getBoundingClientRect have an x and y values
  let pos1 = selectedCells[0].getBoundingClientRect()
  let pos2 = selectedCells[1].getBoundingClientRect()

  const HEIGHT = pos1.height;
  
  // Check if the cells are in valid positions to be pair
  // First if they are in the same row
  if (pos1.y == pos2.y && pos1.x != pos2.x) {
    console.log("same row")
    if ((pos1.x - pos2.x) % HEIGHT == 0 || (pos2.x - pos1.x) % HEIGHT == 0) {
      // Check if there are not unfinished cells between selectedCell0 and selectedCell1
      let direction = (pos1.x > pos2.x)? -1 : 1;
      let arr = Array.from(selectedCells[0].parentElement.children)
      let finishedCellFound = true;
      for (let i = arr.indexOf(selectedCells[0]); finishedCellFound && i != arr.indexOf(selectedCells[1]); i+=direction) {
        if (arr[i] == selectedCells[0] || arr[i] == selectedCells[1]) continue;
        finishedCellFound = arr[i].classList.contains("finished")
      }

      posIsValid = finishedCellFound;
    }
  }
  // Now check if they belong to the same column
  else if (pos1.x == pos2.x && pos1.y != pos2.y) {
    console.log("same column")
    if ((pos1.y - pos2.y) % HEIGHT == 0 || (pos2.y - pos1.y) % HEIGHT == 0) {
      let direction = (pos1.y > pos2.y)? -1 : 1;
      let arrrows = Array.from(selectedCells[0].parentElement.parentElement.children)
      let arr0 = Array.from(selectedCells[0].parentElement.children)
      let columnIndex = arr0.indexOf(selectedCells[0])
      let finishedCellFound = true;
      for (let i = arrrows.indexOf(selectedCells[0].parentElement); finishedCellFound && i != arrrows.indexOf(selectedCells[1].parentElement); i+=direction)
      {
        if (arrrows[i] == selectedCells[0].parentElement || arrrows[i] == selectedCells[1].parentElement) continue;
        finishedCellFound = arrrows[i].children[columnIndex].classList.contains("finished")
      }
      posIsValid = finishedCellFound
    }
  }
  // Now check if they are diagonal  
  else if (Math.abs(pos1.y - pos2.y) % HEIGHT == 0 && Math.abs(pos1.x - pos2.x) % HEIGHT == 0) 
  {
    console.log("diagonal")
    let direction; // 0, 1, 2, 3
    posIsValid = true
  }
  // Now check if it is the last of one row and the first of the next row
  else if ((selectedCells[1].dataset.id % 9 == 0 && selectedCells[0].dataset.id % 10 == 0) || (selectedCells[0].dataset.id % 9 == 0 && selectedCells[1].dataset.id % 10 == 0)) {
    console.log("last in row, first in row")
    posIsValid = true
  }

  // First check if the user hasn't selected the same cell twice
  if (selectedCells[0] == selectedCells[1]) {
    posIsValid = false 
  }

  // Now check if the pair is valid
  if (posIsValid && (parseInt(selectedCells[0].innerText) + parseInt(selectedCells[1].innerText) == 10 || selectedCells[0].innerText == selectedCells[1].innerText)) {
    isValid = true;
  }

  // Remove the selected class always
  selectedCells.forEach(cell => {
    cell.classList.remove("selected")

    if (isValid) {
      cell.classList.add("finished")
      cell.onclick = {};

      // Remove the two selected cells from the unfinishedCells array
      let index = unfinishedCells.indexOf(cell)
      unfinishedCells.splice(index, 1)

      // Lastly check lines to see if any has been completed
      // checkLines()
    }
  });

  // And remove the cells from the selectedCells array
  selectedCells = []

  
}

function onclickcell(event) {
  event.target.classList.add("selected")

  selectedCells.push(event.target)

  if (selectedCells.length == 2) {
    checkSelectedCells()
  }
}

function onclickadd(event) {
  let board = document.querySelector("#board")
  let emtpyFound = false;

  unfinishedCells.forEach(cell => {
    for(let i = 0; i < 20 && !emtpyFound; i++) {
      for(let j = 0; j < 9 && !emtpyFound; j++) {
        if (board.children[i].children[j].innerHTML == "") {
          board.children[i].children[j].innerHTML = cell.innerHTML
          unfinishedCells.push(board.children[i].children[j])
          emtpyFound = !emtpyFound;
        }
      }
    }

    emtpyFound = false;
  })
}

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    let board = document.querySelector("#board")

    for (let i = 0; i < 20; i++) {
      let newRow = this.createElement("div")
      newRow.classList.add("row")
      
      board.appendChild(newRow)

      for (let j = 0; j < 9; j++) {
        let newCell = this.createElement("span")
        newCell.classList.add("cell")
        newCell.onclick = onclickcell

        if (i == 0) newCell.classList.add("top")
        if (i == 19) newCell.classList.add("bottom")
        if (j == 0) newCell.classList.add("left")
        if (j == 8) newCell.classList.add("right")

        if (unfinishedCells.length < 35) {
          newCell.innerText = Math.floor((Math.random() * 9) + 1)
          unfinishedCells.push(newCell)
        }

        newCell.dataset.id = id++;

        newRow.appendChild(newCell)
      }
    }

    let addButton = document.querySelector("#add")

    addButton.onclick = onclickadd
  }
}