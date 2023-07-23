
  
  const dataArray = [
    ['2021-09-01', 138600],
    ['2021-09-02', 176801],
    ['2021-09-03', 197627],
    ['2021-09-04', 183417],
    ['2021-09-05', 182112],
    ['2021-09-06', 141762],
    ['2021-09-07', 123082],
    ['2021-09-08', 116004],
    ['2021-09-09', 114676],
    ['2021-09-10', 171241],
    ['2021-09-11', 183714],
    ['2021-09-12', 172091],
    ['2021-09-13', 153543],
    ['2021-09-14', 113838],
    ['2021-09-15', 118971],
    ['2021-09-16', 162147],
    ['2021-09-17', 163128],
    ['2021-09-18', 167335],
    ['2021-09-19', 158492],
    ['2021-09-20', 122574],
    ['2021-09-21', 94644],
    ['2021-09-22', 98378],
    ['2021-09-23', 132981],
    ['2021-09-24', 132730],
    ['2021-09-25', 138256],
    ['2021-09-26', 132731],
    ['2021-09-27', 96166],
    ['2021-09-28', 75238],
    ['2021-09-29', 107319],
    ['2021-09-30', 115452]
  ];
  
    
    // Set up the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 100 },
      width = 1500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    
    // Create the SVG element
    var svg = d3
      .select("#mini-chart3")
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
    y.domain([0, d3.max(dataArray, function (d) { return d[1]; })]);
    
    // Append the bars
    svg.selectAll(".miniBar4")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("class", "miniBar4")
      .attr("x", function (d) { return x(d[0]); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d[1]); })
      .attr("height", function (d) { return height - y(d[1]); })
      .attr('fill', (d) => "purple")
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
    