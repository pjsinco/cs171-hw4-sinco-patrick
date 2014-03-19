d3.json('../data/allData2003_2004.json', function(error, data) {
  //var timeParser = d3.time.format("%b %-d, %Y %X %p");
  //var timeParser = d3.time.format("%b %-d, %Y %H:%-M:%S %p");

  var stations = {};

  for (var s in data) {

    var station = {
        sum: 0,
        hourly: []
    };

    //initialize hourly with 0's
    var hourly = [];
    for (var i = 0; i < 24; i++) { 
      hourly[i] = 0; 
    };

    var sum = 0;
    station['sum'] = sum;

    // for every date-value pair in the station...
    data[s].forEach(function(d, i) {
      var val = parseFloat(d['value']);
      hourly[i % 24] += val;
      station['sum'] += val;
      station['hourly'] = hourly;
    });

    // add the new station to the stations objects
    stations[s] = station;

  }; // end for()

}); // end d3.json() -- alldata
