setTimeout(100); //allows the css to load

//makes the borders height equal the same height as the web page
function setBordersHeight() {
    document.body.height = "10000px";

    const borders = document.getElementsByClassName("border");

    for (const border of borders) {
        console.log("set " + border.id + " height to " + document.body.height);
        border.style.height = document.body.height;
    }
}

//sets a objects position relative to another object in the scene
function setPosRelativeTo(move, relativeTo, moveDist, multiplier, anchor, sizeType) {
    const relativeRect = relativeTo.getBoundingClientRect();

    const height = relativeTo.offsetHeight;
    const width = relativeTo.offsetWidth;

    //102.25px + 197.6470px

    let toAdd = multiplier;
    let style = move.style;

    switch (anchor) {

        case "left":
            toAdd *= relativeRect.left + width;
            style.left = (toAdd + moveDist) + sizeType.toString();
            break;

        case "right":
            toAdd *= relativeRect.right + width;
            style.right = (toAdd + moveDist) + sizeType.toString();
            break;

        case "top":
            toAdd *= relativeRect.top + height;
            style.top = (toAdd + moveDist) + sizeType.toString();
            break;

        case "bottom":
            toAdd *= relativeRect.bottom + height;
            style.bottom = (toAdd + moveDist) + sizeType.toString();
            break;

        default:
            console.print("add an anchor")
            break;
    }
}

setBordersHeight();

//sets the videos position
setPosRelativeTo(document.getElementById("firstVideoHolder"), document.getElementById("topBar"), 1, .1, "top", "vw");

//sets the videos text
setPosRelativeTo(document.getElementById("firstVideoText"), document.getElementById("firstVideoHolder"), 1, .08, "top", "vw");

//setInterval(() => {
//    document.getElementById("firstVideoText").style.fontSize = (document.getElementById("firstVideoHolder").style.height) + 'px';
//}, 1)