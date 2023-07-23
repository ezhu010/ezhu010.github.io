
dataArray = [
    ['04-01', 15536],
    ['04-02', 23260],
    ['04-03', 28674],
    ['04-04', 29790],
    ['04-05', 32057],
    ['04-06', 32134],
    ['04-07', 26984],
    ['04-08', 28629],
    ['04-09', 29355],
    ['04-10', 34148],
    ['04-11', 34743],
    ['04-12', 33179],
    ['04-13', 31535],
    ['04-14', 27094],
    ['04-15', 25244],
    ['04-16', 25259],
    ['04-17', 25208],
    ['04-18', 31494],
    ['04-19', 30316],
    ['04-20', 28281],
    ['04-21', 26070],
    ['04-22', 26428],
    ['04-23', 25927],
    ['04-24', 30470],
    ['04-25', 33211],
    ['04-26', 34778],
    ['04-27', 33603],
    ['04-28', 26063],
    ['04-29', 23758],
    ['04-30', 23935]
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
    