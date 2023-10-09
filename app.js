function onclickcell(event) {
  console.log(event)
}

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    let board = document.querySelector("#board")

    var cont = 0;

    for (let i = 0; i < 20; i++) {
      let newRow = this.createElement("div")
      newRow.classList.add("row")
      
      board.appendChild(newRow)

      for (let j = 0; j < 9; j++) {
        let newCell = this.createElement("span")
        newCell.classList.add("cell")
        newCell.onclick = onclickcell;

        if (i == 0) newCell.classList.add("top")
        if (i == 19) newCell.classList.add("bottom")
        if (j == 0) newCell.classList.add("left")
        if (j == 8) newCell.classList.add("right")

        if (cont < 35) {
          newCell.innerText = Math.floor((Math.random() * 9) + 1)
          cont ++
        }

        newRow.appendChild(newCell)
      }
    }
  }
}