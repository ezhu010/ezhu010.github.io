

  
const dataArray = [
    ['02-01', 138823],
    ['02-02', 111938],
    ['02-03', 129043],
    ['02-04', 121330],
    ['02-05', 108669],
    ['02-06', 122620],
    ['02-07', 124827],
    ['02-08', 110180],
    ['02-09', 92931],
    ['02-10', 80726],
    ['02-11', 91417],
    ['02-12', 98339],
    ['02-13', 99548],
    ['02-14', 97431],
    ['02-15', 85221],
    ['02-16', 67413],
    ['02-17', 58066],
    ['02-18', 56871],
    ['02-19', 63770],
    ['02-20', 68568],
    ['02-21', 73576],
    ['02-22', 65510],
    ['02-23', 56628],
    ['02-24', 55821],
    ['02-25', 70162],
    ['02-26', 72358],
    ['02-27', 71998],
    ['02-28', 73274]
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
    