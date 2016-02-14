ymaps.ready(init);

var myMap,
    app,
    subscribitionsList,
    donskoyshabolovka,
    donskoychura,
    danilovskiy,
    zapbirulovo,
    orekhovo,
    tsarytsyno,
    konkovo,
    akademicheskiy,
    gagarinskiy,
    southbutovo,
    marinskiypark,
    lyblinogolovach,
    lublinosovkhoz,
    ryazanskiy,
    kapotnya,
    pechatniki,
    losiniyostrov,
    kosino,
    kozhuhovo,
    meschansky,
    basmanniykazakova,
    basmanniyspartak,
    presnenskiy,
    tverskoy,
    khamovniki,
    bogorodskoe,
    southmedvedkovo,
    ostankinskiy,
    aeroport,
    savelovskiy,
    dmitrovskiy,
    sokol,
    pokrovskoestreshnevo,
    northtushino,
    khoroshevomnevniki,
    ramenki,
    troparevonikulino,
    mozhaisky,
    dorogomilovo,
    scherbinka,
    salarievo;

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 11
    });

    meschansky = new ymaps.Placemark([55.774705, 37.627355], {
        hintContent: 'Мещанский',
        id: 'meschansky'
    });

    donskoyshabolovka = new ymaps.Placemark([55.714825, 37.604637], {
        hintContent: 'Донской (Шаболовка)',
        id: 'donskoyshabolovka'
    });

    basmanniykazakova = new ymaps.Placemark([55.762819, 37.663782], {
        hintContent: 'Басманный (Казакова)',
        id: 'basmanniykazakova'

    });

    tverskoy = new ymaps.Placemark([55.774922, 37.594225], {
        hintContent: 'Тверской',
        id: 'tverskoy'
    });

    presnenskiy = new ymaps.Placemark([55.759051, 37.595905], {
        hintContent: 'Пресненский',
        id: 'presnenskiy'
    });

    donskoychura = new ymaps.Placemark([55.70005, 37.609317], {
        hintContent: 'Донской (Чура)',
        id: 'donskoychura'
    });

    danilovskiy = new ymaps.Placemark([55.707552, 37.66291], {
        hintContent: 'Даниловский',
        id: 'danilovskiy'
    });

    zapbirulovo = new ymaps.Placemark([55.579653, 37.645842], {
        hintContent: 'Западное Бирюлево',
        id: 'zapbirulovo'
    });

    orekhovo = new ymaps.Placemark([55.605541, 37.751134], {
        hintContent: 'Орехово-Борисово Южное',
        id: 'orekhovo'
    });

    tsarytsyno = new ymaps.Placemark([55.635243, 37.658122], {
        hintContent: 'Царицыно',
        id: 'tsarytsyno'
    });

    konkovo = new ymaps.Placemark([55.646878, 37.552193], {
        hintContent: 'Коньково',
        id: 'konkovo'
    });

    akademicheskiy = new ymaps.Placemark([55.679961, 37.583607], {
        hintContent: 'Академический',
        id: 'akademicheskiy'
    });

    gagarinskiy = new ymaps.Placemark([55.708785, 37.582403], {
        hintContent: 'Гагаринский',
        id: 'gagarinskiy'
    });

    southbutovo = new ymaps.Placemark([55.535707, 37.579394], {
        hintContent: 'Южное Бутово',
        id: 'southbutovo'
    });

    marinskiypark = new ymaps.Placemark([55.652136, 37.750316], {
        hintContent: 'Марьинский парк',
        id: 'marinskiypark'
    });

    lyblinogolovach = new ymaps.Placemark([55.67622, 37.817933], {
        hintContent: 'Люблино (Головачёва)',
        id: 'lyblinogolovach'
    });

    lublinosovkhoz = new ymaps.Placemark([55.66927, 37.742097], {
        hintContent: 'Люблино (Совхозная)',
        id: 'lublinosovkhoz'
    });

    ryazanskiy = new ymaps.Placemark([55.720322, 37.795987], {
        hintContent: 'Рязанский',
        id: 'ryazanskiy'
    });

    kapotnya = new ymaps.Placemark([55.641869, 37.801377], {
        hintContent: 'Капотня',
        id: 'kapotnya'
    });

    pechatniki = new ymaps.Placemark([55.678981, 37.717231], {
        hintContent: 'Печатники',
        id: 'pechatniki'
    });

    losiniyostrov = new ymaps.Placemark([55.859443, 37.84181], {
        hintContent: 'Лосиный остров',
        id: 'losiniyostrov'
    });

    kosino = new ymaps.Placemark([56.002269, 37.836995], {
        hintContent: 'Косино',
        id: 'kosino'
    });

    kozhuhovo = new ymaps.Placemark([55.72305, 37.908393], {
        hintContent: 'Кожухово',
        id: 'kozhuhovo'
    });

    basmanniyspartak = new ymaps.Placemark([55.775636, 37.684587], {
        hintContent: 'Басманный (Спартаковская)',
        id: 'basmanniyspartak'
    });

    khamovniki = new ymaps.Placemark([55.719749, 37.569809], {
        hintContent: 'Хамовники',
        id: 'khamovniki'
    });

    bogorodskoe = new ymaps.Placemark([55.814108, 37.717321], {
        hintContent: 'Богородское',
        id: 'bogorodskoe'
    });

    southmedvedkovo = new ymaps.Placemark([55.873935, 37.639491], {
        hintContent: 'Южное Медведково',
        id: 'southmedvedkovo'
    });

    ostankinskiy = new ymaps.Placemark([55.818463, 37.614752], {
        hintContent: 'Останкинский',
        id: 'ostankinskiy'
    });

    aeroport = new ymaps.Placemark([55.802341, 37.529151], {
        hintContent: 'Аэропорт',
        id: 'aeroport'
    });

    savelovskiy = new ymaps.Placemark([55.792696, 37.57802], {
        hintContent: 'Савёловский',
        id: 'savelovskiy'
    });

    dmitrovskiy = new ymaps.Placemark([55.891936, 37.537865], {
        hintContent: 'Дмитровский',
        id: 'dmitrovskiy'
    });

    sokol = new ymaps.Placemark([55.814259, 37.488619], {
        hintContent: 'Сокол',
        id: 'sokol'
    });

    pokrovskoestreshnevo = new ymaps.Placemark([55.914625, 37.730446], {
        hintContent: 'Покровское-Стрешнево',
        id: 'pokrovskoestreshnevo'
    });

    northtushino = new ymaps.Placemark([55.855558, 37.423419], {
        hintContent: 'Северное Тушино',
        id: 'northtushino'
    });

    khoroshevomnevniki = new ymaps.Placemark([55.829987, 37.308552], {
        hintContent: 'Хорошево-Мневники',
        id: 'khoroshevomnevniki'
    });

    ramenki = new ymaps.Placemark([55.702987, 37.53093], {
        hintContent: 'Раменки',
        id: 'ramenki'
    });

    troparevonikulino = new ymaps.Placemark([55.658484, 37.471345], {
        hintContent: 'Тропарёво-Никулино',
        id: 'troparevonikulino'
    });

    mozhaisky = new ymaps.Placemark([55.720271, 37.405732], {
        hintContent: 'Можайский',
        id: 'mozhaisky'
    });

    dorogomilovo = new ymaps.Placemark([55.737811, 37.533508], {
        hintContent: 'Дорогомилово',
        id: 'dorogomilovo'
    });

    scherbinka = new ymaps.Placemark([55.506954, 37.563269], {
        hintContent: 'Щербинка',
        id: 'scherbinka'
    });

    salarievo = new ymaps.Placemark([55.61962, 37.430777], {
        hintContent: 'Саларьево',
        id: 'salarievo'
    });

    myMap.controls.add('zoomControl');

    myMap.geoObjects.add(meschansky);
    myMap.geoObjects.add(donskoyshabolovka);
    myMap.geoObjects.add(basmanniykazakova);
    myMap.geoObjects.add(tverskoy);
    myMap.geoObjects.add(presnenskiy);
    myMap.geoObjects.add(danilovskiy);
    myMap.geoObjects.add(donskoychura);
    myMap.geoObjects.add(zapbirulovo);
    myMap.geoObjects.add(orekhovo);
    myMap.geoObjects.add(tsarytsyno);
    myMap.geoObjects.add(konkovo);
    myMap.geoObjects.add(akademicheskiy);
    myMap.geoObjects.add(gagarinskiy);
    myMap.geoObjects.add(southbutovo);
    myMap.geoObjects.add(marinskiypark);
    myMap.geoObjects.add(lyblinogolovach);
    myMap.geoObjects.add(lublinosovkhoz);
    myMap.geoObjects.add(ryazanskiy);
    myMap.geoObjects.add(kapotnya);
    myMap.geoObjects.add(pechatniki);
    myMap.geoObjects.add(losiniyostrov);
    myMap.geoObjects.add(kosino);
    myMap.geoObjects.add(kozhuhovo);
    myMap.geoObjects.add(basmanniyspartak);
    myMap.geoObjects.add(khamovniki);
    myMap.geoObjects.add(bogorodskoe);
    myMap.geoObjects.add(southmedvedkovo);
    myMap.geoObjects.add(ostankinskiy);
    myMap.geoObjects.add(aeroport);
    myMap.geoObjects.add(savelovskiy);
    myMap.geoObjects.add(dmitrovskiy);
    myMap.geoObjects.add(sokol);
    myMap.geoObjects.add(pokrovskoestreshnevo);
    myMap.geoObjects.add(northtushino);
    myMap.geoObjects.add(khoroshevomnevniki);
    myMap.geoObjects.add(ramenki);
    myMap.geoObjects.add(troparevonikulino);
    myMap.geoObjects.add(mozhaisky);
    myMap.geoObjects.add(dorogomilovo);
    myMap.geoObjects.add(scherbinka);
    myMap.geoObjects.add(salarievo);

    myMap.geoObjects.events.add('click', function(e) {
        app.selectOneStation(e);
    });

}

var processFormUrl = '/process/',
    loginFormUrl = '/login/',
    changeFormUrl = '/change/',
    $mainForm = $("#main_form"),
    $loginForm = $('#login_form'),
    $login = $('#login'),
    $messageBox = $('#message_box'),
    $ajaxContainer = $('.ajax-container');

(function() {
    app = {
            initialize: function() {
                this.setUpListeners();
                subscribitionsList = [];
            },

            setUpListeners: function() {
                $(document).ready(function() {
                    $mainForm.on('submit', app.submitMainForm);
                    $loginForm.on('submit', app.submitLoginForm);
                    $('#select_all').on('click', app.selectStations);
                    $('#unselect_all').on('click', app.unselectStations);
                    $login.on('click', function(e) {
                        e.preventDefault();
                        $mainForm.hide();
                        $login.hide();
                        $loginForm.show();
                        $('small').text('Введите email и пароль, которые вы использовали при подписке, и нажмите кнопку «Войти»')
                    });
                });
            },

            selectOneStation: function(e) {
                var stationId = e.get('target')['properties'].get('id'),
                    DOMstationId = '#' + stationId;
                $(DOMstationId).removeClass('unchosen').addClass('chosen');
                if (subscribitionsList.indexOf(stationId) < 0) {
                    subscribitionsList.push(stationId);
                }
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
                                $ajaxContainer.html(data);
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

                var submitBtn = $loginForm.find('button[type="submit"]');
                submitBtn.attr('disabled', 'disabled');
                var loginFormData = $loginForm.serialize();

                var ajaxResponse = app.loadAjax(loginFormUrl, loginFormData);
                ajaxResponse.done(function( data ) {
                    if (data.indexOf("alert-success") + 1) {
                        $ajaxContainer.html(data);
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
                var changeFormData = $changeForm.serialize();

                var ajaxResponse = app.loadAjax(changeFormUrl, changeFormData);
                ajaxResponse.done(function( data ) {
                    if (data.indexOf("alert-success") + 1) {
                            $ajaxContainer.html(data);
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

    };

    app.initialize();

}());
