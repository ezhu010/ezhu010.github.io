
dataArray = [
    ['2020-11-01', 97518],
    ['2020-11-02', 92783],
    ['2020-11-03', 141582],
    ['2020-11-04', 87188],
    ['2020-11-05', 98499],
    ['2020-11-06', 113875],
    ['2020-11-07', 122830],
    ['2020-11-08', 133337],
    ['2020-11-09', 129810],
    ['2020-11-10', 111648],
    ['2020-11-11', 124487],
    ['2020-11-12', 145951],
    ['2020-11-13', 153660],
    ['2020-11-14', 162300],
    ['2020-11-15', 176989],
    ['2020-11-16', 164239],
    ['2020-11-17', 137564],
    ['2020-11-18', 153374],
    ['2020-11-19', 167352],
    ['2020-11-20', 170904],
    ['2020-11-21', 188681],
    ['2020-11-22', 193369],
    ['2020-11-23', 173861],
    ['2020-11-24', 149783],
    ['2020-11-25', 160411],
    ['2020-11-26', 175183],
    ['2020-11-27', 194100],
    ['2020-11-28', 145029],
    ['2020-11-29', 164034],
    ['2020-11-30', 144575]
  ]
  
  
  

  
    
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
    