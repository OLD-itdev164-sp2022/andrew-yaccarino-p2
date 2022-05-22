// as react only seems to allow people to make a starting condition, we will have to find a way to use the base DOM

function _getHex(x) {
    let y = x.toString(16);
    if (y.length < 2) y = "0" + y;
    return y.toUpperCase();
}

function updateDisplay(arr, document) {
    arr.forEach((value, index) => {
        document.getElementById(`TD-${_getHex(index)}`).innerHTML = _getHex(value);
    });
}

export { updateDisplay };