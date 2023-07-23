
  
const dataArray = [
    ['07-01', 15514],
    ['07-02', 11639],
    ['07-03', 18586],
    ['07-04', 16890],
    ['07-05', 13189],
    ['07-06', 10459],
    ['07-07', 9147],
    ['07-08', 19962],
    ['07-09', 22636],
    ['07-10', 183538],
    ['07-11', 27579],
    ['07-12', 20875],
    ['07-13', 16722],
    ['07-14', 28892],
    ['07-15', 34978],
    ['07-16', 38299],
    ['07-17', 40555],
    ['07-18', 42258],
    ['07-19', 32139],
    ['07-20', 27993],
    ['07-21', 45195],
    ['07-22', 51040],
    ['07-23', 61313],
    ['07-24', 71708],
    ['07-25', 69639],
    ['07-26', 53795],
    ['07-27', 43206],
    ['07-28', 71245],
    ['07-29', 85805],
    ['07-30', 89149],
    ['07-31', 99367]
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
    