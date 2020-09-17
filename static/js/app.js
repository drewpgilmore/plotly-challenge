/* 1. Use the D3 library to read in samples.json. */
d3.json("data/samples.json").then((data) => {
    var ids = data.samples.map(d => d.id);
    //Use sample_values as the values for the bar chart.
    var sampleValues = data.samples.map(d => d.sample_values.slice(0,10));
    //Use otu_ids as the labels for the bar chart.
    var otuIDs = data.samples.map(d => d.otu_ids.slice(0,10));
    //Use otu_labels as the hovertext for the chart. 
    var otuLabels = data.samples.map(d => d.otu_labels.slice(0,10));
    
});

function init() {
    var id = '940';
    buildBarGraph(id);
    buildBubbleChart(id);
}

// drop down menu patient id selection
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input value from the form
    var id = d3.select("#selDataset").node().value;
    // clear the input value
    //d3.select("#stockInput").node().value = "";
    // Build the plot with the new stock
    buildBarGraph(id);
    buildBubbleChart(id);
};


/* 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.*/
function buildBarGraph(id) {
    var index = ids.indexOf(id);
    var sampleValues = sampleValues[index];
    var otuIDs = otuIDs[index];
    var otuLabels = otuLabels[index];

    var data = [{
        x: sampleValues,
        y: otuIDs.map(otu => `OTU ${otu}`),
        text: otuLabels,
        type: "bar",
        orientation: "h"
    }];

    var layout = {
        title: `OTUs Present in Patient ${id}`
    };

    Plotly.newPlot("bar", data, layout);
};


/* 3. Create a bubble chart that displays each sample.*/
function buildBubbleChart(id) {
    var index = 0; 
    var index = ids.indexOf(id);
    var sampleValues = sampleValues[index];
    var otuIDs = otuIDs[index];
    var 
    // Use otu_ids for the x values.
    var x = otuIDs[index];

    // Use sample_values for the y values.
    var y = sampleValues[index];
    
    // Use sample_values for the marker size.
    
    // Use otu_ids for the marker colors.
    
    // Use otu_labels for the text values.

};

/* 4. Display the sample metadata, i.e., an individual's demographic information. */


/* 5. Display each key-value pair from the metadata JSON object somewhere on the page. */

/* 6. Update all of the plots any time that a new sample is selected. */







