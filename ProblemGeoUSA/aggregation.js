d3.json('../data/allData2003_2004.json', function(error, data) {
  var timeParser = d3.time.format("%b %-d, %Y %X %p");

  //var timeParser = d3.time.format("%b %-d, %Y %H:%-M:%S %p");

  var stations = d3.keys(data)
  
  // for each station ...
  for (var station in data) {
    var monthSum;
    //console.log(data[station][0]);
    // for each dataset in the station ...
    data[station].forEach(function(d) {
      console.log(timeParser.parse(d.date).getTime(), parseFloat(d.value));
      //var month = timeParser.parse(d.date).getMonth();
      //while (timeParser.parse(d.date).getMonth() === month) {
        //monthSum += parseFloat(d.value);
      //}
      //monthSum[station][month] = monthSum;
    });
    //console.log(monthSum);
  }

}); // end d3.json() -- alldata
