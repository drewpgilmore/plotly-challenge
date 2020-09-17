var dropdownMenu = d3.select("#selDataset");
var name = dropdownMenu.property("value");

function init() {
    displayData(name);
}

function displayData(name) {
    /* 1. Use the D3 library to read in samples.json. */
    d3.json("data/samples.json").then((data) => {
        var ids = data.samples.map(d => d.id);
        var sampleValues = data.samples.map(d => d.sample_values.slice(0,10));
        var otuIDs = data.samples.map(d => d.otu_ids.slice(0,10));
        var otuLabels = data.samples.map(d => d.otu_labels.slice(0,10));
        var names = data.names;
        var metadata = data.metadata;
        
        // append names to dropdown menu
        d3.select("#selDataset")
            .selectAll("option")
            .data(names)
            .enter()
            .append("option")
            .text(function(d) {
                return d;
            });
        
        // assign drop down selection to name
        var name = d3.select("#selDataset").property("value");
        
        // identify element index of selected patient
        var index = ids.indexOf(name);
        console.log(index);
        
        /* Display the sample metadata, i.e., an individual's demographic information. */
        // assign patient metadata for use below
        var demographics = Object.entries(metadata[index]);
        console.log(demographics);
        // append metadata to demographics window
        var selection = d3.select("#sample-metadata").selectAll("p")   
            .data(demographics)
        
        selection.enter()
            .append("p")
            .merge(selection)
            .text(function(d) {
            return `${d[0]}: ${d[1]}`;
            });
        
        // assign corresponding arrays to selected patient
        var sampleValues = sampleValues[index]; 
        var otuIDs = otuIDs[index]; 
        var otuLabels = otuLabels[index];
        
        /* 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.*/
        var data = [{
            x: sampleValues, //Use sample_values as the values for the bar chart.
            //y: otuIDs,
            //y: otuIDs.map(otu => `OTU ${otu}`), //Use otu_ids as the labels for the bar chart.
            text: otuLabels, //Use otu_labels as the hovertext for the chart. 
            type: "bar",
            orientation: "h"
        }];
        var layout = {
            title: `OTUs Present in Patient ${name}`
        };

        Plotly.newPlot("bar", data, layout);
    
        /* 3. Create a bubble chart that displays each sample.*/  
        var data = [{
            x: otuIDs, // Use otu_ids for the x values.
            y: sampleValues, // Use sample_values for the y values.
            text: otuLabels, // Use otu_labels for the text values.
            mode: 'markers',
            marker: {
                color: otuIDs, // Use otu_ids for the marker colors.
                size: sampleValues // Use sample_values for the marker size.
            }
        }];
        var layout = {
            title: 'Bubble Chart'
        };

        Plotly.newPlot("bubble", data, layout)

        
        
        
        
        

        

        /* 6. Update all of the plots any time that a new sample is selected. */
    });

};

init();




