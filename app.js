// Belly Button Biodiversity - Plotly.js

function sampleMetadata(sample) {

      d3.json("./samples.json").then(function(data){
          var metaData = data.metadata;
    
          var demoInfo = d3.select("#sample-metadata");
          // Use `.html("") to Clear any Existing Metadata
          demoInfo.html("");

          var metadataSelected = metaData.filter(meta => meta.id.toString() === sample)[0];
          Object.entries(metadataSelected).forEach(([key, value]) => {
            demoInfo.append("h6").text(`${key}:${value}`);
          })
      })
  } s
  
  // function plotCharts() {
  
  //   // @TODO: Use `d3.json` to Fetch the Sample Data for the Plots
  //   d3.json(`samples.json`).then((data) => {
  //     // @TODO: Build a Bubble Chart Using the Sample Data
  //     const otu_ids = data.otu_ids;
  //     const otu_labels = data.otu_labels;
  //     const sample_values = data.sample_values;
  //     // @TODO: Build a Pie Chart
  //     let bubbleLayout = {
  //       margin: { t: 0 },
  //       hovermode: "closests",
  //       xaxis: { title: "OTU ID"}
  //     }
  
  //     let bubbleData = [
  //       {
  //         x: otu_ids,
  //         y: sample_values,
  //         text: otu_labels,
  //         mode: "markers",
  //         marker: {
  //           size: sample_values,
  //           color: otu_ids,
  //           colorscale: "Earth"
  //         }
  //       }
  //     ]
  
  //     Plotly.plot("bubble", bubbleData, bubbleLayout);
  
  //     // HINT: Use slice() to Grab the Top 10 sample_values,
  //     // otu_ids, and otu_labels (10 Each)
  //     let pieData = [
  //       {
  //         values: sample_values.slice(0, 10),
  //         labels: otu_ids.slice(0, 10),
  //         hovertext: otu_labels.slice(0, 10),
  //         hoverinfo: "hovertext",
  //         type: "pie"
  //       }
  //     ];
      
  //     let pieLayout = {
  //       margin: { t: 0, l: 0 }
  //     };
  
  //     Plotly.plot("pie", pieData, pieLayout)
  // })
  // }
  
  function init() {

    var dropDown = d3.select("#selDataset");
  
    // Use the List of Sample Names to Populate the Select Options
    d3.json("samples.json").then((data) => {
      sampleNames = data.names;
      sampleNames.forEach((name) => {
        dropDown
          .append("option")
          .text(name)
          .property("value");
      });
  
      // Use the First Sample from the List to Build Initial Plots
      const firstSample = sampleNames[0];
     // plotCharts(firstSample);
      sampleMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch New Data Each Time a New Sample is Selected
    //plotCharts(newSample);
    sampleMetadata(newSample);
  }
  
  // Initialize the Dashboard
  init();