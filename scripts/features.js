function getFeatures() {
    var spreadsheet = SpreadsheetApp.getActive();
    var sheet = spreadsheet.getSheetByName('Features Data');
  
    var generalFeatureTypes = [
      { "name": "Pokemon raising and battling features", "id": "raising_battling", "init_row": 4,  "num_rows": 5 },
      { "name": "Pokemon training and order features", "id": "training_order", "init_row": 10,  "num_rows": 21 },
      { "name": "Combat features", "id": "combat", "init_row": 32,  "num_rows": 8 },
      { "name": "Other features", "id": "other", "init_row": 41,  "num_rows": 8 },
    ]
  
    var features = {
      "general":{},
      "trainer":{},
    };
  
    // General features
    for(let type of generalFeatureTypes) {
      var data = sheet.getRange(type.init_row, 1, type.num_rows, 5);
      var data_values = data.getValues();
      for(let row of data_values) {
        if(row[0].trim().length > 0){
          if(!features.general[type.id]) {
            Logger.log(type.id);
            features.general[type.id] = [];
          }
  
          features.general[type.id].push({
            "name": row[0],
            "tags": row[1],
            "prereqs_text": row[2],
            "frequency": row[3],
            "effects": row[4]
          });
          Logger.log(features.general);
        }    
      }
    }
  
    Logger.log(features);
  
    // Trainer features
    var data = sheet.getRange(50, 1, 423, 5);
    var data_values = data.getValues();
  
    var aux_class = "";
  
    for(let row of data_values) {
      if(row[1].includes("[Class]")) {
        aux_class = row[0];
      }
      if(!features.trainer[aux_class]) {
        features.trainer[aux_class] = [];
      }
      features.trainer[aux_class].push({
        "name": row[0],
        "tags": row[1],
        "prereqs_text": row[2],
        "frequency": row[3],
        "effects": row[4]
      });
    }
  
    var json_data = JSON.stringify(features);
    displayText_(json_data);
  }
  