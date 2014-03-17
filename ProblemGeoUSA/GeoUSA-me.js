// d3 margin convention
var margin = {
  top: 50,
  left: 50,
  bottom: 50,
  right: 50,
}

var width = 1060 - margin.left - margin.right; // 960
var height = 800 - margin.top - margin.bottom; // 700

var bbVis = {
  x: 100,
  y: 10,
  w: width - 100,
  h: 300
}

var detailVis = d3.select('#detailVis')
  .append('svg')
  .attr('width', 350)
  .attr('height', 200)

var canvas = d3.select('#vis')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  

