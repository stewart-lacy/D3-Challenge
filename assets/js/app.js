// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;
// Define the chart's margins as an object
var chartMargin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data from csv
d3.csv("./assets/data/data.csv").then(function (NewsData) {
    // Save some arrays
    var states =  NewsData.map(d => d.abbr);
    let percpoverty = NewsData.map(d => +d.poverty);
    let perchealthcare = NewsData.map(d => +d.healthcare);
    // Display all states in console
    console.log("States: ", states, "Percentage in Poverty", percpoverty, "Percetange Healthcare", perchealthcare)

    // Create a linear scale for the horizontal and vertical axis.
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(percpoverty), d3.max(percpoverty)])
        .range([0, chartWidth])
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(perchealthcare), d3.max(perchealthcare)])
        .range([chartHeight, 0]);
    // Create chart axis
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
    chartGroup.append("g")
        .call(leftAxis);
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // Add data points
    chartGroup.selectAll("circle")
        .data(NewsData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(+d.poverty))
        .attr("cy", d => yLinearScale(+d.healthcare))
        .attr("r", 14)
        .style("fill", "aqua")
        .attr("stroke", "#00e6e6");

    // add state abbreviation
    chartGroup.append("g")
        .selectAll("text")
        .data(NewsData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(+d.poverty))
        .attr("y", d => yLinearScale(+d.healthcare) + 5)
        .style("text-anchor", "middle")
        .text(d => d.abbr);

    // text label for the x axis
    svg.append("text")
        .attr("y", svgHeight - 20)
        .attr("x", svgWidth / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("In Poverty (%)");
    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Lacks Healthcare (%)");
});