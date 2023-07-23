
dataArray = [
    ['05-01', 26774],
    ['05-02', 31221],
    ['05-03', 33082],
    ['05-04', 28292],
    ['05-05', 25927],
    ['05-06', 22324],
    ['05-07', 22878],
    ['05-08', 25440],
    ['05-09', 28552],
    ['05-10', 28833],
    ['05-11', 25917],
    ['05-12', 20656],
    ['05-13', 19950],
    ['05-14', 23902],
    ['05-15', 17336],
    ['05-16', 34643],
    ['05-17', 26628],
    ['05-18', 26081],
    ['05-19', 19917],
    ['05-20', 22744],
    ['05-21', 21923],
    ['05-22', 23506],
    ['05-23', 26191],
    ['05-24', 25963],
    ['05-25', 21465],
    ['05-26', 20651],
    ['05-27', 19379],
    ['05-28', 17510],
    ['05-29', 19508],
    ['05-30', 24182],
    ['05-31', 23741]
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
    svg.selectAll(".bar3")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("class", "bar3")
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
    