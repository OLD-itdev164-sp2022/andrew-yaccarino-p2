// as react only seems to allow people to make a starting condition, we will have to find a way to use the base DOM

function _getHex(x) {
    let y = x.toString(16);
    if (y.length < 2) y = "0" + y;
    return y.toUpperCase();
}

function setoutput(arr,document) {
    for (let i = 0; i < 16; i++) {
        let mem_loc = arr.length + i - 16;
        document.getElementById(`display-${i.toString(16).toUpperCase()}`).innerHTML = String.fromCharCode(arr[mem_loc]);
    }
}

function updateDisplay(arr, document) {
    arr.forEach((value, index) => {document.getElementById(`TD-${_getHex(index)}`).innerHTML = _getHex(value);});
    setoutput(arr,document)
}

function highlight(document, id_number, highlight_class) {
    document.getElementById(`TD-${_getHex(id_number)}`).setAttribute('class', highlight_class);
} 

export { updateDisplay, highlight };