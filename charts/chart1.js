// Data in hashmap or object format
var data = {
    Jan20: 8,
    Feb20: 61,
    Mar20: 173074,
    Apr20: 857163,
    May20: 755116,
    Jun20: 821191,
    Jul20: 1884228,
    Aug20: 1524538,
    Sep20: 1201705,
    Oct20: 1815557,
    Nov20: 4374916,
    Dec20: 6170028
  };
  

  var colors = {
    '20': 'blue',
  };
  // Convert data into an array of key-value pairs
  var dataArray = Object.entries(data);
  
  // Set up the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  
  // Create the SVG element
  var svg = d3
    .select("#bar-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // Set the x-axis scale and axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.3);
  

  var tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('z-index', 9999); 
  // Set the y-axis scale and axis
  var y = d3.scaleLinear().range([height, 0]);
  
  // Set the domain of x and y scales
  x.domain(dataArray.map(function (d) { return d[0]; }));
  y.domain([0, 20444764]);
  
  // Append the bars
  svg.selectAll(".bar")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return x(d[0]); })
    .attr("width", x.bandwidth())
    .attr("y", function (d) { return y(d[1]); })
    .attr("height", function (d) { return height - y(d[1]); })
    .attr('fill', (d) => colors[d[0].substring(d[0].length - 2)])
    .on('mouseover', function (d,i) {
      // Get the mouse coordinates
      var x = event.pageX;
      var y = event.pageY;
  
      // Get the value of the current bar
      console.log(d);
      var value = i[1];
  
      // Show the tooltip and position it at the mouse coordinates
      d3.select('.tooltip')
        .style('display', 'block')
        .style('left', x + 'px')
        .style('top', y + 'px')
        .text(value);
    })
    .on('mouseout', function () {
      // Hide the tooltip when mouse is no longer over the bar
      d3.select('.tooltip').style('display', 'none');
    });

  
  // Append the x-axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Append the y-axis
  svg.append("g")
    .call(d3.axisLeft(y));

  svg
  .append('text')
  .attr('x', -120)
  .attr('y',-70)
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Covid-19 Cases');

  var annotations = [
    {
      note: { title: 'Title 1' },
      x: x('Mar20'),
      y: y(8),
      dx: 50,
      dy: -80,
    },
    {
      note: { title: 'Title 2' },
      x: x('Feb20'),
      y: y(61),
      dx: 20,
      dy: -50,
    },
    // Add more annotations as needed
  ];
  
  // var makeAnnotations = d3
  //   .annotation()
  //   .type(d3.annotationLabel)
  //   .annotations(annotations);
  
  // svg.append('g').attr('class', 'annotations').call(makeAnnotations);
  