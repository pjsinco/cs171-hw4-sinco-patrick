var margin = {
  top: 40,
  right: 20,
  bottom: 30,
  left: 40
};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format('.0%');

var xScale = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.1);

var yScale = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom');

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')
  .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color: red'>"
      + d.frequency + "</span>";
  })

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .attr('transform', 'translate(' + margin.left + ','
    + margin.top + ')');

svg
  .append('g')
  .attr('transform', 'translate(' + margin.left + ','
    + margin.top + ')');

svg
  .call(tip);

d3.csv('data.csv', function(error, data) {
  data.forEach(function(d) {
    d.frequency = +d.frequency;
  });

  xScale
    .domain(data.map(function(d) {
      return d.letter;
    }));

  yScale
    .domain([0, d3.max(data, function(d) {
      return d.frequency;
    })]);

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis)
  
  svg
    .select('.y.axis')
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .style('text-anchor', 'end')
      .text('Frequency');

  console.log(xScale.rangeBand());

  svg
    .selectAll('.bar')
    .data(data)
    .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) {
        return xScale(d.letter);
      })
      .attr('y', function(d) {
        return yScale(d.frequency);
      }) 
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) {
        return height - yScale(d.frequency);
      }) 
      .style('fill', 'darkorange')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

}); // end d3.csv() -- data
