
dataArray = [
    ['2020-07-01', 38517],
    ['2020-07-02', 47253],
    ['2020-07-03', 59342],
    ['2020-07-04', 55452],
    ['2020-07-05', 60366],
    ['2020-07-06', 48978],
    ['2020-07-07', 40413],
    ['2020-07-08', 50763],
    ['2020-07-09', 56754],
    ['2020-07-10', 64775],
    ['2020-07-11', 61943],
    ['2020-07-12', 68579],
    ['2020-07-13', 68262],
    ['2020-07-14', 58680],
    ['2020-07-15', 56287],
    ['2020-07-16', 64516],
    ['2020-07-17', 72389],
    ['2020-07-18', 69181],
    ['2020-07-19', 76952],
    ['2020-07-20', 67324],
    ['2020-07-21', 60012],
    ['2020-07-22', 58519],
    ['2020-07-23', 63336],
    ['2020-07-24', 72416],
    ['2020-07-25', 73142],
    ['2020-07-26', 73152],
    ['2020-07-27', 61596],
    ['2020-07-28', 57759],
    ['2020-07-29', 54007],
    ['2020-07-30', 58708],
    ['2020-07-31', 64855]
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
    