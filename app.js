
// NOTE successful
// for ( let a = 1; a < table.rows.length - 1; a++) { console.log(table.rows[a])
// }


// NOTE - successful for console.logging <td> (cell) elements;
// for ( let a = 1; a < table.rows.length - 1; a++) { 
//     for (let b = 0; b < table.rows[a].cells.length; b++) {
//         console.log(table.rows[a].cells[b])
//     }
// }
let count = 10;
$(document).on('click', "#start-btn", generateTable);

function generateTable() {
    let table = $('<table class="game-table"></table>');
    let tableBody = $("<tbody></tbody>");
    for (let a = 0; a < count; a++) {
        const row = $(`<tr class="row-${a}"></tr>`);
        for (let b = 0; b < count; b++) {
            const cell = $(`<td class="game-square cell-${b}"></td>`);
            chooseColor(cell);
            $(row).append(cell);
        }
        $(tableBody).append(row);
    }
    $(table).append(tableBody);
    $('#table-container').append(table);
}

function chooseColor(square) {
    const num = Math.floor(Math.random() * (3 - 1 + 1)+ 1);
    if (num === 1) {
        $(square).css('background-color', '#F2637E');
    } else if (num === 2) {
        $(square).css('background-color', '#F20CCC');
    } else {
        $(square).css('background-color', '#0D76D9');
    }
}


// SECTION - Playground:

$(document).on('click', 'td', assignEvent);

function assignEvent(event) {
    let cell = $(event.target);
    checkFour(cell);
}

function checkFour(element) {
    $(element).addClass("away");

    if (iterate(element, 'next') && colorMatch(element, iterate(element, 'next'))) {
        // console.log('There is a next sibling.');
        checkFour(iterate(element, 'next'));
    } else {
        // console.log('No next sibling');
    }

    if (iterate(element, 'prev') && colorMatch(element, iterate(element, 'prev'))) {
        // console.log('There is a previous sibling.');
        checkFour(iterate(element, 'prev'));
    } else {
        // console.log('No previous sibling.');
    }

}

function iterate(element, sibType) {
    const table = document.querySelector('.game-table');

    const rowNum = parseInt($(element).parent().attr("class").split("").splice(-1, 1).join(""));
    const cellNum = parseInt($(element).attr("class").split("").splice(-6, 1).join(""));
    // console.log(cellNum);

    if (sibType === 'next') {
        if (cellNum < count - 1) {
            for (let a = rowNum; a < rowNum + 1; a++) {
                for (let b = cellNum; b < cellNum + 1; b++) {
                    if (!hasAwayClass(table.rows[a].cells[b + 1])) {
                        return table.rows[a].cells[b + 1];
                    } else {
                        return false
                    }
                }
            }
        } else {
            return false;
        }
    }

    if (sibType === 'prev') {
        if (cellNum > 0) {
            for (let a = rowNum; a < rowNum + 1; a++) {
                for (let b = cellNum; b > cellNum - 1; b--) {
                    if (!hasAwayClass(table.rows[a].cells[b - 1])) {
                        return table.rows[a].cells[b - 1];
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    }

}

function colorMatch(firstElem, secondElem) {
    let firstElemRgb = $(firstElem).css('background-color');
    let firstElemColor = firstElemRgb.substring(4, firstElemRgb.length - 1).split(" ");
    let secondElemRgb = $(secondElem).css('background-color');
    let secondElemColor = secondElemRgb.substring(4, secondElemRgb.length - 1).split(" ")
    if (firstElemColor[2] === secondElemColor[2]) {
        return true;
    } else {
        return false;
    }
}

function hasAwayClass(element) {
    if ($(element).hasClass("away")) {
        return true;
    } else {
        return false;
    }
}