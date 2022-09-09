
// SECTION - Global Variables:
const btn = $('#start-btn');

// SECTION - Game Object:
let game = {
    count: 12,
    score: 0,
    round: 1,
    time: 0,
    timer: 30,
    matchingGameSquares: [],
    startGame() {
        game.updateRound();
        game.setTimer();
    } ,
    generateTable() {
        let table = $('<table class="game-table"></table>');
        let tableBody = $("<tbody></tbody>");
        for (let a = 0; a < game.count; a++) {
            const row = $(`<tr id="${a}"></tr>`);
            for (let b = 0; b < game.count; b++) {
                const cell = $(`<td id="${b}" class="game-square"></td>`);
                game.chooseColor(cell);
                $(row).append(cell);
            }
            $(tableBody).append(row);
        }
        $(table).append(tableBody);
        $('#table-container').append(table);
    },
    chooseColor(square) {
        const num = Math.floor(Math.random() * (3 - 1 + 1)+ 1);
        if (num === 1) {
            $(square).css('background-color', '#032940');
        } else if (num === 2) {
            $(square).css('background-color', '#025C53');
        } else {
            $(square).css('background-color', '#A0C130');
        }
    },
    updateRound() {
        $('#round-span').html(game.round);
        $('#start-btn').detach();
        
        if (game.round === 1) { 
            game.timer = 35;
            game.time = game.timer;
        } else {
            game.timer = game.timer - 2;
            game.time = game.timer;
        }
    },
    setTimer() {
        const timer = setInterval(() => {
            game.time--;
            $('#time-span').html(game.time);
            console.log(game.time);

            if (game.time === 0) {
                clearInterval(timer);
                if (game.isTableEmpty()) {
                    game.round++;
                    alert('Next round. Ready?');
                    $('#table-container').empty();
                    game.generateTable();
                    game.startGame();
                } else {
                    alert('Game OVER!');z
                    game.gameOver();
                }
            }
        }, 1000)
    },
    updateScore() {
        if (game.matchingGameSquares.length > 1) {
            game.score = (game.matchingGameSquares.length * 2) + game.score;
        } else {
            game.score++
        }
        $('#score-span').html(game.score);
        game.matchingGameSquares = [];
    },
    isTableEmpty() {
        const table = document.querySelector('.game-table');
        const noAwayClassSquares = [];

        for (let a = 0, row; row = table.rows[a]; a++) {
            for (let b = 0, col; col = row.cells[b]; b++) {
                if (!game.hasAwayClass(row.cells[b])) {
                    noAwayClassSquares.push(row.cells[b]);
                }
            }
        }
        if (noAwayClassSquares.length === 0) {
            return true;
        } else {
            return false;
        }
    },
    handleClick(event) {
        let cell = $(event.target);
        game.checkFour(cell);
        game.updateScore();
    },
    checkFour(element) {
        $(element).addClass("away");
        game.matchingGameSquares.push(element);    
    
        if (game.getSib(element, 'next') && game.colorMatch(element, game.getSib(element, 'next'))) {
            // console.log('There is a next sibling.');
            game.checkFour(game.getSib(element, 'next'));
        }
    
        if (game.getSib(element, 'prev') && game.colorMatch(element, game.getSib(element, 'prev'))) {
            // console.log('There is a previous sibling.');
            game.checkFour(game.getSib(element, 'prev'));
        }
    
        if (game.getSib(element, 'top') && game.colorMatch(element, game.getSib(element, 'top'))) {
            // console.log('Top has sibling.')
            game.checkFour(game.getSib(element, 'top'));
            // checkFour(getSib(element, 'top'))
        }
    
        if (game.getSib(element, 'bottom') && game.colorMatch(element, game.getSib(element, 'bottom'))) {
            game.checkFour(game.getSib(element, 'bottom'));
        }
        return
    },
    scoreUpdate() {
        console.log('========== SCORE UPDATE ==========');
        console.log(game.matchingGameSquares.length);
        if (game.matchingGameSquares.length > 1) {
            game.score = (game.matchingGameSquares.length * 2) + game.score;
        } else {
            game.score++;
        }
    },
    colorMatch(firstElem, secondElem) {
        let firstElemRgb = $(firstElem).css('background-color');
        let firstElemColor = firstElemRgb.substring(4, firstElemRgb.length - 1).split(" ");
        let secondElemRgb = $(secondElem).css('background-color');
        let secondElemColor = secondElemRgb.substring(4, secondElemRgb.length - 1).split(" ")
        if (firstElemColor[2] === secondElemColor[2]) {
            return true;
        } else {
            return false;
        }
    },
    getSib(element, sibType) {
        const table = document.querySelector('.game-table');

        const rowNum = parseInt($(element).parent().attr("id"));
        const cellNum = parseInt( $(element).attr("id"));
    
        if (sibType === 'next') {
            if (cellNum < game.count - 1) {
                if (!game.hasAwayClass(table.rows[rowNum].cells[cellNum + 1])) {
                    return table.rows[rowNum].cells[cellNum + 1];
                } else {
                    return false;
                }
            }
        }
    
        if (sibType === 'prev') {
            if (cellNum > 0) {
                if (!game.hasAwayClass(table.rows[rowNum].cells[cellNum - 1])) {
                    return table.rows[rowNum].cells[cellNum - 1];
                } else {
                    return false;
                }
            }
        }
    
        if (sibType === 'top') {
            if (rowNum > 0) {
                if (!game.hasAwayClass(table.rows[rowNum - 1].cells[cellNum])) {
                    return table.rows[rowNum - 1].cells[cellNum];
                } else {
                    return false
                }
            }
        }
    
        if (sibType === 'bottom') {
            if (rowNum < game.count - 1) {
                if (!game.hasAwayClass(table.rows[rowNum + 1].cells[cellNum])) {
                    return table.rows[rowNum + 1].cells[cellNum];
                } else {
                    return false;
                }
            }
        }
    
    },
    hasAwayClass(element) {
        if ($(element).hasClass("away")) {
            return true;
        } else {
            return false;
        }
    },
    gameOver() {
        $('#table-container').empty();
        game.score = 0;
        game.round = 1;
        game.time = 0;
        $('#score-span').html(game.score);
        $('#round-span').html(game.round);
        $('#time-span').html(game.time);
        console.log('BUTTON');
        $(btn).appendTo('#banner');
    },
}

// SECTION - Click Events:
$(document).on('click', '#start-btn', game.generateTable);
$(document).on('click', '#start-btn', game.startGame)
$(document).on('click', 'td', game.handleClick);

