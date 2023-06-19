// This parse the types defensive relationship
function getTypeChart() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName('Nature/Type Data');
  var typeChart = [];

  types_data = sheet.getRange(39, 1, 19, 18);
  var vals   = types_data.getValues();
  for (var row in vals) {
    type = {
      "name": vals[row][0],
      "hit_by": {
        "Normal": vals[row][1],
        "Fighting": vals[row][2],
        "Flying": vals[row][3],
        "Poison": vals[row][4],
        "Ground": vals[row][5],
        "Rock": vals[row][6],
        "Bug": vals[row][7],
        "Ghost": vals[row][8],
        "Steel": vals[row][9],
        "Fire": vals[row][10],
        "Water": vals[row][11],
        "Grass": vals[row][12],
        "Electric": vals[row][13],
        "Psychic": vals[row][14],
        "Ice": vals[row][15],
        "Dragon": vals[row][16],
        "Dark": vals[row][17],
        "Fairy": vals[row][18],
      }  
    }
    typeChart.push(type); 
  } 
  var json_data = JSON.stringify(typeChart);
  displayText_(json_data);
}