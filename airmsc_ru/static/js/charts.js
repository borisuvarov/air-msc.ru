$(function() {

    var samplePayload = {'station': 'kapotnya'};


    $.get('/charts-data/', samplePayload, function(rawData) {drawCharts(rawData)}, 'json');
    
    function drawCharts(rawData) {
       $.each(rawData['poisons'], function(index, value) {
            var poison = value;
            $('#chartdiv').append('<div' + ' id="kapotnya-' + poison + '"></div>');
            drawChart(rawData, poison);
       });
    }

    function drawChart(rawData, poison) {
        var chartData = [];
        $.each(rawData['real_data'], function(date_key, value) {
	    var dataPiece = {};
            dataPiece['date'] = new Date(date_key);
            $.each(value, function(index, arr) {
                if (arr[poison] != undefined) {
                    dataPiece[poison] = arr[poison];
                    chartData.push(dataPiece);
                    console.log(dataPiece);
                }
            })
        });
        console.log(chartData);
        var chart = AmCharts.makeChart('kapotnya-SO2', {
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
                "negativeBase": 0.05,
		        "type": "smoothedLine",
                "valueField": poison
            }
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
