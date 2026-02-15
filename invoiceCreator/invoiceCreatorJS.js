function updateInvoiceSize() {

    const invoiceContainer = document.getElementById("invoiceContainer");

    const maxHeight = window.innerHeight - 100;
    const maxWidth = window.innerWidth - 100;

    const width = 794;  
    const height = 1123;
    const ratio = height / width;

    let newWidth = maxWidth;
    let newHeight = newWidth * ratio;

    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight / ratio;
    }

    invoiceContainer.style.width = newWidth + "px";
    invoiceContainer.style.height = newHeight + "px";
}
window.addEventListener('resize', updateInvoiceSize);
updateInvoiceSize();