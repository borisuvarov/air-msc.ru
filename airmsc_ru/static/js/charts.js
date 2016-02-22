$(function() {

    var samplePayload = {'station': 'kapotnya'};


    $.get('/charts-data/', samplePayload, function(rawData) {drawChart(rawData)}, 'json');

    function drawChart(rawData) {
        console.log(rawData);
        var chartData = [];
        $.each(rawData, function(index, value) {
            $.each(value, function(index, arr) {

                var dataPiece = {};
                dataPiece['date'] = new Date(Object.keys(rawData)[index]);
                dataPiece[arr[0]] = arr[1];
                chartData.push(dataPiece);
            })
        });
        console.log(chartData);
        var chart = AmCharts.makeChart("chartdiv", {
            "theme": "light",
            "type": "serial",
            "dataProvider": chartData,
            "valueAxes": [{
                "inside": true,
                "axisAlpha": 0
            }],
            "graphs": [{
                "id": "g1",
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
            "chartScrollbar": {},
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
    }
});
