function createFragment(itemHTML) {
    const parser = new DOMParser();
    return parser.parseFromString(itemHTML, 'text/html').body.firstElementChild;
}

function makeStruct(variables) {
    var splitVariables = variables.split(' ');
    var count = splitVariables.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[splitVariables[i]] = arguments[i];
        }
    }
    return constructor;
}

var pieceItem = makeStruct("pieceName pieceImageURL");

const piecePath = "../Assets/mainMenuAssets/chess/piecesImages";

let pieceDictionary = new Map([
    ["p", new pieceItem("white-pawn", `${piecePath}/white-pawn.png`)],
    ["P", new pieceItem("black-pawn", `${piecePath}/black-pawn.png`)],

    ["b", new pieceItem("white-bishop", `${piecePath}/white-bishop.png`)],
    ["B", new pieceItem("black-bishop", `${piecePath}/black-bishop.png`)],

    ["q", new pieceItem("white-queen", `${piecePath}/white-queen.png`)],
    ["Q", new pieceItem("black-queen", `${piecePath}/black-queen.png`)],

    ["r", new pieceItem("white-rook", `${piecePath}/white-rook.png`)],
    ["R", new pieceItem("black-rook", `${piecePath}/black-rook.png`)],

    ["n", new pieceItem("white-knight", `${piecePath}/white-knight.png`)],
    ["N", new pieceItem("black-knight", `${piecePath}/black-knight.png`)],

    ["k", new pieceItem("white-king", `${piecePath}/white-king.png`)],
    ["K", new pieceItem("black-king", `${piecePath}/black-king.png`)],
]);


const boardSquaresElement = document.getElementById("boardSquares");
//const boardPiecesElement = document.getElementById("boardPieces");

const firstTileColourPicker = document.getElementById("firstTileColourPicker");
const secondTileColourPicker = document.getElementById("secondTileColourPicker");

firstTileColourPicker.addEventListener('input', changeTileColours);
secondTileColourPicker.addEventListener('input', changeTileColours);

function changeTileColours() {
    let rowIndex = 0;
    for (let boardPieceIndex = 0; boardPieceIndex < boardSize; boardPieceIndex++) {
        if (boardPieceIndex % boardSideLength == 0) {
            rowIndex++;
        }

        let chosenColour;

        if (rowIndex % 2 == 0) {
            chosenColour = (boardPieceIndex % 2 == 0) ? firstTileColourPicker.value : secondTileColourPicker.value;
        } else {
            chosenColour = (boardPieceIndex % 2 == 0) ? secondTileColourPicker.value : firstTileColourPicker.value;
        }

        const currentTile = document.getElementById(`square${boardPieceIndex}`);
        currentTile.style.backgroundColor = chosenColour;
    }
}

const boardSize = 64;
const boardSideLength = Math.sqrt(boardSize);

//let boardWidth = boardSquaresElement.offsetWidth;
let boardWidth = Math.min(boardSquaresElement.offsetWidth, boardSquaresElement.offsetHeight);


function get2D(index) {
    const x = index % boardSideLength;
    const y = Math.floor(index / boardSideLength);

    return [x, y];
}

function getIndex(x, y) {
    return y * boardSideLength + x
}

function resizeBoard() {
    boardWidth = boardSquaresElement.offsetWidth;

    boardSquaresElement.style.gridTemplateColumns = `repeat(${boardSideLength}, ${boardWidth / boardSideLength}px)`;
    boardSquaresElement.style.gridTemplateRows = `repeat(${boardSideLength}, ${boardWidth / boardSideLength}px)`;

    //boardPiecesElement.style.gridTemplateColumns = `repeat(${boardSideLength}, ${boardWidth / boardSideLength}px)`;
    //boardPiecesElement.style.gridTemplateRows = `repeat(${boardSideLength}, ${boardWidth / boardSideLength}px)`;
}

window.addEventListener('resize', resizeBoard);
document.addEventListener('DOMContentLoaded', resizeBoard);

function createBoardSquares() {
    let rowIndex = 0;
    for (let boardPieceIndex = 0; boardPieceIndex < boardSize; boardPieceIndex++) {
        if (boardPieceIndex % boardSideLength == 0) {
            rowIndex++;
        }

        let chosenColour;

        if (rowIndex % 2 == 0) {
            chosenColour = (boardPieceIndex % 2 == 0) ? firstTileColourPicker.value : secondTileColourPicker.value;
        } else {
            chosenColour = (boardPieceIndex % 2 == 0) ? secondTileColourPicker.value : firstTileColourPicker.value;
        }

        const newTile = createFragment(`<div id="square${boardPieceIndex}" class="boardSquare" style="background-color:${chosenColour};"> </div>`);

        boardSquaresElement.appendChild(newTile);
    }
}

function createBoardPieces(inputFen) {

    let boardIndex = 0;
    for (let fenIndex = 0; fenIndex < inputFen.length; fenIndex++) {
        if (boardIndex > (boardSize - 1)) return;

        const currentLetter = inputFen[fenIndex];

        if (currentLetter == '/') {
            let newIndex = boardIndex;

            do {
                newIndex++;
            } while (newIndex % boardSideLength != 0);

            boardIndex = newIndex;
            continue;
        }

        if (Number.isInteger(parseInt(currentLetter))) {
            boardIndex += parseInt(currentLetter) - 1;
        } else {
            const pieceDictionaryValue = pieceDictionary.get(currentLetter);


            const squareElement = document.getElementById(`square${boardIndex}`);

            //console.log(squareElement.childNodes.length > 1)

            if (squareElement.childNodes.length > 1) {
                squareElement.firstChild.src = pieceDictionaryValue.pieceImageURL;
            } else {
                const currentBoardIndex = boardIndex;

                const newPiece = createFragment(`<img src="${pieceDictionaryValue.pieceImageURL}" class="boardPiece" style="width:80%;"> </img>`);
                newPiece.addEventListener("mousedown", () => {
                    isMouseDown = true;
                    selectedIndex = currentBoardIndex;
                    selectedElement = newPiece;
                });

                squareElement.appendChild(newPiece);
            }

            boardIndex++;
        }

    }


    //for (let boardPieceIndex = 0; boardPieceIndex < 64; boardPieceIndex++) {
    //    const squareElement = document.getElementById(`square${boardPieceIndex}`);

    //    const newPiece = createFragment(`<img src="${pieceDictionary.p.pieceImageURL}" class="boardPiece" style="width:80%;"> </img>`);
    //    newPiece.addEventListener("mousedown", () => {
    //        isMouseDown = true;
    //        selectedIndex = boardPieceIndex;
    //    });

    //    squareElement.appendChild(newPiece);
    //}
}

createBoardSquares();

const startBoardFen = "RNBQKBNRPPPPPPPP////pppppppprnbqkbnr";
createBoardPieces(startBoardFen);

let isMouseDown = false;
let selectedIndex = -1;
let selectedElement = null;
document.onmousemove = (e) => {
    const mouseX = e.pageX, mouseY = e.pageY;

    if (isMouseDown && selectedIndex != -1) {
        if (selectedElement.parentElement != document.body) {
            const elementWidth = selectedElement.offsetWidth;

            document.body.appendChild(selectedElement);

            selectedElement.style.position = "absolute";
            selectedElement.style.width = elementWidth + "px";
            selectedElement.style.transform = "Translate(-50%, -50%)";
        }

        selectedElement.style.left = mouseX + "px";
        selectedElement.style.top = mouseY + "px";
        //console.log(`selected piece of index ${selectedIndex}`);
    }
}

document.onmouseup = (e) => {
    const mouseX = e.pageX, mouseY = e.pageY;

    if (selectedElement != null) {
        if (selectedElement.parentElement == document.body) {
            const elementsAtMouse = document.elementsFromPoint(e.clientX, e.clientY);
            const newElement = elementsAtMouse.find(el => el.classList.contains('boardSquare')) ?? document.getElementById(`square${selectedIndex}`);

            if (newElement.childNodes.length > 1) {
                console.log(`${newElement.id} has ${newElement.childNodes.length} children`);

                newElement.removeChild(newElement.childNodes[1]);
            }

            newElement.appendChild(selectedElement);
            selectedElement.style.position = "";
            selectedElement.style.width = "80%";
            selectedElement.style.transform = "";
            selectedElement.style.top = "";
            selectedElement.style.left = "";
        }
    }

    isMouseDown = false;
    selectedIndex = -1;
    selectedElement = null;
}