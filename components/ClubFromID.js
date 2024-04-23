const clubList = {
    "1W": "Driver",
    "3W": "3 Wood",
    "5W": "5 Wood",
    "7W": "7 Wood",
    "9W": "9 Wood",
    "1I": "1 Iron",
    "2I": "2 Iron",
    "3I": "3 Iron",
    "4I": "4 Iron",
    "5I": "5 Iron",
    "6I": "6 Iron",
    "7I": "7 Iron",
    "8I": "8 Iron",
    "9I": "9 Iron",
    "48": "48° Wedge",
    "52": "52° Wedge",
    "54": "54° Wedge",
    "56": "56° Wedge",
    "58": "58° Wedge",
    "60": "60° Wedge",
  };
  
export function clubFromID(data){  
    return([clubList[data]]);
};