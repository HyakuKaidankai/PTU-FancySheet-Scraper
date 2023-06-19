function getMoves() {
  var ss = SpreadsheetApp.getActive();
  var s = ss.getSheetByName('Moves Data');
  var moves = [];

  moves_data = s.getRange(3, 1, 853, 12);
  var moves_data_values   = moves_data.getValues();
  for (var row of moves_data_values) {
    if(row[0].trim().toLowerCase() != "name") {
      Logger.log(row);
      moves.push({
        "name": row[0],
        "db": row[4],
        "ac": row[5],
        "range": row[6],
        "effect": row[7],
        "contest": row[8],
        "category": row[9],
        "type": row[10]
      })
    } 
  } 
  var json_data = JSON.stringify(moves);
  displayText_(json_data);
}