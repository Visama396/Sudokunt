let unfinishedCells = []
let selectedCells = []
var id = 0;

function checkSelectedCells() {
  let isValid = false;
  // First check if the cells are in valid positions to be pair


  // Now check if the pair is valid
  if (parseInt(selectedCells[0].innerText) + parseInt(selectedCells[1].innerText) == 10 || selectedCells[0].innerText == selectedCells[1].innerText) {
    isValid = true;
  }

  // Remove the selected class always
  selectedCells.forEach(cell => {
    cell.classList.remove("selected")

    console.log(unfinishedCells)

    if (isValid) {
      cell.classList.add("finished")

      // Remove the two selected cells from the unfinishedCells array
      console.log(unfinishedCells)
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
  console.log(event)
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

        if (id < 35) {
          newCell.innerText = Math.floor((Math.random() * 9) + 1)
          newCell.dataset.id = id++;
          unfinishedCells.push(newCell)
        }

        newRow.appendChild(newCell)
      }
    }

    let addButton = document.querySelector("#add")

    addButton.onclick = onclickadd
  }
}