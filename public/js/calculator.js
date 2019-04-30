'use strict';

let mathString = "";
let inputField = document.getElementById('calc-input');

function inputKeypress (e) {
    let x = e.srcElement.innerText;
    mathString += x;
    inputField.value = mathString;
}

function deleteInput() {
    inputField.value = '';
    mathString = '';
}

function sendRequest() {

    let data = JSON.stringify([
        {
            "string": mathString
        }
    ]);

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            // console.log('4',this.responseText);
            let result = JSON.parse(this.responseText);
            inputField.value = result[0]["result"];
        } else if (this.readyState === 2) {
            // console.log('2', this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:3000/mathAPI", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
}
