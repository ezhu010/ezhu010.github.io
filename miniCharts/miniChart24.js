const dataArray = [
    ['12-01', 93479],
    ['12-02', 120690],
    ['12-03', 133075],
    ['12-04', 143869],
    ['12-05', 151567],
    ['12-06', 67352],
    ['12-07', 55314],
    ['12-08', 184043],
    ['12-09', 125548],
    ['12-10', 129708],
    ['12-11', 137431],
    ['12-12', 135573],
    ['12-13', 63967],
    ['12-14', 58109],
    ['12-15', 185683],
    ['12-16', 125442],
    ['12-17', 146477],
    ['12-18', 162668],
    ['12-19', 156763],
    ['12-20', 87584],
    ['12-21', 102213],
    ['12-22', 266159],
    ['12-23', 203318],
    ['12-24', 237883],
    ['12-25', 278812],
    ['12-26', 241450],
    ['12-27', 115824],
    ['12-28', 211284],
    ['12-29', 464495],
    ['12-30', 389514],
    ['12-31', 474309]
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
    