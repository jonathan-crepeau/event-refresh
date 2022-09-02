const table = document.querySelector('#this-table');

// console.log(table.rows.length);

// NOTE successful
// for ( let a = 1; a < table.rows.length - 1; a++) { console.log(table.rows[a])
// }


// NOTE - successful for console.logging <td> (cell) elements;
// for ( let a = 1; a < table.rows.length - 1; a++) { 
//     for (let b = 0; b < table.rows[a].cells.length; b++) {
//         console.log(table.rows[a].cells[b])
//     }
// }

// SECTION - Playground:

$(document).on('click', 'td', assignEvent);

function assignEvent(event) {
    let cell = $(event.target);
    checkFour(cell);
}

function checkFour(element) {
    $(element).addClass("away");

    if (iterate(element, 'next')) {
        console.log('There is a next sibling.')
        // let result = iterate(element, 'next');
        // console.log(result);
        checkFour(iterate(element, 'next'));
    } else {
        console.log('No next sibling');
    }
}

function iterate(element, sibType) {

    const rowNum = parseInt($(element).parent().attr("class").split("").splice(-1, 1).join(""));
    // console.log(rowNum);

    const cellNum = parseInt($(element).attr("class").split("").splice(-6, 1).join(""));
    console.log(cellNum);

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

    // if (sibType === 'prev') {
    //     if (cellNum > 0 ) { 
    //         for (let a = rowNum; a < rowNum + 1; a++) {
    //             for (let b = cellNum; b > cellNum - 1; b--) {}
    //         }
    //     }
    // }

}

