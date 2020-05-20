// Belly Button Biodiversity - Plotly.js


function sampleMetadata(met_data) {

      d3.json("./samples.json").then(data => {
          var metaData = data.metadata;
    
          var demoInfo = d3.select("#sample-metadata");
          // Use `.html("") to Clear any Existing Metadata
          demoInfo.html("");

          var metadataSelected = metaData.filter(data_filt => data_filt.id.toString() === met_data)[0];
          Object.entries(metadataSelected).forEach(([key, value]) => {
            demoInfo.append("h6").text(`${key}:${value}`);
          })
      })
  } 
  
  function plotCharts(sample_data) {
  
    d3.json("./samples.json").then(data => {

      var selected_sample = data.samples.filter(data_filt => data_filt.id.toString() === sample_data)[0];
      const otu_ids = selected_sample.otu_ids;
      const otu_labels = selected_sample.otu_labels;
      const sample_values = selected_sample.sample_values;

      //bubble Chart
      var bubbleLayout = {
        margin: { t: 0 },
        hovermode: "closests",
        xaxis: { title: "OTU ID"}
      }
  
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ]
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      
      //bar chart
      var otu_temp = otu_ids.slice(0, 10);
      var OTU_id = otu_temp.map(d => "OTU " + d);
      var barData =[
        {
          x: sample_values.slice(0, 10),
          y: OTU_id,
          text: otu_labels.slice(0, 10),
          orientation: "h",
          type: "bar",
        }];
      
      var barLayout = {
        title: "Top 10 OTU",  
          yaxis:{
              autorange: "reversed"
            }
      };
  
      Plotly.newPlot("bar", barData, barLayout)
  })
  }
  
  function init() {

    var dropDown = d3.select("#selDataset");
  
    d3.json("./samples.json").then(data => {
      sampleNames = data.names;
      sampleNames.forEach((name) => {
        dropDown
          .append("option")
          .text(name)
          .property("value");
      });
  
      const firstSample = sampleNames[0];
      plotCharts(firstSample);
      sampleMetadata(firstSample);
    })
  }
  
  function optionChanged(newSample) {
    plotCharts(newSample);
    sampleMetadata(newSample);
  }
  
  // Initialize the Dashboard
  init();