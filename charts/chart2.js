var data = {
    Jan20: 8,
    Feb20: 61,
    Mar20: 173074,
    Apr20: 857163,
    May20: 755116,
    Jun20: 821191,
    Jul20: 1884228,
    Aug20: 1524538,
    Sep20: 1201705,
    Oct20: 1815557,
    Nov20: 4374916,
    Dec20: 6170028,
    Jan21: 6285448,
    Feb21: 2467058,
    Mar21: 1776581,
    Apr21: 1832202,
    May21: 981676,
    Jun21: 385721,
    Jul21: 1373312,
    Aug21: 4114589,
    Sep21: 4185050,
    Oct21: 2660463,
    Nov21: 2444998,
    Dec21: 5449603
  };
  
  // Convert data into an array of key-value pairs
  var dataArray = Object.entries(data);
  
  // Set up the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 100 },
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  
  // Create the SVG element
  var svg = d3
    .select("#bar-chart2")
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
  
  // Set the domain of x and y scales
  x.domain(dataArray.map(function (d) { return d[0]; }));
  y.domain([0, d3.max(dataArray, function (d) { return d[1]; })]);
  
  // Append the bars
  svg.selectAll(".bar2")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("class", "bar2")
    .attr("x", function (d) { return x(d[0]); })
    .attr("width", x.bandwidth())
    .attr("y", function (d) { return y(d[1]); })
    .attr("height", function (d) { return height - y(d[1]); });
  
  // Append the x-axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  // Append the y-axis
  svg.append("g")
    .call(d3.axisLeft(y));
  