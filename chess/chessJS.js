function createFragment(itemHTML) {
    const parser = new DOMParser();
    return parser.parseFromString(itemHTML, 'text/html').body.firstElementChild;
}

function makeStruct(variables) {
    //var splitVariables = variables.split(' ');
    //var count = splitVariables.length;

    var count = variables.length;

    function constructor() {
        for (var i = 0; i < count; i++) {
            //this[splitVariables[i]] = arguments[i];
            this[variables[i]] = arguments[i];
        }
    }
    return constructor;
}

var pieceItem = makeStruct(["pieceName", "pieceImageURL", "getValidMoveIndexes"]);

const piecePath = "../Assets/mainMenuAssets/chess/piecesImages";

let pieceDictionary = new Map([
    ["p", new pieceItem("white-pawn", `${piecePath}/white-pawn.png`, getPawnMoveIndexes)],
    ["P", new pieceItem("black-pawn", `${piecePath}/black-pawn.png`, getPawnMoveIndexes)],

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

function isIndexOnBoard(index) {
    return (index > -1) && (index < boardSize);
}

function getPawnMoveIndexes(fenNotation, currentIndex) {
    const current2D = get2D(currentIndex);
    let new2D = current2D;

    const isWhite = fenNotation === fenNotation.toLowerCase();

    if (isWhite) {
        new2D[1] -= 1;
    } else {
        new2D[1] += 1;
    }


    const newIndex = getIndex(new2D[0], new2D[1]);
    if (isIndexOnBoard(newIndex)) {
        return [newIndex];
    }

    return [-1];
}


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

        const currentTile = document.getElementById(`square_${boardPieceIndex}`);
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

        const newTile = createFragment(`<div id="square_${boardPieceIndex}" class="boardSquare" style="background-color:${chosenColour};"> </div>`);

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


            const squareElement = document.getElementById(`square_${boardIndex}`);

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
                    selectedFen = currentLetter;
                });

                squareElement.appendChild(newPiece);
            }

            boardIndex++;
        }

    }
}

createBoardSquares();

const startBoardFen = "RNBQKBNRPPPPPPPP////pppppppprnbqkbnr";
createBoardPieces(startBoardFen);

let isMouseDown = false;
let selectedIndex = -1;
let selectedElement = null;
let selectedFen = "";

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

        const new2Ds = pieceDictionary.get(selectedFen).getValidMoveIndexes(selectedFen, selectedIndex);
        highlightSquares(new2Ds);

        selectedElement.style.left = mouseX + "px";
        selectedElement.style.top = mouseY + "px";
        //console.log(`selected piece of index ${selectedIndex}`);
    }
}

function highlightSquares(validTileIndexes) {
    for (const index of validTileIndexes) {
        const squareElement = document.getElementById(`square_${index}`);
        squareElement.style.backgroundColor = "#ff0000";
    }
}

function isMoveValid(newParentID, validTileIndexes) {
    for (const index of validTileIndexes) {
        if (index === newParentID) {
            return true;
        }
    }

    return false;
}

document.onmouseup = (e) => {
    const mouseX = e.pageX, mouseY = e.pageY;

    if (selectedElement != null) {
        if (selectedElement.parentElement == document.body) {
            const elementsAtMouse = document.elementsFromPoint(e.clientX, e.clientY);
            let newParent = elementsAtMouse.find(el => el.classList.contains('boardSquare')) ?? document.getElementById(`square_${selectedIndex}`);

            let newParentID = parseInt(newParent.id.split("_")[1]);
            const validTileIndexes = pieceDictionary.get(selectedFen).getValidMoveIndexes(selectedFen, selectedIndex);

            if (!isMoveValid(newParentID, validTileIndexes)) {
                newParent = document.getElementById(`square_${selectedIndex}`);
                newParentID = parseInt(newParent.id.split("_")[1]);
            }

            if (newParent.childNodes.length > 1) {
                console.log(`${newParent.id} has ${newParent.childNodes.length} children`);

                newParent.removeChild(newParent.childNodes[1]);
            }


            newParent.appendChild(selectedElement);
            selectedElement.style.position = "";
            selectedElement.style.width = "80%";
            selectedElement.style.transform = "";
            selectedElement.style.top = "";
            selectedElement.style.left = "";


            const newPieceElement = selectedElement.cloneNode(true);

            newParent.replaceChild(newPieceElement, selectedElement);
            selectedElement = newPieceElement;

            const pieceFen = selectedFen;

            selectedElement.addEventListener("mousedown", () => {
                isMouseDown = true;
                selectedIndex = newParentID;
                selectedElement = newPieceElement;
                selectedFen = pieceFen;
            });
        }
    }

    changeTileColours();

    isMouseDown = false;
    selectedIndex = -1;
    selectedElement = null;
    selectedFen = "";
}