//for the creation of my elements

function createFragment(itemHTML) {
    const parser = new DOMParser();
    return parser.parseFromString(itemHTML, 'text/html').body.firstElementChild;
}

window.onload = function() {
    document.getElementById('file').addEventListener('change', loadFiles);

    document.getElementById("amountInColSlider").addEventListener('change', changeColSlider);
}

const changeColSlider = (event) => {
    //console.log("pictures in column: ", event.target.value);
    document.getElementById("amountInColLabel").innerText = "Pictures in column: " + event.target.value;
    //document.getElementById("imageContainer").style.gridTemplateColumns = `repeat(${event.target.value}, minmax(0, 1fr))`;

    const container = document.getElementById("imageContainer");

    const images = [...document.getElementsByClassName("moodImage")];

    container.replaceChildren();

    for (i = 0; i < event.target.value; i++) {
        const newColumn = createFragment(`<div id="column${i}" class="column"></div>`);
        document.getElementById("imageContainer").appendChild(newColumn);
    }

    let columnCount = 0;
    for (let image of images) {
        const currentCol = columnCount % event.target.value;
        const newImage = image;
        document.getElementById(`column${currentCol}`).appendChild(newImage);

        columnCount++;
    }

    columns = document.getElementsByClassName("column");
    for (i = 0; i < event.target.value; i++) {
        columns[i].style.msFlex = `${100 / event.target.value}%`;  // IE10
        columns[i].style.flex = `${100 / event.target.value}%`;
    }
}

const loadFiles = (event) => {
    const columnsLength = document.getElementById("amountInColSlider").value;

    for (i = 0; i < columnsLength; i++) {
        const newColumn = createFragment(`<div id="column${i}" class="column"></div>`);
        document.getElementById("imageContainer").appendChild(newColumn);
    }

    const files = event.target.files;
    let columnCount = 0;
    for (let file of files) {
        const currentCol = columnCount % columnsLength;
        const newImage = createFragment(`<image src="${URL.createObjectURL(file)}" style="width:100%;" class="moodImage">`);
        document.getElementById(`column${currentCol}`).appendChild(newImage);

        columnCount++;
    }

    const columns = document.getElementsByClassName("column");
    for (i = 0; i < columnsLength; i++) {
        columns[i].style.msFlex = `${100 / columnsLength}%`;  // IE10
        columns[i].style.flex = `${100 / columnsLength}%`;
    }
}

function downloadGrid() {
    const grid = document.getElementById("imageContainer");

    html2canvas(grid, {
        scale: 2, // increase for higher resolution (important for A4)
        useCORS: true
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "grid.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
