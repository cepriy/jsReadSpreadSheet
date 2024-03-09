<?php
// Get the URL of the Google Sheets document
$url = 'https://docs.google.com/spreadsheets/d/1CDafnyHTlR_u8znIA9NFRi7TCDRUdk4kOv6PUjxgLXI/gviz/tq?tqx=out:csv&sheet=Sheet1';

// Fetch the data from Google Sheets
$data = file_get_contents($url);

// Set the appropriate Content-Type header
header('Content-Type: text/csv');

// Output the fetched data
echo $data;
?>