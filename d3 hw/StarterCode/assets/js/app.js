// @TODO: 
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

console.log("start of script")

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
 // .attr("g")
var censusGroup = svg.append("g")
 .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("../assets/data/data.csv")
  .then(function(censusData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    //censusData.forEach(function(data) {
    
    // Step 2: Create scale functions
    // ==============================
    
    var xLinearScale= d3.scaleLinear()
    .range([0, width]);
    var yLinearScale= d3.scaleLinear()
    .range([height, 0]);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    xLinearScale.domain([8, d3.max(censusData, function (d) {
        return +d.poverty;
      })]);
      

    
    yLinearScale.domain([0, d3.max(censusData, function (d) {
      return +d.healthcare*1.2;
     })]);
     
 

    // Step 3: Create axis functions
    // ==============================
    
    // Step 4: Append Axes to the chart
    // ==============================
    // censusGroup.append("g")
    //   .attr("transform", `translate(0, ${height})`)
    //   .call(bottomAxis);

    // censusGroup.append("g")
    //   .call(leftAxis);

    //Step 5: Create Circles
    //==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    censusGroup.call(toolTip);

    //var circlesGroup = censusGroup.selectAll("circle")
  var circlesGroup = svg.selectAll("g").data(censusData).enter();
  circlesGroup.append("circle")
    .attr("cx", function(d,index) {
      return xLinearScale(d.poverty);})
    .attr("cy", function(d,index) { return yLinearScale(d.healthcare);})
    .attr("r", "15")
    .attr("class", function(d) {
        return "stateCircle ";// + d.abbr;
      })
    .attr("fill", "skyblue")
    //.attr("opacity", ".5");
    .on("click", function(data) {
      console.log("tooltip clicked")
      toolTip.show(data);
    });

  circlesGroup.append("text", "circle")
     .text(function(d) {
       return d.abbr;
     })
     .attr("dx", function(d) {
       return xLinearScale(d.poverty);
     })
     .attr("dy", function(d) {
       return yLinearScale(d.healthcare) + 15 / 2.5;;
     })
     .attr("font-size", "10")
     .attr("class", "stateText")
     // onmouseout event
      .on("mouseover", function(d) {
        console.log("Show hover")
       // Show the tooltip
       toolTip.show(d,this);
       // Highlight the state circle's border
       d3.select(this).style("stroke", "#323232");
      })
     .on("mouseout", function(d) {
       // Remove the tooltip
       toolTip.hide(d);
       // Remove highlight
       d3.select(this).style("stroke", "#e3e3e3");
     });
    // Step 6: Initialize tool tip
    // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
    //   });

    // // Step 7: Create tooltip in the chart
    // // ==============================
    // censusGroup.call(toolTip);

   // Step 8: Create event listeners to display and hide the tooltip
    //==============================
    //censusGroup.on("click", function(data) {
    //  toolTip.show(data, this);
   // })
      // onmouseout event
      // .on("mouseout", function(data, index) {
      //   toolTip.hide(data);
      // });

    // Create axes labels
   censusGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

   censusGroup.append("g")
      .call(leftAxis);
   censusGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Healthcare");

   censusGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty");
  });

