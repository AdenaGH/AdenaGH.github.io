// Slide 2 only
const slide2Container = d3.select(".slide2 .visualization-container");

// Dimensions for the grocery bag image and visualization
const bagWidth = 400;
const bagHeight = 500;

// Add the grocery bag image
const bagImage = slide2Container
  .append("img")
  .attr("src", "grocerybag.png")
  .attr("alt", "Grocery Bag")
  .style("width", `${bagWidth}px`)
  .style("height", `${bagHeight}px`)
  .style("display", "block")
  .style("margin", "0 auto");

// Add a text container for the price range
const priceText = slide2Container
  .append("h3")
  .attr("class", "price-text")
  .style("text-align", "center")
  .style("margin-top", "20px")
  .style("font-size", "24px")
  .text("");

// Add a slider for year selection
const yearSlider = slide2Container
  .append("input")
  .attr("type", "range")
  .attr("min", 2020)
  .attr("max", 2022)
  .attr("step", 2)
  .attr("value", 2020)
  .style("width", "300px")
  .style("display", "block")
  .style("margin", "20px auto");

// Label for the slider
const yearLabel = slide2Container
  .append("h4")
  .attr("class", "year-label")
  .style("text-align", "center")
  .style("margin-top", "10px")
  .style("font-size", "18px")
  .text("Year: 2020");

// Function to calculate the price range
function calculatePriceRange(data) {
  // Calculate the average price
  const avgPrice =
    d3.mean(data, (d) => +d.RetailPrice) * 2.51; // Average price x household size

  // Calculate the lower and upper bounds
  const lowerBound = avgPrice * 5;
  const upperBound = avgPrice * 10;

  // Format the price range
  return `$${lowerBound.toFixed(2)} - $${upperBound.toFixed(2)}`;
}

// Function to load the appropriate CSV and update the visualization
function updateVisualization(year) {
  const fileName = `FP${year}.csv`;

  d3.csv(fileName).then((data) => {
    // Calculate the price range for the selected year
    const priceRange = calculatePriceRange(data);

    // Update the price range text
    priceText.text(priceRange);

    // Update the year label
    yearLabel.text(`Year: ${year}`);
  });
}

// Initialize the visualization with 2020 data
updateVisualization(2020);

// Add an event listener to the slider to update the visualization on change
yearSlider.on("input", function () {
  const selectedYear = +d3.select(this).property("value");
  updateVisualization(selectedYear);
});
