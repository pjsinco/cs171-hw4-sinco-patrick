// d3 margin convention
var margin = {
  top: 50,
  left: 50,
  bottom: 50,
  right: 50,
}

var width = 1060 - margin.left - margin.right; // 960
var height = 800 - margin.top - margin.bottom; // 700
var centered;

var formatVal = d3.format('s');

var bbVis = {
  x: 100,
  y: 10,
  w: width - 100, h: 300
}

var detailVis = d3.select('#detailVis').append('svg')
  .attr('width', 350)
  .attr('height', 200)


var svg = d3.select('#vis').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  //.on('click', clicked)

var g = svg.append('g')
  .attr('class', 'country')
  .attr('transform', 'translate(' + margin.left + ','
    + margin.right + ')')
  
var projection = d3.geo.albersUsa()
  .translate([width / 2, height / 2])
  .precision(0.1)

var path = d3.geo.path()
  .projection(projection)

var dataset = [];
var completeDataset = [];

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    var station = d['USAF'];
    var sum = completeDataset[station] !== undefined ?
      completeDataset[d['USAF']]['sum'] : 'No data';
    //return '<span>' + d['STATION'] + '</span><br>'
    return '<span>' + d['STATION'] + '</span><br>'
      + '<span style=\'color: black;\'>' 
      + (isNaN(sum) ? sum : formatVal(sum)) + '</span>';
  });

svg
  .call(tip);

d3.json('../data/us-named.json', function(error, data) {

  // convert topojson to geojson
  var usMap = topojson.feature(data, data.objects.states);

  g
    .selectAll('.state')
    .data(usMap.features)
    .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
      .on('click', clicked)
      //.on('mouseover', tip.show)
      //.on('mouseout', tip.hide)

  // needed? 
//  g
//    .append('path')
//    .datum(topojson.mesh(data, data.objects.states, function(a, b) {
//      return a !== b;
//    }));
  
  loadStats();
}); // end d3.json -- us-named


function clicked(d) {
  var x, y, k;
  
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  //console.log(x, y);
  g
    .selectAll('path')
    .classed('active', centered && function(d) {
      return d === centered;
    })

  g
    .transition()
    .duration(750)
    .attr('transform', 'translate(' + (width / 2) + ','
      + (height / 2) + ')scale(' + k + ')translate('
      + -x + ',' + -y + ')')
    .style('stroke-width', 1.5 / k + 'px')

}

function loadStations() {
  d3.csv('../data/NSRDB_StationsMeta.csv', function(error, data) {
  //console.log(data);


// for calcuating a good radius
//  var sums = [];
//  for (var s in completeDataset) {
//    sums.push(completeDataset[s].sum)
//  }
//  var max = d3.max(sums);
//  var min = d3.min(sums);
//  console.log(min, max);

  g
    .selectAll('.station')
    .data(data)
    .enter()
      .append('circle')
      .attr('class', 'station')
      .attr('cx', function(d) {
        var x = projection(
          [
            parseFloat(d['NSRDB_LON(dd)']),
            parseFloat(d['NSRDB_LAT (dd)'])
          ]
        );
        // make sure we have an array before returning part of it
        if (x) return x[0]; 
      })
      .attr('cy', function(d) {
        var y = projection(
          [
            parseFloat(d['NSRDB_LON(dd)']),
            parseFloat(d['NSRDB_LAT (dd)'])
          ]
        );
        // make sure we have an array before returning part of it
        if (y) return y[1];
      })
      .attr('r', function(d) {
        var usaf = d['USAF'];
        if (completeDataset[usaf]) {
          return completeDataset[usaf].sum / 10000000;
        } else {
          return 2;
        }
      })
      .style('fill', function(d) {
        var usaf = d['USAF'];
        if (!completeDataset[usaf]) {
          return '#aaa';
        }
      })
      .style('stroke', function(d) {
        var usaf = d['USAF'];
        if (!completeDataset[usaf]) {
          return '#aaa';
        }
      })
      .on('mouseover', function(d) {
          tip.show(d)
      })
      .on('mouseout', tip.hide)

    //console.log(completeDataset['690150'].sum);

  }); // end d3.csv() -- stationsmeta
} // end loadStations()
    
function loadStats() {
  d3.json('../data/reduceMonthStationHour2003_2004.json',
    function(error, data) {

    completeDataset = data;
    
    loadStations();

  }); // end d3.json()
} // end loadStats()
  
function zoomIn(d) {
  console.log(d.properties.name);
}

function zoomOut() {

}
