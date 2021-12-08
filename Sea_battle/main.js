const xInput = document.getElementById('x'),
    yInput = document.getElementById('y'),
    shipsInput = document.getElementById('ships'),
    createBtn = document.getElementsByTagName('button')[0],
    playArea = document.getElementsByTagName('section')[0],
    turnName = document.getElementsByTagName('h1')[0],
    info = document.getElementsByTagName('h2')[0],
    playTable = document.getElementsByTagName('table')[0],
    availableShips = document.getElementsByTagName('p')[0],
    continueBtn = document.getElementsByTagName('button')[1],
	body = document.body;
let shipsValue;

xInput.onkeyup = disableBtn;
yInput.onkeyup = disableBtn;
shipsInput.onkeyup = disableBtn;

function disableBtn() {
    createBtn.disabled = !(xInput.value.trim() && yInput.value.trim() && shipsInput.value.trim());
}

createBtn.onclick = function() {
    let xValue = +xInput.value,
        yValue = +yInput.value;

    shipsValue = +shipsInput.value;

    if (!isValidFieldValue(xValue)) {
        resetForm([xInput]);
        showError(xInput.id);
    }

    if (!isValidFieldValue(yValue)) {
        resetForm([yInput]);
        showError(yInput.id);
    }

    if (!isValidFieldValue(shipsValue)) {
        resetForm([shipsInput]);
        showError(shipsInput.id);
    }

    if (isValidFieldValue(xValue) && isValidFieldValue(yValue) && isValidFieldValue(shipsValue)) {
        resetForm([xInput, yInput, shipsInput]);
        showPlayArea(xValue, yValue, shipsValue);
    }
};

function isValidFieldValue(value) {
    return value && isInteger(value) && value >=1 && value <= 10;
}

function isInteger(value) {
    return !(value % 1);
}

function showError(field) {
    alert('Введите корректное значение в поле ' + field.toUpperCase() + ' - целое число от 1 до 10.');
}

function resetForm(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    disableBtn();
}

function showPlayArea(xValue, yValue, shipsValue) {
    playArea.classList.remove('hidden');

    for (let i = 0; i < yValue; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < xValue; j++) {
            let td = document.createElement('td');

            td.classList.add('blue');
            td.id = `${i + 1}${j + 1}`

            tr.appendChild(td);
        }

        playTable.appendChild(tr);
    }

    availableShips.textContent = shipsValue;

    setPlayTableClickHandler();

    setMainButtonClickHandler();
}

function setPlayTableClickHandler() {
    playTable.onclick = function() {
        let target = event.target;

        if (target.tagName === 'TD') {
            if (+availableShips.textContent) {
                target.classList.toggle('black');
                target.classList.toggle('blue');
                availableShips.textContent = target.classList.contains('black') ? (+availableShips.textContent - 1) : (+availableShips.textContent + 1);
            } else if (+availableShips.textContent < 1 && target.classList.contains('black')) {
                target.classList.remove('black');
                target.classList.add('blue');
                availableShips.textContent = target.classList.contains('black') ? (+availableShips.textContent - 1) : (+availableShips.textContent + 1);
            }
        }
    };
}

function setMainButtonClickHandler() {
    continueBtn.onclick = function() {
        switch (continueBtn.textContent) {
            case 'Save second player`s ships desposition':
                sessionStorage.setItem('secondPlayerShipsDisposition', JSON.stringify(saveShipsDisposition()));

                for (let i = 0; i < playTable.children.length; i++) {
                    for (let j = 0; j < playTable.children[i].children.length; j++) {
                        playTable.children[i].children[j].classList.remove('black');
                        playTable.children[i].children[j].classList.add('blue');
                    }
                }

                availableShips.textContent = JSON.parse(sessionStorage.getItem('secondPlayerShipsDisposition')).length;
                info.textContent = 'Ships number that enemy has:'
                turnName.textContent = 'First player`s turn';
                continueBtn.textContent = 'Go to the second player`s turn';
    
                playTable.onclick = strikeShip;
                break;

            case 'Save first player`s ships desposition':
                sessionStorage.setItem('firstPlayerShipsDisposition', JSON.stringify(saveShipsDisposition()));

                for (let i = 0; i < playTable.children.length; i++) {
                    for (let j = 0; j < playTable.children[i].children.length; j++) {
                        playTable.children[i].children[j].classList.remove('black');
                        playTable.children[i].children[j].classList.add('blue');
                    }
                }

                availableShips.textContent = shipsValue;
                turnName.textContent = 'Second player`s ships desposition';
                continueBtn.textContent = 'Save second player`s ships desposition';
                break;

            case 'Go to the second player`s turn':
                playTable.onclick = strikeShip;

                if (sessionStorage.getItem('firstPlayerBattleTable')) {
                    let obj = JSON.parse(sessionStorage.getItem('firstPlayerBattleTable'));

                    for (let i = 0; i < playTable.children.length; i++) {
                        for (let j = 0; j < playTable.children[i].children.length; j++) {
                            playTable.children[i].children[j].className = obj[playTable.children[i].children[j].id];
                        }
                    }
                } else {
                    for (let i = 0; i < playTable.children.length; i++) {
                        for (let j = 0; j < playTable.children[i].children.length; j++) {
                            playTable.children[i].children[j].className = 'blue';
                        }
                    }
                }

                availableShips.textContent = JSON.parse(sessionStorage.getItem('firstPlayerShipsDisposition')).length;
                continueBtn.textContent = 'Go to the first player`s turn';
                turnName.textContent = 'Second player`s turn';
                break;

            case 'Go to the first player`s turn':
                playTable.onclick = strikeShip;

                if (sessionStorage.getItem('secondPlayerBattleTable')) {
                    let obj = JSON.parse(sessionStorage.getItem('secondPlayerBattleTable'));

                    for (let i = 0; i < playTable.children.length; i++) {
                        for (let j = 0; j < playTable.children[i].children.length; j++) {
                            playTable.children[i].children[j].className = obj[playTable.children[i].children[j].id];
                        }
                    }
                } else {
                    for (let i = 0; i < playTable.children.length; i++) {
                        for (let j = 0; j < playTable.children[i].children.length; j++) {
                            playTable.children[i].children[j].className = 'blue';
                        }
                    }
                }

                availableShips.textContent = JSON.parse(sessionStorage.getItem('secondPlayerShipsDisposition')).length;
                continueBtn.textContent = 'Go to the second player`s turn';
                turnName.textContent = 'First player`s turn';
                break;
        }
    };
}

function saveShipsDisposition() {
    let shipsDisposition = [];

    for (let i = 0; i < playTable.children.length; i++) {
        for (let j = 0; j < playTable.children[i].children.length; j++) {
            if (playTable.children[i].children[j].classList.contains('black')) {
                shipsDisposition.push(playTable.children[i].children[j].id);
            }
        }
    }

    return shipsDisposition;
}

function strikeShip() {
    let target = event.target;
    let player = turnName.textContent.split(' ')[0] === 'First' ? 1 : 0;
    let playerShips = JSON.parse(sessionStorage.getItem(`${player ? 'secondPlayerShipsDisposition' : 'firstPlayerShipsDisposition'}`));

    if (target.tagName === 'TD') {
        if (playerShips.includes(target.id)) {
            target.classList.remove('blue');
            target.classList.add('red');
            playerShips = playerShips.filter(e => e !== target.id);
            availableShips.textContent = playerShips.length;

            if (!playerShips.length) {
                setTimeout(() => showMessage(`${turnName.textContent.split(' ')[0]} player has wone! To play again reload the page.`), 0);
                continueBtn.disabled = true;
                sessionStorage.removeItem('firstPlayerShipsDisposition');
                sessionStorage.removeItem('secondPlayerShipsDisposition');
                sessionStorage.removeItem('firstPlayerBattleTable');
                sessionStorage.removeItem('secondPlayerBattleTable');
            }
            
            sessionStorage.setItem(`${player ? 'secondPlayerShipsDisposition' : 'firstPlayerShipsDisposition'}`, JSON.stringify(playerShips));
        } else {
            target.classList.remove('blue');
            target.classList.add('white');

            let playerBattleTable = {};

            for (let i = 0; i < playTable.children.length; i++) {
                for (let j = 0; j < playTable.children[i].children.length; j++) {
                    playerBattleTable[playTable.children[i].children[j].id] = playTable.children[i].children[j].className;
                }
            }

            sessionStorage.setItem(`${player ? 'secondPlayerBattleTable' : 'firstPlayerBattleTable'}`, JSON.stringify(playerBattleTable));

            playTable.onclick = showMessage;
        }
    }
};

function showMessage(text) {
    alert(`${typeof(text) === 'string' ? text : 'It isn`t your turn!'}`);
}