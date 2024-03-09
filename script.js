// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1CDafnyHTlR_u8znIA9NFRi7TCDRUdk4kOv6PUjxgLXI";

const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/1CDafnyHTlR_u8znIA9NFRi7TCDRUdk4kOv6PUjxgLXI/gviz/tq?tqx=out:json`;

function generateTable(data) {
    const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (r && r.length == 2) {
        const obj = JSON.parse(r[1]);
        const tabularData = obj.table;
        const rows = tabularData.rows.map(({c}) => c.map(e => e ? (e.v || "") : ""));
        console.log(rows);
        const divOutput = document.getElementById('divOutput');
        divOutput.innerHTML = '';
        let table = document.createElement('table');
        // Adding headers
        var headers = ['Sentence 1', 'Sentence 2'];
        var headerRow = table.insertRow();
        for (var i = 0; i < headers.length; i++) {
            var headerCell = document.createElement('th');
            headerCell.textContent = headers[i];
            headerRow.appendChild(headerCell);
        }

        // Adding rows
        for (var i = 0; i < rows.length; i++) {
            var row = table.insertRow();
            let element = rows[i];
            if (element.length < 2) {
                continue;
            }

            var cellOr = row.insertCell();
            cellOr.textContent = element[0].substring(1);
            if (cellOr.textContent.trim() === '') {
                cellOr.classList.add('empty-cell');
                cellOr.textContent = "No original text!";
            }

            var cellTr = row.insertCell();
            cellTr.textContent = element[1].substring(0, element[1].length - 1);
            if (cellTr.textContent.trim() === '') {
                cellTr.classList.add('empty-cell');
                cellTr.textContent = "No translation text!";
            }
        }
        document.getElementById('divOutput').appendChild(table);
    }
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: sheetURL, // URL of your proxy script
        success: function (data) {
            generateTable(data);
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.error("Error fetching data:", error);
        }
    });
});

		