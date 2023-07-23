
dataArray = [
    ['2020-09-01', 36635],
    ['2020-09-02', 38696],
    ['2020-09-03', 39178],
    ['2020-09-04', 43647],
    ['2020-09-05', 45272],
    ['2020-09-06', 50917],
    ['2020-09-07', 41129],
    ['2020-09-08', 34237],
    ['2020-09-09', 24876],
    ['2020-09-10', 28054],
    ['2020-09-11', 34660],
    ['2020-09-12', 38583],
    ['2020-09-13', 44082],
    ['2020-09-14', 40371],
    ['2020-09-15', 32888],
    ['2020-09-16', 34336],
    ['2020-09-17', 36815],
    ['2020-09-18', 43910],
    ['2020-09-19', 44530],
    ['2020-09-20', 48127],
    ['2020-09-21', 42181],
    ['2020-09-22', 34450],
    ['2020-09-23', 41398],
    ['2020-09-24', 49528],
    ['2020-09-25', 41641],
    ['2020-09-26', 45961],
    ['2020-09-27', 49615],
    ['2020-09-28', 42035],
    ['2020-09-29', 35551],
    ['2020-09-30', 38402]
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
    