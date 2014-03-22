var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
}

var width = 960 - margin.right - margin.left;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .attr('transform', 'translate(' + margin.left + ',' 
    + margin.right + ')')

var projection = d3.geo.albersUsa()
  .scale(900)
  .translate([width / 2, height / 2]);

var path = d3.geo.path()
  .projection(projection)

var tip = d3.tip()
  

svg
  .append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height)

var g = svg.append('g')
  .attr('class', 'country')

d3.json('../data/us-named.json', function(error, data) {
  
  // convert topojson to geojson
  var usMap 
    = topojson.feature(data, data['objects']['states']).features;

  g
    .selectAll('.state')
    .data(usMap)
    .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
  

})
