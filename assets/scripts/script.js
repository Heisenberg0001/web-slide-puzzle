let puzzleImg = document.getElementsByClassName("slide-puzzle-imgs");
let puzzleGrid = document.getElementsByClassName("slide-puzzle-grid");
const puzzleArr = [];
const gridQuantity = puzzleGrid[0].offsetWidth / puzzleImg[0].offsetWidth;
let movesMade = 0;

document.getElementById("moves-made-number").innerHTML = movesMade.toString();

function generatePuzzleArr() {
    let counter = 0;

    for (let i = 0; i < gridQuantity; i++) {
        puzzleArr.push([])
        for (let j = 0; j < gridQuantity; j++) {
            puzzleArr[i].push(puzzleImg[counter]);
            counter++;
        }
    }
}
function navigatePuzzle() {
    for (let i = 0; i < gridQuantity ; i++) {
        for (let j = 0; j < gridQuantity; j++) {
            puzzleArr[i][j].style.top =  (j * 200) + "px";
            puzzleArr[i][j].style.left =  (i * 200)+ "px";
        }
    }

    shuffle();
    deletePuzzleBlock();
}
function shuffle(){
    let newPos;
    let tempTop, tempLeft;

    for (let i = gridQuantity - 1; i >= 0 ; i--) {
        for (let j = gridQuantity - 1; j > 0; j--) {
            newPos  = Math.floor(Math.random() * (j));
            tempTop = puzzleArr[i][j].style.top;
            tempLeft = puzzleArr[i][j].style.left;
            puzzleArr[i][j].style.top = puzzleArr[i][newPos].style.top;
            puzzleArr[i][j].style.left = puzzleArr[i][newPos].style.left;
            puzzleArr[i][newPos].style.top = tempTop;
            puzzleArr[i][newPos].style.left = tempLeft;

            [puzzleArr[i][j], puzzleArr[i][newPos]] = [puzzleArr[i][newPos], puzzleArr[i][j]];
        }
    }


}
function deletePuzzleBlock() { //white puzzle block, generated randomly
    let randX = Math.floor(Math.random() * (gridQuantity-1));
    let randY = Math.floor(Math.random() * (gridQuantity-1));
    let puzzleBlock = puzzleArr[randX][randY];

    puzzleArr[randX][randY].style.backgroundImage = "none";
    puzzleBlock.getElementsByTagName("img")[0].remove();
    puzzleBlock.style.backgroundColor = "white";

}
//swap block if one of the nearby block is white
function swap( X, Y ) {

    let tempTop  = puzzleArr[X][Y].style.top;
    let tempLeft = puzzleArr[X][Y].style.left;


    if( X < 3 && puzzleArr[X + 1][Y].style.backgroundColor  === "white") {

        puzzleArr[X][Y].style.top = puzzleArr[X + 1][Y].style.top;
        puzzleArr[X][Y].style.left = puzzleArr[X + 1][Y].style.left;
        puzzleArr[X + 1][Y].style.top = tempTop;
        puzzleArr[X + 1][Y].style.left = tempLeft;

        [puzzleArr[X][Y], puzzleArr[X + 1][Y]] = [puzzleArr[X + 1][Y], puzzleArr[X][Y]];

        movesMade++;

    }
    else if (X > 0 && puzzleArr[X - 1][Y].style.backgroundColor  === "white"){

        puzzleArr[X][Y].style.top = puzzleArr[X - 1][Y].style.top;
        puzzleArr[X][Y].style.left = puzzleArr[X - 1][Y].style.left;
        puzzleArr[X - 1][Y].style.top = tempTop;
        puzzleArr[X - 1][Y].style.left = tempLeft;

        [puzzleArr[X][Y], puzzleArr[X - 1][Y]] = [puzzleArr[X - 1][Y], puzzleArr[X][Y]];

        movesMade++;
    }
    else if (Y < 3 && puzzleArr[X][Y + 1].style.backgroundColor  === "white"){

        puzzleArr[X][Y].style.top = puzzleArr[X][Y + 1].style.top;
        puzzleArr[X][Y].style.left = puzzleArr[X][Y + 1].style.left;
        puzzleArr[X][Y + 1].style.top = tempTop;
        puzzleArr[X][Y + 1].style.left = tempLeft;

        [puzzleArr[X][Y], puzzleArr[X][Y + 1]] = [puzzleArr[X][Y + 1], puzzleArr[X][Y]];

        movesMade++;

    }
    else if(Y > 0 && puzzleArr[X][Y - 1].style.backgroundColor  === "white"){

        puzzleArr[X][Y].style.top = puzzleArr[X][Y - 1].style.top;
        puzzleArr[X][Y].style.left = puzzleArr[X][Y - 1].style.left;
        puzzleArr[X][Y - 1].style.top = tempTop;
        puzzleArr[X][Y - 1].style.left = tempLeft;

        [puzzleArr[X][Y], puzzleArr[X][Y - 1]] = [puzzleArr[X][Y - 1], puzzleArr[X][Y]];

        movesMade++;
    }

    document.getElementById("moves-made-number").innerHTML = movesMade.toString();
}
// getting X and Y coordinates and passing to swap function
function onPuzzleClick(element) {

    let X;
    let Y;

    for (let i = 0; i < gridQuantity; i++) {
        for (let j = 0; j < gridQuantity; j++) {
            if(element.style.top === puzzleArr[i][j].style.top &&  element.style.left === puzzleArr[i][j].style.left)
            {
                X = i;
                Y = j;
            }
        }
    }

    swap(X,Y);
}

generatePuzzleArr();
navigatePuzzle();
