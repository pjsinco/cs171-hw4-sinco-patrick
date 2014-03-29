var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var width = 960 - margin.left - margin.right;
var height = 960 - margin.top - margin.bottom;
var padding = 30;
var ajaxResult = [];
var years = '2009:2013';

// set up main svg
var svg = d3.select('#main_vis')
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

var legendColors = d3.scale.quantize()
  .range(['rgb(237,248,233)','rgb(186,228,179)','rgb(116,196,118)',
    'rgb(49,163,84)','rgb(0,109,44)']);
  
var legend = d3.select('#legend')
  .append('ul')
  .attr('class', 'list-inline')
  
var formats = {
    percent: d3.format('%')
};

var keys = legend.selectAll('li.key')
  .data(legendColors.range())
  .enter()
    .append('li')
    .attr('class', 'key')
    .style('border-top-color', String)
    .text(function(d) {
      var r = legendColors.invertExtent(d);
      return formats.percent(r[0]);
    })
    

// define map projection
var projection = d3.geo.mercator()
  .translate([width / 2, height / 2])
  .scale([155]);

var path = d3.geo.path()
  .projection(projection);

var color = d3.scale.quantize()
  .range(['rgb(237,248,233)','rgb(186,228,179)','rgb(116,196,118)',
    'rgb(49,163,84)','rgb(0,109,44)']);

//$('button[type="submit"]')
//  .click(function(event) {
//    years = $('select').val()
//  });

d3.json('../data/wikipedia-iso-country-codes.json', function(iso) {
  //console.log(iso);

  d3.json('../data/world_topo.json', function(worldMap) {


    var indicator;
    var world = topojson.feature(worldMap, worldMap.objects.world_data);
  
    // add full country names to world
    for (var i = 0; i < iso.length; i++) {
      var iso3Id = iso[i]['Alpha-3 code'];
      var iso2Id = iso[i]['Alpha-2 code'];
      var isoFullName = iso[i]['English short name lower case'];
      for (var k = 0; k < world.features.length; k++) {
        var worldId = world.features[k].id;
        
        if (iso3Id == worldId) {
          world.features[k].fullName = isoFullName;
          world.features[k].iso2Id = iso2Id;
          break;
        } // end if()
      } // end for()
    }; // end for()
  
    console.log(years);
    
    $.ajax({
      url: 'http://api.worldbank.org/countries/all/indicators/EG.ELC.ACCS.ZS?format=jsonP&prefix=Getdata&per_page=500&date=' + years,
      jsonpCallback: 'getdata',
      dataType: 'jsonp',
    }).done(function(result) {
      indicator = result[1][0].indicator.value;
      ajaxResult = result;
      if (result.length > 1) { // if we got something back
        // add resulting values to world
        $.each(result[1], function(index, d) {
          //console.log(val);
          var iso2Id = d.country.id;
          for (var k = 0; k < world.features.length; k++) {
            var world2Id = world.features[k].iso2Id;
            if (iso2Id == world2Id) {
              world.features[k].value = 
                (d.decimal) ? parseFloat(d.value) :
                  parseInt(d.value);
            };
          }
        }); // end .each()
      }; // end if()

      // determin max and min values in result set
      var minVal = d3.min(result[1], function(d) {
        return (d.decimal) ? parseFloat(d.value) : parseInt(d.value);
      }); 
      var maxVal = d3.max(result[1], function(d) {
        return (d.decimal) ? parseFloat(d.value) : parseInt(d.value);
      }); 

      // set color domain
      color
        .domain([minVal, maxVal]);

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
            return color(d.value);
          })
          .on('mouseover', function(d) {
            console.log('mousing over');
            d3.select('#details p#country')
              .text(function() {
                return d.fullName ;
            })
            d3.select('#details p#value')
              .text(function() {
                return d.value ;
              })
          })

      d3.select('#details h1')
        .text(years);

      d3.select('#details h3')
        .text(indicator);
    }); // end .done()
        
  }); // end d3.json();
}); // end d3.json();
