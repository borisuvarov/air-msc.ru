var chartData = generatechartData();

function generatechartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 150);

    for (var i = 0; i < 150; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * 90 - 45);

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}


var chart = AmCharts.makeChart("chartdiv", {
    "theme": "light",
    "type": "serial",
    "dataProvider": chartData,
    "valueAxes": [{
        "inside":true,
        "axisAlpha": 0
    }],
    "graphs": [{
        "id":"g1",
        "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[category]]</span><br>[[value]]</div>",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletBorderColor": "#FFFFFF",
        "hideBulletsCount": 50,
        "fillAlphas": 1,
        "lineThickness": 2,
        "lineColor": "red",
        "negativeLineColor": "green",
        "negativeBase": 12,
        "valueField": "visits"
    }],
    "chartScrollbar": {

    },
    "chartCursor": {},
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisAlpha": 0,
        "minHorizontalGap": 55
    }
});

chart.addListener("dataUpdated", zoomChart);
zoomChart();

function zoomChart() {
    if (chart) {
        if (chart.zoomToIndexes) {
            chart.zoomToIndexes(130, chartData.length - 1);
        }
    }
}

