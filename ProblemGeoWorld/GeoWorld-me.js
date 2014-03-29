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

d3.json('../data/wikipedia-iso-country-codes.json', function(iso) {
  //console.log(iso);

  d3.json('../data/world_topo.json', function(worldMap) {

    var world = topojson.feature(worldMap, worldMap.objects.world_data);
  
    // add full country names to world
    for (var i = 0; i < iso.length; i++) {
      var iso3Id = iso[i]['Alpha-3 code'];
      var iso2Id = iso[i]['Alpha-2 code'];
      var isoFullName = iso[i]['English short name lower case'];
      for (var k = 0; k < world.features.length; k++) {
        var worldId = world.features[k].id;
        
        if (iso3Id == worldId) {
          world.features[k].full_name = isoFullName;
          break;
        } // end if()
      } // end for()
    }; // end for()
    
    $.ajax({
      //url: 'http://api.worldbank.org/countries/indicators/NY.GDP.MKTP.CD?date=2006',
      //url: 'http://api.worldbank.org/countries?format=jsonP&prefix=Getdata&per_page=500&date=2006',
      url: "http://api.worldbank.org/countries/all/indicators/EN.FSH.THRD.NO?format=jsonP&prefix=Getdata&per_page=500&date=2006",
      //url: 'http://api.worldbank.org/countries/indicators/NY.GDP.MKTP?format=jsonP&prefix=Getdata&per_page=500&date=2006',
        //'http://api.worldbank.org/countries?format=jsonP&prefix=Getdata',
      //type: 'GET',
      jsonpCallback: 'getdata',
      dataType: 'jsonp',
      success: function(data, textStatus, request) {
        console.log(data);
      }
    }) 
  
    g
      .selectAll('.country')
      .data(world.features)
      .enter()
        .append('path')
        //.classed('country', true)
        .attr('class', function(d) {
          return 'country ' + d.id; 
        })
        .attr('title', function(d) {
          return d.full_name; 
        })
        .attr('d', path)
        .style('fill', function(d) {
          //console.log(d);
        })
        
  }); // end d3.json();
}); // end d3.json();
