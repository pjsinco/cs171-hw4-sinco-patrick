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

var bbVis = {
  x: 100,
  y: 10,
  w: width - 100,
  h: 300
}

var detailVis = d3.select('#detailVis').append('svg')
  .attr('width', 350)
  .attr('height', 200)

var svg = d3.select('#vis').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .on('click', clicked)

//svg
  //.append('rect')
  //.attr('class', 'background')
  //.attr('width', width)
  //.attr('height', height)
  //.style('fill', 'none')
  //.on('clicked', clicked);

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
var completeDataSet = [];

d3.json('../data/us-named.json', function(error, data) {
  //console.log(data);

  // convert topojson to geojson
  var usMap = topojson.feature(data, data.objects.states);
  //console.log(usMap);

  g
    .selectAll('.state')
    .data(usMap.features)
    .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
      .on('click', clicked)

  // needed? 
//  g
//    .append('path')
//    .datum(topojson.mesh(data, data.objects.states, function(a, b) {
//      return a !== b;
//    }));
  
  //loadStats();

}); // end d3.json -- us-named

function clicked(d) {
  console.log(this);
  console.log(d);
  console.log(d.properties.name);
  console.log(d3.geo.centroid(d));
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

  console.log(x, y);
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

//  svg
//    .select('.country')
//    .append('circle')
//    .attr('cx', function (d) {
//      return path(d3.geo.centroid(d)[0]);
//    })
//    .attr('cy', function (d) {
//      return path(d3.geo.centroid(d)[1]);
//    })
//    .style('fill', 'gold')
}

function loadStations() {
  d3.csv('../data/NSRCB_StationsMeta.csv', function(error, data) {

    // ..

  }); // end d3.csv() -- stationsmeta
} // end loadStations()
    
function loadStats() {
  d3.json('../data/reduceMonthStationHour2003_2004.json',
    function(error, data) {

    completeDataset = data;
    
    // ..
    
    loadStations();

  }); // end d3.json()
} // end loadStats()
  
function zoomIn(d) {
  console.log(d.properties.name);
}

function zoomOut() {

}
