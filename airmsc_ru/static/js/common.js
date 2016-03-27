ymaps.ready(init);

var myMap,
    app,
    subscribitionsList;


function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 11,
        controls: ["zoomControl"]
    });

    myMap.controls.add('zoomControl');

    var stationPlacemarks = [
        new ymaps.Placemark([55.774705, 37.627355], {
            hintContent: 'Мещанский',
            id: 'meschansky'
        }),

        new ymaps.Placemark([55.714825, 37.604637], {
            hintContent: 'Донской (Шаболовка)',
            id: 'donskoyshabolovka'
        }),

        new ymaps.Placemark([55.762819, 37.663782], {
            hintContent: 'Басманный (Казакова)',
            id: 'basmanniykazakova'

        }),

        new ymaps.Placemark([55.774922, 37.594225], {
            hintContent: 'Тверской',
            id: 'tverskoy'
        }),

        new ymaps.Placemark([55.759051, 37.595905], {
            hintContent: 'Пресненский',
            id: 'presnenskiy'
        }),

        new ymaps.Placemark([55.70005, 37.609317], {
            hintContent: 'Донской (Чура)',
            id: 'donskoychura'
        }),

        new ymaps.Placemark([55.707552, 37.66291], {
            hintContent: 'Даниловский',
            id: 'danilovskiy'
        }),

        new ymaps.Placemark([55.579653, 37.645842], {
            hintContent: 'Западное Бирюлево',
            id: 'zapbirulovo'
        }),

        new ymaps.Placemark([55.605541, 37.751134], {
            hintContent: 'Орехово-Борисово Южное',
            id: 'orekhovo'
        }),

        new ymaps.Placemark([55.635243, 37.658122], {
            hintContent: 'Царицыно',
            id: 'tsarytsyno'
        }),

        new ymaps.Placemark([55.646878, 37.552193], {
            hintContent: 'Коньково',
            id: 'konkovo'
        }),

        new ymaps.Placemark([55.679961, 37.583607], {
            hintContent: 'Академический',
            id: 'akademicheskiy'
        }),

        new ymaps.Placemark([55.708785, 37.582403], {
            hintContent: 'Гагаринский',
            id: 'gagarinskiy'
        }),

        new ymaps.Placemark([55.535707, 37.579394], {
            hintContent: 'Южное Бутово',
            id: 'southbutovo'
        }),

        new ymaps.Placemark([55.652136, 37.750316], {
            hintContent: 'Марьинский парк',
            id: 'marinskiypark'
        }),

        new ymaps.Placemark([55.67622, 37.817933], {
            hintContent: 'Люблино (Головачёва)',
            id: 'lyblinogolovach'
        }),

        new ymaps.Placemark([55.66927, 37.742097], {
            hintContent: 'Люблино (Совхозная)',
            id: 'lublinosovkhoz'
        }),

        new ymaps.Placemark([55.720322, 37.795987], {
            hintContent: 'Рязанский',
            id: 'ryazanskiy'
        }),

        new ymaps.Placemark([55.641869, 37.801377], {
            hintContent: 'Капотня',
            id: 'kapotnya'
        }),

        new ymaps.Placemark([55.678981, 37.717231], {
            hintContent: 'Печатники',
            id: 'pechatniki'
        }),

        new ymaps.Placemark([55.859443, 37.84181], {
            hintContent: 'Лосиный остров',
            id: 'losiniyostrov'
        }),

        new ymaps.Placemark([56.002269, 37.836995], {
            hintContent: 'Косино',
            id: 'kosino'
        }),

        new ymaps.Placemark([55.72305, 37.908393], {
            hintContent: 'Кожухово',
            id: 'kozhuhovo'
        }),

        new ymaps.Placemark([55.775636, 37.684587], {
            hintContent: 'Басманный (Спартаковская)',
            id: 'basmanniyspartak'
        }),

        new ymaps.Placemark([55.719749, 37.569809], {
            hintContent: 'Хамовники',
            id: 'khamovniki'
        }),

        new ymaps.Placemark([55.814108, 37.717321], {
            hintContent: 'Богородское',
            id: 'bogorodskoe'
        }),

        new ymaps.Placemark([55.873935, 37.639491], {
            hintContent: 'Южное Медведково',
            id: 'southmedvedkovo'
        }),

        new ymaps.Placemark([55.818463, 37.614752], {
            hintContent: 'Останкинский',
            id: 'ostankinskiy'
        }),

        new ymaps.Placemark([55.802341, 37.529151], {
            hintContent: 'Аэропорт',
            id: 'aeroport'
        }),

        new ymaps.Placemark([55.792696, 37.57802], {
            hintContent: 'Савёловский',
            id: 'savelovskiy'
        }),

        new ymaps.Placemark([55.891936, 37.537865], {
            hintContent: 'Дмитровский',
            id: 'dmitrovskiy'
        }),

        new ymaps.Placemark([55.814259, 37.488619], {
            hintContent: 'Сокол',
            id: 'sokol'
        }),

        new ymaps.Placemark([55.914625, 37.730446], {
            hintContent: 'Покровское-Стрешнево',
            id: 'pokrovskoestreshnevo'
        }),

        new ymaps.Placemark([55.855558, 37.423419], {
            hintContent: 'Северное Тушино',
            id: 'northtushino'
        }),

        new ymaps.Placemark([55.829987, 37.308552], {
            hintContent: 'Хорошево-Мневники',
            id: 'khoroshevomnevniki'
        }),

        new ymaps.Placemark([55.702987, 37.53093], {
            hintContent: 'Раменки',
            id: 'ramenki'
        }),

        new ymaps.Placemark([55.658484, 37.471345], {
            hintContent: 'Тропарёво-Никулино',
            id: 'troparevonikulino'
        }),

        new ymaps.Placemark([55.720271, 37.405732], {
            hintContent: 'Можайский',
            id: 'mozhaisky'
        }),

        new ymaps.Placemark([55.737811, 37.533508], {
            hintContent: 'Дорогомилово',
            id: 'dorogomilovo'
        }),

        new ymaps.Placemark([55.506954, 37.563269], {
            hintContent: 'Щербинка',
            id: 'scherbinka'
        }),

        new ymaps.Placemark([55.61962, 37.430777], {
            hintContent: 'Саларьево',
            id: 'salarievo'
        })
    ];


    stationPlacemarks.forEach(function(item, i, stationPlacemarks) {
       item.options._options = {
            preset: 'islands#icon',
            iconColor: '#9c27b0'
       };
       myMap.geoObjects.add(item);
    });


    myMap.geoObjects.events.add('click', function(e) {
        app.selectOneStation(e);
    });

}


var processFormUrl = '/process/',
    loginFormUrl = '/loginform/',
    loginUrl = '/login/',
    changeFormUrl = '/change/',
    $mainForm = $("#main_form"),
    $login = $('#login'),
    $messageBox = $('#message_box'),
    $formAjaxContainer = $('.form-ajax-container'),
    chartD = $('#chartd'),
    translate_poisons = {
        'CO': 'CO (оксид углерода)',
        'NO2': 'NO\u2082 (диоксид азота)',
        'NO': 'NO (оксид азота)',
        'NOX': 'NO\u2093 (оксиды азота)',
        'CH4': 'CH\u2084 (метан)',
        'SO2': 'SO\u2082 (диоксид серы)',
        'NH3': 'NH\u2083 (аммиак)',
        'H2S': 'H\u2082S (сероводород)',
        'OZ': 'O\u2083 (озон)',
        'PHORMALDEHYDE': 'Формальдегид',
        'PHENOLE': 'Фенол',
        'BENZOLE': 'Бензол',
        'TOLUOLE': 'Толуол',
        'PARAXYLOLE': 'Параксилол',
        'STYROLE': 'Стирол',
        'ETB': 'ETB (этилбензол)',
        'NAPHTALYNE': 'Нафталин',
        'PM10': 'PM10 (взвешенные частицы менее 10 мкм)',
        'PM25': 'PM2.5 (взвешенные частицы менее 2.5 мкм)',
        'PM10_GRIMM': 'PM10 (взвешенные частицы менее 10 мкм)',
        'PM25_GRIMM': 'PM10 (взвешенные частицы менее 2.5 мкм)',
        'CH-': 'CH- (неметановые углеводороды',
        'CHX': 'CH\u2093 (углеводороды суммарные)'
    },
    negative_bases = {
        'CO': 5,
        'NO2': 0.2,
        'NO': 0.4,
        'NOX': 0.2,
        'CH4': 50,
        'SO2': 0.5,
        'NH3': 0.2,
        'H2S': 0.008,
        'OZ': 0.16,
        'PHORMALDEHYDE': 0.05,
        'PHENOLE': 0.01,
        'BENZOLE': 0.1,
        'TOLUOLE': 0.6,
        'PARAXYLOLE': 0.3,
        'STYROLE': 0.04,
        'ETB': 0.02,
        'NAPHTALYNE': 0.007,
        'PM10': 0.3,
        'PM25': 0.16,
        'PM10_GRIMM': 0.3,
        'PM25_GRIMM': 0.16,
        'CH-': 100,
        'CHX': 100
    };

(function() {
    app = {
            initialize: function() {
                this.setUpListeners();
                subscribitionsList = [];
            },

            setUpListeners: function() {
                $(document).ready(function() {
                    $mainForm.on('submit', app.submitMainForm);
                    $('#select_all').on('click', app.selectStations);
                    $('#unselect_all').on('click', app.unselectStations);
                    $login.on('click', app.loadLoginForm);
                });
            },

            selectOneStation: function(e) {
                $('.chartpoison').remove();
                $('.chartcaption').remove();
                var stationId = e.get('target')['properties'].get('id'),
                    DOMstationId = '#' + stationId;
                $(DOMstationId).removeClass('unchosen').addClass('chosen');
                if (subscribitionsList.indexOf(stationId) < 0) {
                    subscribitionsList.push(stationId);
                }

                var payload = {'station': stationId};
                $.get('/charts-data/', payload, function(rawData) {
                    $.each(rawData['poisons'], function(index, value) {
                        chartD.append('<div' + ' class="h3 chartcaption">'+ e.get('target')['properties']['_data']['hintContent'] + ' – ' + translate_poisons[value] + '</div>');
                        chartD.append('<div' + ' class="chartpoison" ' + 'id="' + value + '"></div>');
                    });
                    setTimeout(app.drawCharts(rawData), 1000);
                }, 'json');


            },

            selectStations: function(e) {
                e.preventDefault();
                $("p[class='unchosen']").removeClass('unchosen').addClass('chosen');
                subscribitionsList = ['donskoyshabolovka', 'donskoychura', 'danilovskiy',
                    'zapbirulovo', 'orekhovo', 'tsarytsyno', 'konkovo', 'akademicheskiy', 'gagarinskiy',
                    'southbutovo', 'marinskiypark', 'lyblinogolovach', 'lublinosovkhoz', 'ryazanskiy',
                    'kapotnya', 'pechatniki', 'losiniyostrov', 'kosino', 'kozhuhovo', 'meschansky',
                    'basmanniykazakova', 'basmanniyspartak', 'presnenskiy', 'tverskoy', 'khamovniki',
                    'bogorodskoe', 'southmedvedkovo', 'ostankinskiy', 'aeroport', 'savelovskiy',
                    'dmitrovskiy', 'sokol', 'pokrovskoestreshnevo', 'northtushino', 'khoroshevomnevniki',
                    'ramenki', 'troparevonikulino', 'mozhaisky', 'dorogomilovo', 'scherbinka', 'salarievo'
                ]
            },

            unselectStations: function(e) {
                e.preventDefault();
                $("p[class='chosen']").removeClass('chosen').addClass('unchosen');
                subscribitionsList = [];
            },


            loadAjax: function (url, data) {
                $.ajaxSetup({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
                        }
                    });

                return $.ajax({
                        url: url,
                        type: 'POST',
                        data: data
                    })
            },

            loadLoginForm: function(e) {
                e.preventDefault();
                var ajaxResponse = app.loadAjax(loginFormUrl, '');
                ajaxResponse.done(function( data ) {
                    if (data.indexOf("login_form") + 1) {
                            $formAjaxContainer.html(data);
                            $('small').text('Введите email и пароль, которые вы использовали при подписке, и нажмите кнопку «Войти»');
                        } else {
                            $messageBox.append(data);
                        }
                    })
                    .fail(function() {
                        $messageBox.append('<div id="error_message" class="alert alert-danger">ПРОИЗОШЛА ОШИБКА, ПОПРОБУЙТЕ ЕЩЁ РАЗ</div>').hide().fadeIn('fast');
                    })
                    .always(function() {
                        $('#login_form').on('submit', app.submitLoginForm);
                    })
            },

            submitMainForm: function(e) {
                e.preventDefault();
                $messageBox.empty();

                if (subscribitionsList.length === 0) {
                    $messageBox.append('<div id="error_message" class="alert alert-danger">Выберите хотя бы одну станцию!</div>');
                } else {
                    var submitBtn = $mainForm.find('button[type="submit"]');
                    submitBtn.attr('disabled', 'disabled');
                    var mainFormData = $mainForm.serialize() + "&stations=" + subscribitionsList.toString();

                    var ajaxResponse = app.loadAjax(processFormUrl, mainFormData);

                    ajaxResponse.done(function( data ) {
                        if (data.indexOf("alert-success") + 1) {
                                $formAjaxContainer.html(data);
                            } else {
                                $messageBox.append(data);
                            }
                        })
                        .fail(function() {
                            $messageBox.append('<div id="error_message" class="alert alert-danger">ПРОИЗОШЛА ОШИБКА, ПОПРОБУЙТЕ ЕЩЁ РАЗ</div>').hide().fadeIn('fast');
                        })
                        .always(function() {
                            submitBtn.removeAttr('disabled');
                        });
                }
            },

            submitLoginForm: function(e) {
                e.preventDefault();
                $messageBox.empty();

                var $loginForm = $('#login_form'),
                    submitBtn = $loginForm.find('button[type="submit"]');
                submitBtn.attr('disabled', 'disabled');
                var loginFormData = $loginForm.serialize();

                var ajaxResponse = app.loadAjax(loginUrl, loginFormData);
                ajaxResponse.done(function( data ) {
                    if (data.indexOf("alert-success") + 1) {
                        $formAjaxContainer.html(data);
                        $('small').hide();
                        $("#change-form").on('submit', app.submitChangeForm);
                    } else {
                        $messageBox.append(data);
                    }
                    })
                    .fail(function() {
			            $messageBox.append('<div id="error_message" class="alert alert-danger">ПРОИЗОШЛА ОШИБКА, ПОПРОБУЙТЕ ЕЩЁ РАЗ</div>').hide().fadeIn('fast');
                    })
                    .always(function() {
                        submitBtn.removeAttr('disabled');
                    });
            },

            submitChangeForm: function(e) {
                e.preventDefault();
                $messageBox.empty();
                var $changeForm = $("#change-form"),
                    submitBtn = $changeForm.find('button[type="submit"]');
                submitBtn.attr('disabled', 'disabled');
                var changeFormData = $changeForm.serialize() + "&stations=" + subscribitionsList.toString();

                var ajaxResponse = app.loadAjax(changeFormUrl, changeFormData);
                ajaxResponse.done(function( data ) {
                    if (data.indexOf("alert-success") + 1) {
                            $formAjaxContainer.html(data);
                        } else {
                            $messageBox.append(data);
                        }
                    })
                    .fail(function() {
			            $messageBox.append('<div id="error_message" class="alert alert-danger">ПРОИЗОШЛА ОШИБКА, ПОПРОБУЙТЕ ЕЩЁ РАЗ</div>').hide().fadeIn('fast');
                    })
                    .always(function() {
                        submitBtn.removeAttr('disabled');
                    });
            },

            drawCharts: function(rawData) {
               $.each(rawData['poisons'], function(index, value) {
                    app.drawChart(rawData, value);
               });
            },

            drawChart: function(rawData, poison) {
                var chartData = [];
                $.each(rawData['real_data'], function(date_key, value) {
                var dataPiece = {};
                    dataPiece['date'] = new Date(date_key);
                    $.each(value, function(index, arr) {
                        if (arr[poison] != undefined) {
                            dataPiece[poison] = arr[poison];
                            chartData.push(dataPiece);
                        }
                    })
                });
                AmCharts.makeChart(poison, {
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
                        "negativeBase": negative_bases[poison],
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
            }

    };

    app.initialize();



}());
