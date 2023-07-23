// const data = [
//   { label: "Jan20", value: 8, link: "./pages/index2.html" },
//   { label: "Bar 2", value: 30, link: "https://example.com/page2" },
//   { label: "Bar 3", value: 15, link: "https://example.com/page3" },
//   // Add more data objects as needed
// ];


data = [
  ['2020-01-03', 0],
  ['2020-01-04', 0],
  ['2020-01-05', 0],
  ['2020-01-06', 0],
  ['2020-01-07', 0],
  ['2020-01-08', 0],
  ['2020-01-09', 0],
  ['2020-01-10', 0],
  ['2020-01-11', 0],
  ['2020-01-12', 0],
  ['2020-01-13', 0],
  ['2020-01-14', 0],
  ['2020-01-15', 0],
  ['2020-01-16', 0],
  ['2020-01-17', 0],
  ['2020-01-18', 0],
  ['2020-01-19', 0],
  ['2020-01-20', 1],
  ['2020-01-21', 0],
  ['2020-01-22', 0],
  ['2020-01-23', 0],
  ['2020-01-24', 0],
  ['2020-01-25', 5],
  ['2020-01-26', 1],
  ['2020-01-27', 0],
  ['2020-01-28', 1],
  ['2020-01-29', 0],
  ['2020-01-30', 0],
  ['2020-01-31', 0]
]

  

  var colors = {
    '20': 'blue',
    '21': 'green',
    '22': 'orange',
  };

  
  // Set up the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 100 },
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  
  // Create the SVG element
  var svg = d3
    .select("#mini-chart1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // Set the x-axis scale and axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.3);
  
  // Set the y-axis scale and axis
  var y = d3.scaleLinear().range([height, 0]);

  var tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('z-index', 9999); 
  
  // Set the domain of x and y scales
  x.domain(dataArray.map(function (d) { return d[0]; }));
  y.domain([0, d3.max(dataArray, function (d) { return 20444764; })]);
  
  // Append the bars
  svg.selectAll(".bar3")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("class", "bar3")
    .attr("x", function (d) { return x(d[0]); })
    .attr("width", x.bandwidth())
    .attr("y", function (d) { return y(d[1]); })
    .attr("height", function (d) { return height - y(d[1]); })
    .attr('fill', (d) => colors[d[0].substring(d[0].length - 2)])
    .on('mouseover', function (d,i) {
        // Get the mouse coordinates
        var x = event.pageX;
        var y = event.pageY;
    
        var value = i[1].toLocaleString();
  
        d3.select('.tooltip')
          .style('display', 'block')
          .style('left', x + 'px')
          .style('top', y + 'px')
          .text("Covid Cases: " + value);
      })
      .on('mouseout', function () {
        d3.select('.tooltip').style('display', 'none');
      })
      .on("click", (d,i) => {
        console.log(i);
        // Redirect to the local HTML page when the bar is clicked
        window.location.href = i[2];
    });

  
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  svg.append("g")
    .call(d3.axisLeft(y));


  svg
    .append('text')
    .attr('x', -120)
    .attr('y',-70)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Covid-19 Cases');
  