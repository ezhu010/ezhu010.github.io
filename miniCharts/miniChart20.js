const dataArray = [
    ['08-01', 104519],
    ['08-02', 80567],
    ['08-03', 61188],
    ['08-04', 102409],
    ['08-05', 110283],
    ['08-06', 126833],
    ['08-07', 127854],
    ['08-08', 133922],
    ['08-09', 120252],
    ['08-10', 96790],
    ['08-11', 93050],
    ['08-12', 135427],
    ['08-13', 143479],
    ['08-14', 151161],
    ['08-15', 146305],
    ['08-16', 139848],
    ['08-17', 110712],
    ['08-18', 108955],
    ['08-19', 150448],
    ['08-20', 168162],
    ['08-21', 174382],
    ['08-22', 167459],
    ['08-23', 141824],
    ['08-24', 124481],
    ['08-25', 120825],
    ['08-26', 162414],
    ['08-27', 176904],
    ['08-28', 186271],
    ['08-29', 182171],
    ['08-30', 150022],
    ['08-31', 115672]
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
    