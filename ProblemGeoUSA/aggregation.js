d3.json('../data/allData2003_2004.json', function(error, data) {
//d3.json('../data/allData-sample-2.json', function(error, data) {
  var timeParser = d3.time.format("%b %-d, %Y %X %p");

  //var timeParser = d3.time.format("%b %-d, %Y %H:%-M:%S %p");

  var stations = {}
  
  for (var s in data) {
    var station = {
        sum: 0,
        hourly: {
          '01:00:00': 0,
          '02:00:00': 0,
          '03:00:00': 0,
          '04:00:00': 0,
          '05:00:00': 0,
          '06:00:00': 0,
          '07:00:00': 0,
          '08:00:00': 0,
          '09:00:00': 0,
          '10:00:00': 0,
          '11:00:00': 0,
          '12:00:00': 0,
          '13:00:00': 0,
          '14:00:00': 0,
          '15:00:00': 0,
          '16:00:00': 0,
          '17:00:00': 0,
          '18:00:00': 0,
          '19:00:00': 0,
          '20:00:00': 0,
          '21:00:00': 0,
          '22:00:00': 0,
          '23:00:00': 0,
          '00:00:00': 0
        }
    } 
    var sum = 0;
    data[s].forEach(function(d) {
      sum += parseFloat(d['value']);
    })
    station['sum'] = sum;
    stations[s] = station;
  }
  console.log(stations);
}); // end d3.json() -- alldata
