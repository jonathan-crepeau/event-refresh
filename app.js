
// NOTE successful
// for ( let a = 1; a < table.rows.length - 1; a++) { console.log(table.rows[a])
// }


// NOTE - successful for console.logging <td> (cell) elements;
// for ( let a = 1; a < table.rows.length - 1; a++) { 
//     for (let b = 0; b < table.rows[a].cells.length; b++) {
//         console.log(table.rows[a].cells[b])
//     }
// }

$(document).on('click', "#start-btn", generateTable);

function generateTable() {
    let table = $('<table class="game-table"></table>');
    let tableBody = $("<tbody></tbody>");
    for (let a = 0; a < 10; a++) {
        const row = $(`<tr class="row-${a}"></tr>`);
        for (let b = 0; b < 10; b++) {
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
        $(square).css('background-color', 'red');
    } else if (num === 2) {
        $(square).css('background-color', 'blue');
    } else {
        $(square).css('background-color', 'green');
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

    // if (iterate(element, 'next')) {
    //     console.log('There is a next sibling.')
    //     // let result = iterate(element, 'next');
    //     // console.log(result);
    //     checkFour(iterate(element, 'next'));
    // } else {
    //     console.log('No next sibling');
    // }

    if (iterate(element, 'prev')) {
        console.log('There is a previous sibling.');
        let result = iterate(element, 'prev');
        console.log(result);
    } else {
        console.log('No previous sibilng.');
    }

}

function iterate(element, sibType) {
    const table = document.querySelector('#this-table');

    const rowNum = parseInt($(element).parent().attr("class").split("").splice(-1, 1).join(""));
    // console.log(rowNum);

    const cellNum = parseInt($(element).attr("class").split("").splice(-6, 1).join(""));
    // console.log(cellNum);

    // SECTION - Next Sibling:
    // NOTE - Success, iterate just through current row that <td> click event lives in.
    // for (let a = rowNum; a < rowNum + 1; a++) {
    // console.log(table.rows[a]);
    // }

    if (sibType === 'next') {
        if (cellNum < 2) {
            for (let a = rowNum; a < rowNum + 1; a++) {
                for (let b = cellNum; b < cellNum + 1; b++) {
                    return table.rows[a].cells[b + 1];
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
                    return table.rows[a].cells[b - 1];
                }
            }
        } else {
            return false;
        }
    }

}

