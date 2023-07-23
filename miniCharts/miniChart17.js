

  
const dataArray = [
    ['05-01', 55643],
    ['05-02', 55311],
    ['05-03', 48352],
    ['05-04', 36593],
    ['05-05', 32953],
    ['05-06', 42552],
    ['05-07', 44541],
    ['05-08', 42692],
    ['05-09', 44641],
    ['05-10', 37021],
    ['05-11', 27538],
    ['05-12', 24383],
    ['05-13', 33073],
    ['05-14', 35784],
    ['05-15', 40435],
    ['05-16', 35116],
    ['05-17', 29837],
    ['05-18', 21375],
    ['05-19', 19453],
    ['05-20', 27639],
    ['05-21', 27491],
    ['05-22', 27948],
    ['05-23', 27866],
    ['05-24', 22224],
    ['05-25', 16030],
    ['05-26', 14761],
    ['05-27', 24571],
    ['05-28', 23475],
    ['05-29', 21970],
    ['05-30', 24780],
    ['05-31', 15628]
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
    