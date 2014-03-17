d3.json('../data/allData2003_2004.json', function(error, data) {

  //console.log(d3.keys(data));

  var keys = d3.keys(data);
  var allDates = [];
  //var timeParser = d3.time.format('%H:%M:%S %p');
  var timeParser = d3.time.format("%b %-d, %Y %H:%-M:%S %p");
  var stationData = [];
  
  // get all the dates in play
  data[keys[0]].forEach(function(d) {
    allDates.push(timeParser.parse(d.date));
  });

  
  
  
  
  //console.log(allDates);
  console.log(allDates[0].getMonth());
  //console.log(allDates.length);
}); // end d3.json() -- alldata

//var ex = 
//[
//  '690150': 
//  {
//    'sum': 11916800,
//    'hourly': 
//     { 
//        '01:00:00 AM': 0,
//        '02:00:00 AM': 0, 
//        '03:00:00 AM': 0,
//        '04:00:00 AM': 0,
//        '05:00:00 AM': 0,
//        '06:00:00 AM': 2,
//        '07:00:00 AM': 5,
//     } 
//  },
//]

  
