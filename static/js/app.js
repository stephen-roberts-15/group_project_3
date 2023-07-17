

// Place url in a constant variable
const url = "http://127.0.0.1:5000/data"      

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard at start up 
function init() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        
        // Use D3 to get the property numbers from the fetched JSON data
        d3.json(url).then((data) => {
          // Parse the JSON string into an object
          const jsonData = JSON.parse(data);
          // Get the property numbers from the parsed JSON object
          let Boroughs =jsonData.Boroughs;
          console.log(Boroughs);

          var unique_boroughs = jsonData.map(item => item.Boroughs).filter((value, index, self) => self.indexOf(value) === index);
              
              console.log(unique_boroughs);
          // Add properties to dropdown menu
          unique_boroughs.forEach((Boroughs) => {
            dropdownMenu.append("option")
              .text(Boroughs)
              .property("value", Boroughs);
          });

          //get unique boroughs
          console.log(dropdownMenu)

          // Set the first property from the list
          let FirstBorough = unique_boroughs[0];
          // Log the value of propertyOne
          console.log(unique_boroughs);

          
          // Build the initial plots
          filterProperties(FirstBorough);
          buildPieChart(FirstBorough);
         
        //   displayProperties(FirstBorough);

        });
      } 

const boroughSelect = document.getElementById('selDataset');
boroughSelect.addEventListener('change', filterProperties);
//function to filter based on dropdown
function filterProperties() {
        d3.json(url).then(function(data) {
        const jsonData = JSON.parse(data);
        console.log(jsonData);  
       const selectedBorough = boroughSelect.value;
       const filteredProperties = jsonData.filter(result => result.Boroughs === selectedBorough);
       console.log(selectedBorough);
       console.log(filteredProperties);
       displayListingInfo(filteredProperties)
});
}

// Function that populates propertly listing info 
function displayListingInfo(properties) {
        const propertyList = document.getElementById('propertyList');
        
        // Clear the existing list
        propertyList.innerHTML = '';

        const averagePrice = calculateAveragePrice(properties);
        const count = properties.length;

        const countListItem = document.createElement('li');
        countListItem.textContent = `Count: ${count}`;
        propertyList.appendChild(countListItem);
      
        const averagePriceListItem = document.createElement('li');
        averagePriceListItem.textContent = `Average Price: $${averagePrice.toFixed(2)}`;
        propertyList.appendChild(averagePriceListItem);
        buildPieChart(properties);
      }

function calculateAveragePrice(properties) {
        const prices = properties.map(property => property.Price);
        const total = prices.reduce((accumulator, price) => accumulator + price, 0);
        return total / properties.length;
        

}
function countPropertyTypes(properties) {
        const propertyTypes = {};
        properties.forEach(property => {
          const propType = property.Prop_Type;
          propertyTypes[propType] = (propertyTypes[propType] || 0) + 1;
        });
        return propertyTypes;
      }
      

// Function that builds the bar chart
function buildPieChart(properties) {
        const propertyTypes = countPropertyTypes(properties);

        const types = Object.keys(propertyTypes);
        const counts = Object.values(propertyTypes);
        

        // set up trace for pie chart
        const trace = {
                labels: types,
                values: counts,
                type: "pie"
        };

        const layout = {
                title: "Property Types"
        };

        Plotly.newPlot("pie", [trace], layout);
      }


// Function that updates dashboard when sample is changed
function optionChanged(value) { 

// Log the new value
    console.log(value); 

// Call all functions 
    buildMetadata(value);
    buildPieChart(properties);
;
};

const img = new Image();
// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.
img.src = "http://127.0.0.1:5000/static/Images/NYC_skyline.jpeg"
const canvasXSize = 1175;
const canvasYSize = 350;
const speed = 30; // lower is faster
const scale = 1.05;
const y = -4.5; // vertical offset
// Main program
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctx;
img.onload = () => {
  imgW = img.width * scale;
  imgH = img.height * scale;
  if (imgW > canvasXSize) {
    // Image larger than canvas
    x = canvasXSize - imgW;
  }
  // Check if image dimension is larger than canvas
  clearX = Math.max(imgW, canvasXSize);
  clearY = Math.max(imgH, canvasYSize);
  // Get canvas context
  ctx = document.getElementById("canvas").getContext("2d");
  // Set refresh rate
  return setInterval(draw, speed);
};
function draw() {
  ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
  // If image is <= canvas size
  if (imgW <= canvasXSize) {
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = -imgW + x;
    }
    // Draw additional image1
    if (x > 0) {
      ctx.drawImage(img, -imgW + x, y, imgW, imgH);
    }
    // Draw additional image2
    if (x - imgW > 0) {
      ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    // Image is > canvas size
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }
    // Draw additional image
    if (x > canvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }
  // Draw image
  ctx.drawImage(img, x, y, imgW, imgH);
  // Amount to move
  x += dx;
}

// Call the initialize function
init();
