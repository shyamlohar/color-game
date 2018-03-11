'use strict';

var header = document.querySelector('.header');
var resetColor = document.querySelector('.mode span');
var easy = document.querySelector('.diff span:nth-child(1)');
var hard = document.querySelector('.diff span:nth-child(2)');
var reset = document.querySelector('.mode span');
var allEasy = document.querySelectorAll('#easy');
var allHard = document.querySelectorAll('#hard');
var allDivs = document.querySelectorAll('.colors div');
var anounce = document.querySelector('#anouncement');
var guess = document.getElementById('guess');
var button = document.getElementById('reset');

var winColor;
var easyMode;
var hardMode;

// functions

function randomGen() {
    return Math.floor(Math.random() * 256);
}

function randomColor() {
    return 'rgb(' + randomGen() + ', ' + randomGen() + ', ' + randomGen() + ')';
}

function easyEvent() {
    easyMode = true;
    hardMode == false;
    allHard.forEach(function (harddiv) {
        harddiv.style.display = 'none';
    });
    newColor();
}

function hardEvent() {
    hardMode = true;
    easyMode = false;
    allHard.forEach(function (harddiv) {
        harddiv.style.display = 'block';
    });
    newColor();
}

function newColor() {
    resetEasy();
    if (easyMode) {
        var randomNum = Math.floor(Math.random() * 3);
        winColor = randomColor();
        guess.textContent = winColor;
        allEasy[randomNum].style.background = winColor;
        for (var i in [1, 2, 3]) {
            if (i == randomNum) {
                continue;
            } else {
                allEasy[i].style.background = randomColor();
            }
        }
    } else {
        var randomNum = Math.floor(Math.random() * 6);
        winColor = randomColor();
        guess.textContent = winColor;
        allDivs[randomNum].style.background = winColor;
        for (var i in [1, 2, 3, 4, 5, 6]) {
            if (i == randomNum) {
                continue;
            } else {
                allDivs[i].style.background = randomColor();
            }
        }
    }
}

function winCheck() {
    if (this.style.backgroundColor == winColor) {
        anounce.textContent = 'you won bitch';
        header.style.background = winColor;
        allDivs.forEach(function (div) {
            div.style.background = winColor;
        });
        button.style.display = 'inline-block';
        button.style.background = winColor;
    } else {
        this.style.visibility = 'hidden';
    }
}

function resetEasy() {
    anounce.textContent = '';
    header.style.background = '#673AB7';
    button.style.display = 'none';
    if (easyMode == true) {
        allEasy.forEach(function (div) {
            div.style.visibility = 'visible';
        });
    } else {
        allDivs.forEach(function (div) {
            div.style.visibility = 'visible';
        });
    }
}

// eventlisteners


easy.addEventListener('click', easyEvent);
hard.addEventListener('click', hardEvent);
allDivs.forEach(function (div) {
    div.addEventListener('click', winCheck);
});
resetColor.addEventListener('click', newColor);
button.addEventListener('click', newColor);

// startgame
newColor();