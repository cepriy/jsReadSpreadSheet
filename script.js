// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1CDafnyHTlR_u8znIA9NFRi7TCDRUdk4kOv6PUjxgLXI";
// sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
 function generateTable(data) {
        const tableContainer = document.getElementById("divOutput");
        const table = document.createElement("table");

        data.forEach(rowData => {
            const row = document.createElement("tr");

            rowData.forEach(cellData => {
                const cell = document.createElement("td");
                cell.textContent = cellData;
                row.appendChild(cell);
            });

            table.appendChild(row);
        });

        tableContainer.appendChild(table);
    }


function processData(data){
	console.log("Data retrieved", data);
	document.getElementById("divOutput").innerHTML = data;

}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "proxy.php", // URL of your proxy script
        success: function(data) {
            // Data received successfully, you can process it here
       			 generateTable(data);
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.error("Error fetching data:", error);
        }
    });
});

