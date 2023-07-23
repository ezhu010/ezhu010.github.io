// const data = [
//   { label: "Jan20", value: 8, link: "./pages/index2.html" },
//   { label: "Bar 2", value: 30, link: "https://example.com/page2" },
//   { label: "Bar 3", value: 15, link: "https://example.com/page3" },
//   // Add more data objects as needed
// ];


dataArray = [
    ['03-01', 4],
    ['03-02', 9],
    ['03-03', 18],
    ['03-04', 35],
    ['03-05', 51],
    ['03-06', 70],
    ['03-07', 78],
    ['03-08', 130],
    ['03-09', 146],
    ['03-10', 212],
    ['03-11', 390],
    ['03-12', 497],
    ['03-13', 525],
    ['03-14', 727],
    ['03-15', 968],
    ['03-16', 1219],
    ['03-17', 2135],
    ['03-18', 2369],
    ['03-19', 3229],
    ['03-20', 4862],
    ['03-21', 6113],
    ['03-22', 7559],
    ['03-23', 9110],
    ['03-24', 10765],
    ['03-25', 10754],
    ['03-26', 11332],
    ['03-27', 14115],
    ['03-28', 18474],
    ['03-29', 20344],
    ['03-30', 20673],
    ['03-31', 26161]
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
    svg.selectAll(".miniBar3")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("class", "miniBar3")
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
    