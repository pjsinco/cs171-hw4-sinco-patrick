console.log('yhia');

var names = ["Kimbra","Elina","Brad","Johnathon","Archie","Elfriede","Melina","Jerrod","Elizabeth"];
var aggregateMap = {};

names.forEach(function(d) {
  var firstLetter = d.substr(0, 1);
  var secondLetter = d[1];

  var nameList = aggregateMap[firstLetter];
  console.log(nameList);

  if (nameList == undefined) {
    nameList = [];
    nameList.push(d);
    aggregateMap[firstLetter] = nameList;
  }

})

  //console.log(aggregateMap);


