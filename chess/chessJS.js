let isWhiteMove = true;

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

    ["b", new pieceItem("white-bishop", `${piecePath}/white-bishop.png`, getBishopMoveIndexes)],
    ["B", new pieceItem("black-bishop", `${piecePath}/black-bishop.png`, getBishopMoveIndexes)],

    ["q", new pieceItem("white-queen", `${piecePath}/white-queen.png`, getQueenMoveIndexes)],
    ["Q", new pieceItem("black-queen", `${piecePath}/black-queen.png`, getQueenMoveIndexes)],

    ["r", new pieceItem("white-rook", `${piecePath}/white-rook.png`, getRookMoveIndexes)],
    ["R", new pieceItem("black-rook", `${piecePath}/black-rook.png`, getRookMoveIndexes)],

    ["n", new pieceItem("white-knight", `${piecePath}/white-knight.png`, getHorseMoveIndexes)],
    ["N", new pieceItem("black-knight", `${piecePath}/black-knight.png`, getHorseMoveIndexes)],

    ["k", new pieceItem("white-king", `${piecePath}/white-king.png`, getKingMoveIndexes)],
    ["K", new pieceItem("black-king", `${piecePath}/black-king.png`, getKingMoveIndexes)],
]);

function isIndexOnBoard(index) {
    return (index > -1) && (index < boardSize);
}

function isYourMove(fenNotation) {
    const isWhite = !!(fenNotation === fenNotation.toLowerCase());

    return (isWhite & isWhiteMove) | (!isWhite & !isWhiteMove);
}

function isCoordinateOnEdge(coord) {
    return (coord[0] === 0) | (coord[0] === (boardSideLength - 1));
}

function isIndexOnEdge(index) {

    let onEdge = false;
    for (let row = 1; row <= boardSideLength; row++) {
        const edgeIndexForRow = row * 8 - 1;

        if (edgeIndexForRow === index) {
            onEdge = true;
            break;
        }
    }

    return (index % 8 == 0) | (onEdge);
}

function hasPiece(index) {
    const squareElement = document.getElementById(`square_${index}`);
    return !!(squareElement.childNodes.length > 1)
}

function xor(a, b) {
    return ((a & !b) | (b & !a));
}

function canTake(fenNotation, index) {
    const isWhite = !!(fenNotation === fenNotation.toLowerCase());

    if (hasPiece(index)) {
        const squareElement = document.getElementById(`square_${index}`);
        const child = squareElement.firstElementChild;

        return !!((isWhite & (child.dataset.piececolour === "black")) | (!isWhite & (child.dataset.piececolour === "white")));
    }

    return false;
}

function getBishopMoveIndexes(fenNotation, currentIndex) {
    const current2D = get2D(currentIndex);
    
    let validMoves = [];

    for (let bottomRight = 1; bottomRight < boardSideLength; bottomRight++) {
        const new2D = [current2D[0] + bottomRight, current2D[1] + bottomRight];
        const newIndex = getIndex(new2D[0], new2D[1]);

        if (new2D[0] < 0 | new2D[0] >= boardSideLength) break;

        if (!isIndexOnBoard(newIndex)) break;

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if (canTakeBoolean) {
                break;
            }
        } else {
            break;
        }

        if (isIndexOnEdge(newIndex)) break;
    }

    for (let topLeft = 1; topLeft < boardSideLength; topLeft++) {
        const new2D = [current2D[0] - topLeft, current2D[1] - topLeft];
        const newIndex = getIndex(new2D[0], new2D[1]);

        if (new2D[0] < 0 | new2D[0] >= boardSideLength) break;

        if (!isIndexOnBoard(newIndex)) break;

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if (canTakeBoolean) {
                break;
            }
        } else {
            break;
        }

        if (isIndexOnEdge(newIndex)) break;
    }

    for (let topRight = 1; topRight < boardSideLength; topRight++) {
        const new2D = [current2D[0] + topRight, current2D[1] - topRight];
        const newIndex = getIndex(new2D[0], new2D[1]);

        if (new2D[0] < 0 | new2D[0] >= boardSideLength) break;

        if (!isIndexOnBoard(newIndex)) break;

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if (canTakeBoolean) {
                break;
            }
        } else {
            break;
        }

        if (isIndexOnEdge(newIndex)) break;
    }

    for (let bottomLeft = 1; bottomLeft < boardSideLength; bottomLeft++) {
        const new2D = [current2D[0] - bottomLeft, current2D[1] + bottomLeft];
        const newIndex = getIndex(new2D[0], new2D[1]);

        if (new2D[0] < 0 | new2D[0] >= boardSideLength) break;

        if (!isIndexOnBoard(newIndex)) break;

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if (canTakeBoolean) {
                break;
            }
        } else {
            break;
        }

        if (isIndexOnEdge(newIndex)) break;
    }

    return validMoves;
}

function getQueenMoveIndexes(fenNotation, currentIndex) {
    const current2D = get2D(currentIndex);
    const isWhite = !!(fenNotation === fenNotation.toLowerCase());

    let validMoves = [];

    validMoves.push(...getRookMoveIndexes(fenNotation, currentIndex));
    validMoves.push(...getBishopMoveIndexes(fenNotation, currentIndex));

    return validMoves;
}

function getRookMoveIndexes(fenNotation, currentIndex) {
    const current2D = get2D(currentIndex);

    let validMoves = [];

    for (let toRight = current2D[0] + 1; toRight < boardSideLength; toRight++) {
        const newIndex = getIndex(toRight, current2D[1]);

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if(canTakeBoolean){
                break;
                }
        } else {
            break;
        }
    }
    for (let toLeft = current2D[0] - 1; toLeft >= 0; toLeft--) {
        const newIndex = getIndex(toLeft, current2D[1]);

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if(canTakeBoolean){
                break;
                }
        } else {
            break;
        }
    }

    for (let toUp = current2D[1] - 1; toUp >= 0; toUp--) {
        const newIndex = getIndex(current2D[0], toUp);

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if(canTakeBoolean){
                break;
                }
        } else {
            break;
        }
    }
    for (let toDown = current2D[1] + 1; toDown < boardSideLength; toDown++) {
        const newIndex = getIndex(current2D[0], toDown);

        const hasPieceBool = hasPiece(newIndex), canTakeBoolean = canTake(fenNotation, newIndex);

        if (!hasPieceBool || canTakeBoolean) {
            validMoves.push(newIndex);
            if (canTakeBoolean) {
                break;
            }
        } else {
            break;
        }
    }

    return validMoves;
}

function getPawnMoveIndexes(fenNotation, currentIndex) {
    const current2D = get2D(currentIndex);
    const isWhite = !!(fenNotation === fenNotation.toLowerCase());

    let isValid = [];

    const colourMultiplier = isWhite ? -1 : 1;

    let toCheck = [[0, 1 * colourMultiplier], [-1, 1 * colourMultiplier], [1, 1 * colourMultiplier]];

    if (selectedElement.dataset.hasmoved === "false") {
        const ahead = getIndex(current2D[0], current2D[1] + (1 * colourMultiplier));

        if (!hasPiece(ahead)) {
            toCheck.push([0, 2 * colourMultiplier]);
        }
    }

    for (const add2D of toCheck) {
        const new2D = [current2D[0] + add2D[0], current2D[1] + add2D[1]];
        const newIndex = getIndex(new2D[0], new2D[1]);
        if ((isIndexOnBoard(newIndex)) & (new2D[0] >= 0 & new2D[0] < boardSideLength)) {

            const canTakeBoolean = !!canTake(fenNotation, newIndex);
            const isForward = ((add2D[0] === 0 & add2D[1] === (1 * colourMultiplier))) | ((add2D[0] === 0 & add2D[1] === (2 * colourMultiplier)));

            if((canTakeBoolean & !isForward) | (!canTakeBoolean & isForward)) {
               isValid.push(newIndex); 
            }
            
            // if (!!xor(canTakeBoolean, isForward) | (!hasPiece(newIndex) && canTakeBoolean)) {
            //     isValid.push(newIndex);
            // }
        }
    }

    return isValid;
}

function getHorseMoveIndexes(fenNotation, currentIndex) {
    const current2D = get2D(currentIndex);
    const relative2DMovement = [[-1, -2], [1, -2], [2, -1], [2, 1], [-2, -1], [-2, 1], [1, 2], [-1, 2]];

    let moveList = [];

    for (const relativeMove of relative2DMovement) {
        const new2D = [current2D[0] + relativeMove[0], current2D[1] + relativeMove[1]];

        if (new2D[0] < 0 | new2D[0] >= boardSideLength) continue;

        const newIndex = getIndex(new2D[0], new2D[1]);
        if (!isIndexOnBoard(newIndex)) continue;
        if (hasPiece(newIndex) & !canTake(fenNotation, newIndex)) continue;


        moveList.push(newIndex);
    }

    return moveList;
}

function getKingMoveIndexes(fenNotation, currentIndex) {
    const current2D = get2D(currentIndex);

    let moveList = [];

    for (let row = -1; row < 2; row++) {
        for (let column = -1; column < 2; column++) {
            if (row === 0 && column === 0) continue;

            const new2D = [current2D[0] + column, current2D[1] + row];
            if (new2D[0] < 0 && new2D[0] >= boardSideLength) continue;

            const newIndex = getIndex(new2D[0], new2D[1]);
            if (!isIndexOnBoard(newIndex)) continue;

            if (!hasPiece(newIndex) | (canTake(fenNotation, newIndex))) {
                moveList.push(newIndex);
            }
        }
    }

    return moveList;
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

            const isWhite = currentLetter === currentLetter.toLowerCase();

            const squareElement = document.getElementById(`square_${boardIndex}`);

            //console.log(squareElement.childNodes.length > 1)

            if (squareElement.childNodes.length > 1) {
                squareElement.firstChild.src = pieceDictionaryValue.pieceImageURL;
            } else {
                const currentBoardIndex = boardIndex;

                const colourName = isWhite ? "white" : "black";

                const newPiece = createFragment(`<img src="${pieceDictionaryValue.pieceImageURL}" data-piececolour="${colourName}" data-hasmoved="false" data-piecefen="${currentLetter}" class="boardPiece" style="width:80%;"> </img>`);

                newPiece.addEventListener("mousedown", () => {
                    if(!isYourMove(currentLetter)) return;
                    
                    isMouseDown = true;
                    selectedIndex = currentBoardIndex;
                    selectedElement = newPiece;
                    selectedFen = currentLetter;
                });
                newPiece.addEventListener("touchstart", () => {
                    if(!isYourMove(currentLetter)) return;

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
let currentBoardFen = startBoardFen;
createBoardPieces(currentBoardFen);

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

        const newIndexes = pieceDictionary.get(selectedFen).getValidMoveIndexes(selectedFen, selectedIndex);
        highlightSquares(newIndexes);

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

function getCurrentBoardFen() {
    let newFen = "";
    let sinceLastPiece = 0;

    for (let index = 0; index < boardSize; index++) {
        const currentX = index % boardSideLength;

        const cellElement = document.getElementById(`square_${index}`);

        if (currentX === 0 & sinceLastPiece > 0) {
            sinceLastPiece = 0;
            newFen += "/";
        }

        if (cellElement.childNodes.length > 1) {
            if (sinceLastPiece > 0) {
                newFen += sinceLastPiece.toString();
                sinceLastPiece = 0;
            }

            const childFen = cellElement.firstElementChild.dataset.piecefen;

            newFen += childFen;
        } else {
            sinceLastPiece++;
        }
    }

    console.log(newFen);
}

document.onmouseup = (e) => {
    const mouseX = e.pageX, mouseY = e.pageY;

    let movedPiece = false;

    if (selectedElement != null) {
        if (selectedElement.parentElement == document.body) {
            const elementsAtMouse = document.elementsFromPoint(e.clientX, e.clientY);
            let newParent = elementsAtMouse.find(el => el.classList.contains('boardSquare')) ?? document.getElementById(`square_${selectedIndex}`);

            let newParentID = parseInt(newParent.id.split("_")[1]);
            const validTileIndexes = pieceDictionary.get(selectedFen).getValidMoveIndexes(selectedFen, selectedIndex);

            if (!isMoveValid(newParentID, validTileIndexes)) {
                newParent = document.getElementById(`square_${selectedIndex}`);
                newParentID = parseInt(newParent.id.split("_")[1]);
            } else {
                //detected that the piece has moved to a new position;

                selectedElement.dataset.hasmoved = "true";

                movedPiece = true;
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
                if (!isYourMove(pieceFen)) return;

                isMouseDown = true;
                selectedIndex = newParentID;
                selectedElement = newPieceElement;
                selectedFen = pieceFen;
            });
            selectedElement.addEventListener("touchstart", () => {
                if (!isYourMove(pieceFen)) return;

                isMouseDown = true;
                selectedIndex = newParentID;
                selectedElement = newPieceElement;
                selectedFen = pieceFen;
            });
        }
    }

    if (movedPiece) {
        isWhiteMove = !isWhiteMove;
        document.getElementById("turnText").textContent = isWhiteMove ? "Whites Turn" : "Blacks Turn";

        getCurrentBoardFen();
    }

    changeTileColours();

    isMouseDown = false;
    selectedIndex = -1;
    selectedElement = null;
    selectedFen = "";
}
