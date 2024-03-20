"use strict";

$(function () {
  var zoomedChart = $('#chart').dxChart({
    palette: 'Harmony Light',
    dataSource: zoomingData,
    series: [{
      argumentField: 'arg',
      valueField: 'y1'
    }, {
      argumentField: 'arg',
      valueField: 'y2'
    }],
    argumentAxis: {
      visualRange: {
        startValue: 300,
        endValue: 500
      }
    },
    scrollBar: {
      visible: true
    },
    legend: {
      visible: false
    },
    zoomAndPan: {
      argumentAxis: 'zoom',
      // "zoom" | "pan" | "none" "both"
      valueAxis: 'zoom' // "zoom" | "pan" | "none" "both"

    },
    "export": {
      printingEnabled: false,
      enabled: true,
      formats: ['PNG', 'JPEG'],
      fileName: 'iVolve_exported_chart'
    }
  }).dxChart('instance');
  $('#datagrid').dxDataGrid({
    palette: 'bright',
    dataSource: states,
    title: 'Top 10 Most Populated States in US',
    columns: [{
      dataField: 'name',
      caption: 'State Name',
      allowHeaderFiltering: false
    }, {
      dataField: 'population',
      caption: 'Population',
      allowHeaderFiltering: false,
      format: {
        type: 'fixedPoint',
        precision: 2
      },
      summaryType: 'sum',
      calculateCustomSummary: function calculateCustomSummary(options) {
        if (options.name === 'sum') {
          options.totalValue = 0;
          options.totalValue += options.value;
        }
      }
    }, {
      dataField: 'capital',
      caption: 'Capital',
      allowHeaderFiltering: false
    }, {
      dataField: 'area',
      caption: 'Area km²',
      allowHeaderFiltering: false,
      customizeText: function customizeText(cellInfo) {
        return cellInfo.value + ' km²';
      }
    }, {
      dataField: 'older',
      caption: 'Older Than 65',
      allowHeaderFiltering: false
    }, {
      dataField: 'region',
      caption: 'Region',
      allowSelectAll: false
    }, {
      dataField: 'region',
      groupIndex: 0
    }],
    summary: {
      totalItems: [{
        column: 'population',
        summaryType: 'sum',
        cssClass: "total-population",
        customizeText: function customizeText(data) {
          return 'Total Population: ' + data.value;
        }
      }]
    },
    onRowClick: function onRowClick(e) {
      var rowData = e.data;
      var correspondingData = transformedData.find(function (item) {
        return item.state === rowData.name && (item.populationOlderThan65 === rowData.population || item.populationYoungerThan65 === rowData.population);
      });
      highlightBarChart(correspondingData);
    }
  }).dxDataGrid('instance');
  var transformedData = [];
  states.forEach(function (state) {
    if (state.older === 'Yes') {
      var populationOlderThan65 = state.population;
    } else {
      var populationYoungerThan65 = state.population;
    }

    transformedData.push({
      state: state.name,
      populationOlderThan65: populationOlderThan65,
      populationYoungerThan65: populationYoungerThan65,
      area: state.area
    });
  });
  $('#bar-chart').dxChart({
    palette: 'bright',
    dataSource: transformedData,
    title: 'Population Distribution by Age Group in US',
    series: [{
      type: 'stackedBar',
      argumentField: 'state',
      valueField: 'populationOlderThan65',
      name: 'Population Older Than 65 Years'
    }, {
      type: 'stackedBar',
      argumentField: 'state',
      valueField: 'populationYoungerThan65',
      name: 'Population Younger Than 65 Years'
    }],
    tooltip: {
      enabled: true,
      customizeTooltip: function customizeTooltip(arg) {
        var data = arg.point.data;
        var areaInSquareMiles = data.area / 2.58998811;
        return {
          text: 'Area: ' + data.area + ' km² (' + areaInSquareMiles.toFixed(0) + ' mi²)'
        };
      }
    }
  });
});

function highlightBarChart(data) {
  $('.highlighted').removeClass('highlighted');
  var chartInstance = $('#bar-chart').dxChart('instance');
  var series = chartInstance.getAllSeries();

  for (var i = 0; i < series.length; i++) {
    var seriesData = series[i].getAllPoints();

    for (var j = 0; j < seriesData.length; j++) {
      var point = seriesData[j];

      if (point.data.state === data.state && (point.data.populationOlderThan65 === data.populationOlderThan65 || point.data.populationYoungerThan65 === data.populationYoungerThan65)) {
        point.select();
        var barElement = point.fullState().element;
        $(barElement).addClass('highlighted');
      }
    }
  }
}

var zoomingData = [{
  arg: 10,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 20,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 40,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 50,
  y1: -39,
  y2: 50,
  y3: 19
}, {
  arg: 60,
  y1: -10,
  y2: 10,
  y3: 15
}, {
  arg: 75,
  y1: 10,
  y2: 10,
  y3: 15
}, {
  arg: 80,
  y1: 30,
  y2: 50,
  y3: 13
}, {
  arg: 90,
  y1: 40,
  y2: 50,
  y3: 14
}, {
  arg: 100,
  y1: 50,
  y2: 90,
  y3: 90
}, {
  arg: 105,
  y1: 40,
  y2: 175,
  y3: 120
}, {
  arg: 110,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 120,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 130,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 140,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 150,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 160,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 170,
  y1: -39,
  y2: 50,
  y3: 19
}, {
  arg: 180,
  y1: -10,
  y2: 10,
  y3: 15
}, {
  arg: 185,
  y1: 10,
  y2: 10,
  y3: 15
}, {
  arg: 190,
  y1: 30,
  y2: 100,
  y3: 13
}, {
  arg: 200,
  y1: 40,
  y2: 110,
  y3: 14
}, {
  arg: 210,
  y1: 50,
  y2: 90,
  y3: 90
}, {
  arg: 220,
  y1: 40,
  y2: 95,
  y3: 120
}, {
  arg: 230,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 240,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 255,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 270,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 280,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 290,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 295,
  y1: -39,
  y2: 50,
  y3: 19
}, {
  arg: 300,
  y1: -10,
  y2: 10,
  y3: 15
}, {
  arg: 310,
  y1: 10,
  y2: 10,
  y3: 15
}, {
  arg: 320,
  y1: 30,
  y2: 100,
  y3: 13
}, {
  arg: 330,
  y1: 40,
  y2: 110,
  y3: 14
}, {
  arg: 340,
  y1: 50,
  y2: 90,
  y3: 90
}, {
  arg: 350,
  y1: 40,
  y2: 95,
  y3: 120
}, {
  arg: 360,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 367,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 370,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 380,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 390,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 400,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 410,
  y1: -39,
  y2: 50,
  y3: 19
}, {
  arg: 420,
  y1: -10,
  y2: 10,
  y3: 15
}, {
  arg: 430,
  y1: 10,
  y2: 10,
  y3: 15
}, {
  arg: 440,
  y1: 30,
  y2: 100,
  y3: 13
}, {
  arg: 450,
  y1: 40,
  y2: 110,
  y3: 14
}, {
  arg: 460,
  y1: 50,
  y2: 90,
  y3: 90
}, {
  arg: 470,
  y1: 40,
  y2: 95,
  y3: 120
}, {
  arg: 480,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 490,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 500,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 510,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 520,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 530,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 540,
  y1: -39,
  y2: 50,
  y3: 19
}, {
  arg: 550,
  y1: -10,
  y2: 10,
  y3: 15
}, {
  arg: 555,
  y1: 10,
  y2: 10,
  y3: 15
}, {
  arg: 560,
  y1: 30,
  y2: 100,
  y3: 13
}, {
  arg: 570,
  y1: 40,
  y2: 110,
  y3: 14
}, {
  arg: 580,
  y1: 50,
  y2: 90,
  y3: 90
}, {
  arg: 590,
  y1: 40,
  y2: 95,
  y3: 12
}, {
  arg: 600,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 610,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 620,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 630,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 640,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 650,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 660,
  y1: -39,
  y2: 50,
  y3: 19
}, {
  arg: 670,
  y1: -10,
  y2: 10,
  y3: 15
}, {
  arg: 680,
  y1: 10,
  y2: 10,
  y3: 15
}, {
  arg: 690,
  y1: 30,
  y2: 100,
  y3: 13
}, {
  arg: 700,
  y1: 40,
  y2: 110,
  y3: 14
}, {
  arg: 710,
  y1: 50,
  y2: 90,
  y3: 90
}, {
  arg: 720,
  y1: 40,
  y2: 95,
  y3: 120
}, {
  arg: 730,
  y1: 20,
  y2: 190,
  y3: 130
}, {
  arg: 740,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 750,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 760,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 770,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 780,
  y1: -20,
  y2: 20,
  y3: 30
}, {
  arg: 790,
  y1: -39,
  y2: 50,
  y3: 19
}, {
  arg: 800,
  y1: -10,
  y2: 10,
  y3: 15
}, {
  arg: 810,
  y1: 10,
  y2: 10,
  y3: 15
}, {
  arg: 820,
  y1: 30,
  y2: 100,
  y3: 13
}, {
  arg: 830,
  y1: 40,
  y2: 110,
  y3: 14
}, {
  arg: 840,
  y1: 50,
  y2: 90,
  y3: 90
}, {
  arg: 850,
  y1: 40,
  y2: 95,
  y3: 120
}, {
  arg: 860,
  y1: -12,
  y2: 10,
  y3: 32
}, {
  arg: 870,
  y1: -32,
  y2: 30,
  y3: 12
}, {
  arg: 880,
  y1: -20,
  y2: 20,
  y3: 30
}];
var states = [{
  name: 'California',
  population: 38802500 * 0.3,
  capital: 'Sacramento',
  area: 423967,
  region: 'East US',
  older: 'Yes'
}, {
  name: 'California',
  population: 38802500 * 0.7,
  capital: 'Sacramento',
  area: 423967,
  region: 'East US',
  older: 'No'
}, {
  name: 'Texas',
  population: 26956958 * 0.4,
  capital: 'Austin',
  area: 695662,
  region: 'South US',
  older: 'Yes'
}, {
  name: 'Texas',
  population: 26956958 * 0.6,
  capital: 'Austin',
  area: 695662,
  region: 'South US',
  older: 'No'
}, {
  name: 'Florida',
  population: 19893297 * 0.86,
  capital: 'Tallahassee',
  area: 170312,
  region: 'South US',
  older: 'Yes'
}, {
  name: 'Florida',
  population: 19893297 * 0.14,
  capital: 'Tallahassee',
  area: 170312,
  region: 'South US',
  older: 'No'
}, {
  name: 'New York',
  population: 19746227 * 0.8,
  capital: 'Albany',
  area: 141297,
  region: 'North US',
  older: 'No'
}, {
  name: 'New York',
  population: 19746227 * 0.2,
  capital: 'Albany',
  area: 141297,
  region: 'North US',
  older: 'Yes'
}, {
  name: 'Illinois',
  population: 12880580 * 0.76,
  capital: 'Springfield',
  area: 149995,
  region: 'East US',
  older: 'No'
}, {
  name: 'Illinois',
  population: 12880580 * 0.24,
  capital: 'Springfield',
  area: 149995,
  region: 'East US',
  older: 'Yes'
}, {
  name: 'Pennsylvania',
  population: 12787209 * 0.35,
  capital: 'Harrisburg',
  area: 119280,
  region: 'East US',
  older: 'Yes'
}, {
  name: 'Pennsylvania',
  population: 12787209 * 0.65,
  capital: 'Harrisburg',
  area: 119280,
  region: 'East US',
  older: 'No'
}, {
  name: 'Ohio',
  population: 11594163 * 0.5,
  capital: 'Columbus',
  area: 116098,
  region: 'East US',
  older: 'Yes'
}, {
  name: 'Ohio',
  population: 11594163 * 0.5,
  capital: 'Columbus',
  area: 116098,
  region: 'East US',
  older: 'No'
}, {
  name: 'Georgia',
  population: 10097343 * 0.41,
  capital: 'Atlanta',
  area: 153910,
  region: 'East US',
  older: 'Yes'
}, {
  name: 'Georgia',
  population: 10097343 * 0.59,
  capital: 'Atlanta',
  area: 153910,
  region: 'East US',
  older: 'No'
}, {
  name: 'North Carolina',
  population: 9943964 * 0.7,
  capital: 'Raleigh',
  area: 139391,
  region: 'East US',
  older: 'No'
}, {
  name: 'North Carolina',
  population: 9943964 * 0.3,
  capital: 'Raleigh',
  area: 139391,
  region: 'East US',
  older: 'Yes'
}, {
  name: 'Michigan',
  population: 9909877 * 0.4,
  capital: 'Lansing',
  area: 250487,
  region: 'North US',
  older: 'Yes'
}, {
  name: 'Michigan',
  population: 9909877 * 0.6,
  capital: 'Lansing',
  area: 250487,
  region: 'North US',
  older: 'No'
}];