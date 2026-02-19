const invoiceContainer = document.getElementById("invoiceContainers");

function updateInvoiceContainerSize() {
    const YPos = invoiceContainer.getBoundingClientRect().y;

    const newHeight = document.documentElement.clientHeight - YPos;

    invoiceContainer.style.height = (newHeight - 20) + "px";
}

function updateInvoicesSize() {
    const maxHeight = invoiceContainer.getBoundingClientRect().height;
    const maxWidth = invoiceContainer.getBoundingClientRect().width / 2;


    const width = 794;  
    const height = 1123;
    const ratio = height / width;

    let newWidth = maxWidth;
    let newHeight = newWidth * ratio;

    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight / ratio;
    }

    const invoiceNames = ["invoiceEditContainer", "invoicePreviewContainer"];
    for (const itemName of invoiceNames) {
        const invoiceItem = document.getElementById(itemName);

        invoiceItem.style.width = newWidth + "px";
        invoiceItem.style.height = newHeight + "px";
    }
}

function updatePreviews() {
    const allElements = document.getElementsByTagName("*");

    for (const element of allElements) {
        const elementID = element.id;

        if (elementID.startsWith("preview")) {
            const idName = element.id.replace("preview", "edit");
            const opposingElement = document.getElementById(`${idName}`)

            if (element.textContent != opposingElement.value) {
                element.textContent = opposingElement.value;
            }
        }
    }
}

function confineInputs() {
    const allInputs = document.getElementsByTagName("input");
    
    for (const input of allInputs) {
        const words = input.value;
        let sinceLastSpace = 0;

        let newWord = "";
        for (const letter of words) {
            newWord += letter;

            if (letter == ' ') {
                sinceLastSpace = 0;
                continue;
            }


            const opposingElement = document.getElementById(input.id.replace("edit", "preview"))
            let opposingFontSize = parseFloat(getComputedStyle(opposingElement).fontSize);

            let viewWidth = (100 * opposingFontSize) / window.innerWidth;


            if (sinceLastSpace >= (18 / viewWidth)) {
                newWord = newWord.substring(0, newWord.length - 1);
                break;
            }

            sinceLastSpace++;
        }

        input.value = newWord;
    }
}

window.addEventListener('resize', () => {
    updateInvoiceContainerSize();
    updateInvoicesSize();
});

window.addEventListener('DOMContentLoaded', () => {
    updateInvoiceContainerSize();
    updateInvoicesSize();
});

setInterval(() => {
    confineInputs();
    updatePreviews();
}, 10);