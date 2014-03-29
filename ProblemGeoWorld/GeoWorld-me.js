var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var width = 960 - margin.left - margin.right;
var height = 960 - margin.top - margin.bottom;
var padding = 30;
var dataset = {};

// set up main svg
var svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom);

var g = svg
  .append('g')
  .attr('transform', 'translate(' + margin.left + ','
    + margin.top + ')');

// from d3 book
var color = d3.scale.quantize()
  .range(['rgb(237,248,233)','rgb(186,228,179)','rgb(116,196,118)',
    'rgb(49,163,84)','rgb(0,109,44)']);
  
// define map projection
var projection = d3.geo.mercator()
  .translate([width / 2, height / 2])
  .scale([155]);

var path = d3.geo.path()
  .projection(projection);

var color = d3.scale.quantize()
  .range(['rgb(237,248,233)','rgb(186,228,179)','rgb(116,196,118)',
    'rgb(49,163,84)','rgb(0,109,44)']);

d3.json('../data/world_topo.json', function(error, data) {
  data.objects.world_data.geometries.forEach(function(d) {
    //console.log(d.id); // grab the country id
  });

  function getData(response) {
    console.log(response);
  }

  $.ajax({
    //url: 'http://api.worldbank.org/countries/br/indicators/NY.GDP.MKTP.CD?date=2006',
    url: 'http://api.worldbank.org/countries?format=jsonP&prefix=Getdata&per_page=500&date=2006',
      //'http://api.worldbank.org/countries/indicators/NY.GDP.MKTP?format=jsonP&prefix=Getdata&per_page=500&date=2006',
      //'http://api.worldbank.org/countries?format=jsonP&prefix=Getdata',
    //type: 'GET',
    jsonpCallback: 'getdata',
    dataType: 'jsonp',
    success: function(data, textStatus, request) {
      console.log(data);
    }
  }) 
  
  var world = topojson.feature(data, data.objects.world_data);
  
  g
    .selectAll('.country')
    .data(world.features)
    .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)

}); // end d3.json();
