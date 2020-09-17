/* 1. Use the D3 library to read in samples.json. */


function init() {
    var id = '940';
    displayData();
}

function displayData() {
    // load data from json file
    d3.json("data/samples.json").then((data) => {
        var ids = data.samples.map(d => d.id);
        var sampleValues = data.samples.map(d => d.sample_values.slice(0,10));
        var otuIDs = data.samples.map(d => d.otu_ids.slice(0,10));
        
        var otuLabels = data.samples.map(d => d.otu_labels.slice(0,10));
    });
    
    // drop down menu patient id selection
    function handleSubmit() {
        // Prevent the page from refreshing
        d3.event.preventDefault();
        // Select the input value from the form
        var id = d3.select("#selDataset").node().value;        
    };

    /* 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.*/
    function buildBarGraph(id) {
        var index = ids.indexOf(id);
        var sampleValues = sampleValues[index]; //Use sample_values as the values for the bar chart.
        var otuIDs = otuIDs[index]; //Use otu_ids as the labels for the bar chart.
        var otuLabels = otuLabels[index]; //Use otu_labels as the hovertext for the chart. 
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
        
        var trace1 = {
            x: otuIDs[index], // Use otu_ids for the x values.
            y: sampleValues[index], // Use sample_values for the y values.
            text: otuLabels[index], // Use otu_labels for the text values.
            mode: 'markers',
            marker: {
                color: otuIDs[index], // Use otu_ids for the marker colors.
                size: sampleValues[index] // Use sample_values for the marker size.
            }
        };
    };

    /* 4. Display the sample metadata, i.e., an individual's demographic information. */


    /* 5. Display each key-value pair from the metadata JSON object somewhere on the page. */

    /* 6. Update all of the plots any time that a new sample is selected. */

};

init();




