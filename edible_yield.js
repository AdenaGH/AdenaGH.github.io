//Slide 4 only
const slide4Container = d3.select(".slide4 .visualization-container");

// Dimensions: could be changed
const svgWidth = 800;
const svgHeight = 400;

//svg
const svg = slide4Container
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .style("position", "relative");

// Dropdown
const dropdown = slide4Container
  .append("select")
  .attr("class", "fruit-dropdown")
  .style("position", "absolute")
  .style("top", `${svgHeight / 2 - 20}px`) // Vertically center the dropdown with the fruit image
  .style("left", `${svgWidth + 20}px`) // Place it to the right of the SVG
  .style("width", "200px")
  .style("padding", "10px")
  .style("font-size", "14px");

// Load data
d3.csv("FP2020.csv").then((data) => {
  console.log("Raw CSV data loaded:", data);

  // Filter for fresh form with added images (should be all of fresh though!)
  const freshData = data.filter((d) => d.Form === "Fresh" && d.ImageName);
  console.log("Filtered Data (Fresh):", freshData);

  if (freshData.length === 0) {
    console.warn("No valid data to display!");
    return;
  }

  // Populate dropdown
  dropdown
    .selectAll("option")
    .data(freshData)
    .enter()
    .append("option")
    .attr("value", (d) => d.Fruit)
    .text((d) => d.Fruit);

  // Set up a scale for yield size
  const yieldScale = d3.scaleLinear().domain([0, 1]).range([0, 500]); // Scale yield as a proportion of 500x500

  // Update based on fruit
  function updateVisualization(selectedFruit) {
    // Find selected fruit's data
    const fruitData = freshData.find((d) => d.Fruit === selectedFruit);
    if (!fruitData) return;

    console.log("Selected Fruit Data:", fruitData);

    // Clear previous visualization
    svg.selectAll("*").remove();

    // Add a darkened full-sized background image (always 500x500)
    const backgroundSize = 500;
    svg
      .append("image")
      .attr("href", fruitData.ImageName)
      .attr("x", svgWidth / 2 - backgroundSize / 2)
      .attr("y", svgHeight / 2 - backgroundSize / 2)
      .attr("width", backgroundSize)
      .attr("height", backgroundSize)
      .attr("opacity", 0.3); // Darkened background

    // Add a scaled-down image of the fruit centered in the middle
    const fruitSize = yieldScale(+fruitData.Yield); // Scale the fruit size by yield
    svg
      .append("image")
      .attr("href", fruitData.ImageName)
      .attr("width", fruitSize)
      .attr("height", fruitSize)
      .attr("x", svgWidth / 2 - fruitSize / 2) // Center horizontally
      .attr("y", svgHeight / 2 - fruitSize / 2); // Center vertically
  }

  // Set the initial visualization to the first fruit
  updateVisualization(freshData[0].Fruit);

  // Update visualization when a new fruit is selected from the dropdown
  dropdown.on("change", function () {
    const selectedFruit = d3.select(this).property("value");
    updateVisualization(selectedFruit);
  });
}).catch((error) => {
  console.error("Error loading the CSV file:", error);
});
