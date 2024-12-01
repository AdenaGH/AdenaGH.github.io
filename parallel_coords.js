const slide4Container = d3.select(".slide6 .visualization-container");

const svgWidth = 1000;
const svgHeight = 550;

const svg = slide4Container
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("position", "relative");

d3.csv("FP2022.csv").then((data) => {
    console.log(data);

});