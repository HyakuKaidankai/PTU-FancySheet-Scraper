// Configures the menu in the spreadsheeet UI. This needs to be done this way as the JSON outputs are too big to print via the Logger API
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  var menuEntries = [
    {name: "Export Edges",      functionName: "getEdges"},
    {name: "Export Moves",      functionName: "getMoves"},
    {name: "Export Types",      functionName: "getTypeChart"},
    {name: "Export Functions",  functionName: "getFeatures"},
  ];
  
  spreadsheet.addMenu("Export JSONs", menuEntries);
}

// Displays the text input in the spreadsheet UI, as a modal
function displayText_(text) {
  var output = HtmlService.createHtmlOutput("<div style='width:100%;' rows='20'>" + text + "</div>");
  output.setWidth(700)
  output.setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(output, 'Exported JSON');
}
