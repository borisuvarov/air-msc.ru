$(function() {

    var samplePayload = {'station': 'kapotnya'};


    $.get('/charts-data/', samplePayload, function(rawData) {drawChart(rawData, 'NO2')}, 'json');

    function drawChart(rawData, poison) {
        var chartData = [];
        $.each(rawData, function(index, value) {
            var dataPiece = {};
            dataPiece['date'] = new Date(Object.keys(rawData)[index]);
            $.each(value, function(index, arr) {
                if (arr[poison] != undefined) {
                    dataPiece[poison] = arr[poison];
                    console.log(dataPiece);
                    chartData.push(dataPiece);
                }
            })
        });
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
                "lineThickness": 2,
                "lineColor": "red",
                "negativeLineColor": "green",
                "negativeBase": 12,
                "valueField": "NO2"
            }
            //{
            //    "id": "g2",
            //    "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[category]]</span><br>[[value]]</div>",
            //    "bullet": "round",
            //    "bulletBorderAlpha": 1,
            //    "bulletBorderColor": "#FFFFFF",
            //    "hideBulletsCount": 50,
            //    "lineThickness": 2,
            //    "lineColor": "red",
            //    "negativeLineColor": "green",
            //    "negativeBase": 12,
            //    "valueField": "NO (Оксид азота)"
            //}
            ],
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
