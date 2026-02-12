//for the creation of my elements

function createFragment(itemHTML) {
    const parser = new DOMParser();
    return parser.parseFromString(itemHTML, 'text/html').body.firstElementChild;
}

window.onload = function() {
    document.getElementById('file').addEventListener('change', loadFiles);
}
const loadFiles = (event) => {
    const files = event.target.files;
    for(let file of files){
        var fr = new FileReader();
        fr.onload = function () {
            const newImage = createFragment('<image src="${fr.result}"></image>');
            document.getElementById("imageContainer").appendChild(newImage);
        }
        
        fr.readAsDataURL(file);
        FileReader.Close();
    }
}
