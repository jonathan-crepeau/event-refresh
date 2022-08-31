$('[type="button"]').on('click', generateTable);

function generateTable() {
    const table = $('<table class="game-table"></table>');
    const tableBody = $('<tbody></tbody>')
    for (let a = 0; a < 4; a++) {
        const row = $('<tr class="row-' + a +'"></<tr>');
        for (let b = 0; b < 4; b++) {
            const cell = $('<td class="game-square cell-' + b + '"></td>');
            chooseColor(cell);
            // const cellText = document.createTextNode('cell in row ${a}, column ${b}');
            // $(cell).append(cellText);
            $(row).append(cell);
        }
        $(tableBody).append(row);
    }
    $(table).append(tableBody);
    $('.table-container').append(table)
    $(table).css('border')
}

function chooseColor(cell) {
    const num = Math.floor(Math.random() * (3 - 1 + 1)+ 1);
    if (num === 1) {
        $(cell).css('background-color', '#BF1765');
    } else if (num === 2) {
        $(cell).css('background-color', '#EDB428');
    } else {
        $(cell).css('background-color', '#0B2A81');
    }
}


// SECTION - Event Listener "Playground":

$(document).on('click', 'td', checkClick);

function checkClick(event) {
    const square = event.target;
    // console.log($(square));
    // console.log( $(square).next() );
    checkSiblings(square)
}

function colorMatch(element) {
    const targetLastRgb = $(element).css('background-color').substring(4, 'background-color'.length - 1).split(" ");
    console.log(targetLastRgb);
}

function checkSiblings(element) {
    colorMatch(element);
}