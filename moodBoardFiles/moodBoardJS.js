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
    console.log("pictures in column: ", event.target.value);
    document.getElementById("amountInColLabel").innerText = "Pictures in column: " + event.target.value;
    document.getElementById("imageContainer").style.gridTemplateColumns = `repeat(${event.target.value}, minmax(0, 1fr))`;
}

const loadFiles = (event) => {
    const files = event.target.files;
    for(let file of files){
        const newImage = createFragment(`<image src="${URL.createObjectURL(file)}">`);
        document.getElementById("imageContainer").appendChild(newImage);
    }
}
