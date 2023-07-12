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
   let Boroughs = Object.values(jsonData.Boroughs);
   console.log(Boroughs);

   var unique_boroughs = Boroughs.filter((value, index, self) => self.indexOf(value) === index);

   // Add boroughs to dropdown menu
   unique_boroughs.forEach((Boroughs) => {
     dropdownMenu.append("option")
       .text(Boroughs)
       .property("value", Boroughs);
   });
   // Set the first property from the list
   let BoroughsOne = Boroughs[0];
   // Log the value of propertyOne
   console.log(BoroughsOne);

   // Build the initial plots
   buildMetadata(BoroughsOne);
   buildBarChart(BoroughsOne);
   buildBubbleChart(BoroughsOne);
 });
}

// Function that populates metadata info
function buildMetadata(unique_boroughs) {

// Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

// Retrieve all metadata
        let metadata = data.metadata;

// Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

// Log the array of metadata objects after the have been filtered
        console.log(value)

// Get the first index from the array
        let valueData = value[0];

// Clear out metadata
        d3.select("#sample-metadata").html("");

// Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

// Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function that builds the bar chart
function buildBarChart(sample) {

// Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

// Retrieve all sample data
        let sampleInfo = data.samples;

// Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

// Get the first index from the array
        let valueData = value[0];

// Get the ids, lables, and sample values
        let Boroughs = valueData.Boroughs;
        let Prop_Type = valueData.Prop_Type;
        let Min_Nights = valueData.Min_Nights;

// Log the data to the console
        console.log(Boroughs,Prop_Type);

// Set top ten items to display in descending order
        let yticks = Boroughs.slice(0,10).map(id => `Boroughs ${id}`).reverse();
        let xticks = Min_Nights.slice(0,10).reverse();
        let labels = Prop_Type.slice(0,10).reverse();
        
// Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

// Setup the layout
        let layout = {
            title: "Number of Properties per Borough"
        };

// Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

// Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
// Retrieve all sample data
        let sampleInfo = data.samples;

// Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

// Get the first index from the array
        let valueData = value[0];

// Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

// Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
// Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

// Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

// Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

// Log the new value
    console.log(value); 

// Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
   // buildGaugeChart(value);
};

// Call the initialize function
init();