
dataArray = [
    ['08-01', 66141],
    ['08-02', 68184],
    ['08-03', 56412],
    ['08-04', 50849],
    ['08-05', 45329],
    ['08-06', 52056],
    ['08-07', 55592],
    ['08-08', 53165],
    ['08-09', 62506],
    ['08-10', 51679],
    ['08-11', 46473],
    ['08-12', 43377],
    ['08-13', 58958],
    ['08-14', 54392],
    ['08-15', 51522],
    ['08-16', 56261],
    ['08-17', 51137],
    ['08-18', 41495],
    ['08-19', 41589],
    ['08-20', 41625],
    ['08-21', 46574],
    ['08-22', 46187],
    ['08-23', 47181],
    ['08-24', 42550],
    ['08-25', 36210],
    ['08-26', 35716],
    ['08-27', 40574],
    ['08-28', 46430],
    ['08-29', 46920],
    ['08-30', 46546],
    ['08-31', 40908]
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
    