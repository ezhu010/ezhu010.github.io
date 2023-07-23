
dataArray = [
    ['06-01', 24127],
    ['06-02', 21466],
    ['06-03', 17157],
    ['06-04', 20974],
    ['06-05', 20695],
    ['06-06', 20870],
    ['06-07', 24491],
    ['06-08', 23285],
    ['06-09', 18455],
    ['06-10', 18151],
    ['06-11', 18581],
    ['06-12', 22181],
    ['06-13', 22890],
    ['06-14', 28333],
    ['06-15', 26434],
    ['06-16', 20778],
    ['06-17', 20591],
    ['06-18', 24777],
    ['06-19', 25816],
    ['06-20', 28520],
    ['06-21', 33105],
    ['06-22', 33467],
    ['06-23', 27345],
    ['06-24', 28698],
    ['06-25', 37887],
    ['06-26', 37320],
    ['06-27', 47021],
    ['06-28', 46540],
    ['06-29', 43653],
    ['06-30', 37583]
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
    