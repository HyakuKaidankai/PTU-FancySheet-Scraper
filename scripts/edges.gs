function getEdges() {
    var spreadsheet = SpreadsheetApp.getActive();
    var sheet = spreadsheet.getSheetByName('Edges Data');
    
    var edgeTypes = [
        { "name": "Skill Edges",            "id": "skill",          "column": 2, "init_row": 3,  "num_rows": 8 },
        { "name": "Crafting Edges",         "id": "crafting",       "column": 2, "init_row": 12, "num_rows": 8 },
        { "name": "Pokémon Training Edges", "id": "pkmn_training",  "column": 2, "init_row": 21, "num_rows": 7 },
        { "name": "Combat Edges",           "id": "combat",         "column": 2, "init_row": 29, "num_rows": 23 },
        { "name": "Other Edges",            "id": "other",          "column": 2, "init_row": 53, "num_rows": 16 },
    ]
           
    var edges = {};
    
    for(let type of edgeTypes) {
        edges[type.id] = []    
        var edges_data          = sheet.getRange(type.init_row, 1, type.num_rows, 3);
        var edges_data_values   = edges_data.getValues();
        
        for (var row of edges_data_values) {
            let prereqs;
            let skillLevels = ["Pathetic", "Untrained", "Novice", "Adept", "Master", "Expert"];
            
            let prereq_text = row[1];
            prereq_text = prereq_text.replace("Pokémon Education", "Pokemon Education");
            
            let arr = prereq_text.split(" ");
            let len = arr.length;

            if(len == 2) {
                if( skillLevels.includes(arr[0]) ) {
                    prereqs = [ getSkill(arr[0], arr[1]) ];
                } else if(arr[0] == "Level") {
                    prereqs = [
                        {
                            "type": "level",
                            "level": Number(arr[1])
                        }
                    ]
                }
            } else if(len == 3 && skillLevels.includes(arr[0]) && arr[2] == "Education") {
                prereqs = [ getSkill(arr[0], arr[1] + " " + arr[2]) ]
            } else if(row[1] == "Elemental Connection (Psychic)") {
                prereqs = [{
                    "type": "edge",
                    "edge": "Elemental Connection",
                    "associated_types": [
                        "Psychic"
                    ]
                }]
            } else if((len == 4 && row[1].includes(" or ") ) || (len == 5 && row[1].includes(" or ") && arr[4] == "Education" ) ) {
                prereqs = [
                    getSkill(arr[0], (arr[1] == "Medicine" ? "Medicine Education" : arr[1])),
                    getSkill(arr[0], arr[3] + ( len == 5 ? " " + arr[4] : "" ) )
                ]
            } else if((len == 5 || len == 6) && row[1].includes(" or ") && skillLevels.includes(arr[0]) && skillLevels.includes(arr[3])) {
                prereqs = [
                    getSkill(arr[0], arr[1]),
                    getSkill(arr[3],  arr[4] + (len == 6 ? " " + arr[5] : "") )
                ]
            } else if(len == 6 && row[1].includes(" or ") && skillLevels.includes(arr[4])) {
                prereqs = [
                    getSkill(arr[0], arr[1] + " " + arr[2]),
                    getSkill(arr[4], arr[5])
                ]
            } else if(row[0] == "Weapon of Choice") {
                prereqs = [
                    {
                        "type": "feature",
                        "tag": "Weapon"
                    }
                ]
            } else if(row[1] == "-") {
                prereqs = [] 
            } else if(row[0] == "Grace") {
                prereqs = [
                    getSkill("Novice", "Charm"),
                    getSkill("Novice", "Command"),
                    getSkill("Novice", "Guile"),
                    getSkill("Novice", "Intimidate"),
                    getSkill("Novice", "Intuition")
                ]
            } else if(row[0] == "Poké Ball Repair") {
                prereqs = [
                    {
                        "type": "edge",
                        "edge": "Basic Balls"
                    },{
                        "type": "edge",
                        "skill": "Apricorn Balls"
                    }
                ]
            } else if(row[0] == "Skill Stunt") {
                prereqs = [
                    {
                        "level": "Novice",
                        "type": "skill",
                        "skill": "any"
                    }
                ]
            } else if(row[0] == "Virtuoso") {
                prereqs = [
                    {
                        "level": "Master",
                        "type": "skill",
                        "skill": "any"
                    }, {
                        "type": "level",
                        "level": 20
                    }
                ]
            } else { 
                prereqs = row[1]
            }      
            
            edges[type.id].push({
                "name": row[0],
                "prereq_text": row[1],
                "prereqs": prereqs,
                "effect": row[2],
            })
        }
    }
    var json_data = JSON.stringify(edges);
    displayText_(json_data);
}


function getSkill(level, skill) {
    return {
        "level": level,
        "type": "skill",
        "skill": skill
    }
}