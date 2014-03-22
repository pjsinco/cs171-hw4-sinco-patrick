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
