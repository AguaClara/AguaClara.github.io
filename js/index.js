if (localStorage.getItem("plantName")==null){
  window.location.replace("/settings.html");
}
  data_request_url = "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201lgxjPxZ8_V6OyA0Wa19iGpuZKKn1mBf1chJOgkqU%20WHERE%20plant%3D%27" + localStorage.getItem("plantName") + "%27%20AND%20rawWaterTurbidity%20%3E%200%20ORDER%20BY%20timeFinished%20DESC%20LIMIT%20100&key=AIzaSyB4fY4TPsWMhqifu68GFq1aWREjiiAYZmo"
  console.log('requesting data from:', data_request_url)
  Plotly.d3.json(data_request_url, function(err, data){



  function unpack_data(data, key) {
    rows = data["rows"]
    columns = data["columns"]
  return rows.map(function(row) { return row[columns.indexOf(key)]; });
  }
  function unpack_time(data, key){
    times = unpack_data(data, key)
    return times.map(function(time) { return time.replace(/(\d*)?\/(\d*)?\/(\d*)?/g, '$3-$1-$2')})
  }


  var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'Turbiedad de agua cruda',
  x: unpack_time(data, 'timeFinished'),
  y: unpack_data(data, 'rawWaterTurbidity'),
  line: {color: '#17BECF'}
  }

  var trace2 = {
  type: "scatter",
  mode: "lines",
  name: 'Turbiedad de agua decantada',
  x: unpack_time(data, 'timeFinished'),
  y: unpack_data(data, 'settledWaterTurbidity'),
  line: {color: '#7F7F7F'}
  }

  var trace3 = {
  type: "scatter",
  mode: "lines",
  name: 'Turbiedad de agua filtrada',
  x: unpack_time(data, 'timeFinished'),
  y: unpack_data(data, 'filteredWaterTurbidity1'),
  line: {color: '#66ff66'}
  }

  var trace4 = {
  type: "scatter",
  mode: "lines",
  name: 'Dosis de coagulantes',
  x: unpack_time(data, 'timeFinished'),
  y: unpack_data(data, 'coagulantDose'),
  line: {color: '#CCFF66'}
  }


  var data1 = [trace1,trace2,trace3]

  var data2 = [trace4]

  var layout1 =
{
"title": localStorage.getItem("plantName"),
"autosize": true,
"breakpoints": [],
"xaxis": {
  "title": "Fecha",
  "type": "date",
  "autorange": true,
  "rangeslider": {
    "bordercolor": "#444",
    "thickness": 0.15,
    "bgcolor": "white",
    "borderwidth": 0,
    "autorange": true
  }
},
"yaxis": {
  "title": "Turbiedad (UTN)",
  "type": "linear",
  "autorange": true
}
}

  var layout2 =
{
"title": "Dosis De Coagulantes",
"autosize": true,
"breakpoints": [],
"xaxis": {
  "title": "Fecha",
  "type": "date",
  "autorange": true,
  "rangeslider": {
    "bordercolor": "#444",
    "thickness": 0.15,
    "bgcolor": "white",
    "borderwidth": 0,
    "autorange": true
  }
},
"yaxis": {
  "title": "mg/L",
  "type": "linear",
  "autorange": true
}
}





  Plotly.newPlot('myDiv', data1, layout1);

  Plotly.newPlot('cogDiv', data2, layout2);

  })
