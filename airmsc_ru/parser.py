#!/home/djangoair/airmsc/bin/python3

import requests
from lxml import html
import psycopg2
import datetime
import os
import sys
import django
from django.template.loader import render_to_string
from django.template import Context
from django.core import mail


# Make parser.py work with airmsc.models
# (do not move import at the beginning of file!)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "airmsc.settings")
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)
django.setup()
from airmsc_main.models import Member, MemberData


STATIONS_LINKS = [
    ('Мещанский', 'http://mosecom.ru/air/air-today/station/suhar/table.html',
    'meschansky'),
    ('Басманный (Казакова)',
     'http://mosecom.ru/air/air-today/station/kazak/table.html', 'basmanniykazakova'),
     ('Пресненский', 'http://mosecom.ru/air/air-today/station/spirid/table.html',
      'presnenskiy'),
     ('Басманный (Спартаковская)',
      'http://mosecom.ru/air/air-today/station/spartakovskaya/table.html', 'basmanniyspartak'),
     ('Хамовники', 'http://mosecom.ru/air/air-today/station/hamovniki/table.html',
      'khamovniki'),
     ('Тверской', 'http://www.mosecom.ru/air/air-today/station/chayanova/table.html', 'tverskoy'),
     ('Донской (Шаболовка)', 'http://mosecom.ru/air/air-today/station/shabol/table.html', 'donskoyshabolovka'),
     ('Донской (Чура)','http://mosecom.ru/air/air-today/station/chura/table.html', 'donskoychura'),
     ('Даниловский','http://mosecom.ru/air/air-today/station/kozuhovskaya/table.html', 'danilovskiy'),
     ('Западное Бирюлево','http://mosecom.ru/air/air-today/station/biryulevo/table.html', 'zapbirulovo'),
     ('Орехово-Борисово Южное','http://mosecom.ru/air/air-today/station/gurevsk/table.html', 'orekhovo'),
     ('Царицыно','http://mosecom.ru/air/air-today/station/proletarskiy/table.html', 'tsarytsyno'),
     ('Коньково','http://mosecom.ru/air/air-today/station/butlerova/table.html', 'konkovo'),
     ('Академический','http://mosecom.ru/air/air-today/station/cheremushki/table.html', 'akademicheskiy'),
     ('Гагаринский','http://mosecom.ru/air/air-today/station/gagrina/table.html', 'gagarinskiy'),
     ('Южное Бутово','http://mosecom.ru/air/air-today/station/melitopolskaya/table.html', 'southbutovo'),
     ('Марьинский парк','http://mosecom.ru/air/air-today/station/marin/table.html', 'marinskiypark'),
     ('Люблино (Совхозная)','http://mosecom.ru/air/air-today/station/lyublino/table.html', 'lublinosovkhoz'),
     ('Капотня','http://mosecom.ru/air/air-today/station/kapotnya/table.html', 'kapotnya'),
     ('Люблино (Головачёва)','http://mosecom.ru/air/air-today/station/golovacheva/table.html', 'lyblinogolovach'),
     ('Рязанский','http://mosecom.ru/air/air-today/station/veshnyaki/table.html', 'ryazanskiy'),
     ('Печатники','http://mosecom.ru/air/air-today/station/guryanova/table.html', 'pechatniki'),
    ('Лосиный остров','http://mosecom.ru/air/air-today/station/losinyj/table.html', 'losiniyostrov'),
    ('Косино','http://mosecom.ru/air/air-today/station/kosino/table.html', 'kosino'),
    ('Кожухово','http://mosecom.ru/air/air-today/station/kojuhovo/table.html', 'kozhuhovo'),
    ('Богородское','http://mosecom.ru/air/air-today/station/glebovskaya/table.html', 'bogorodskoe'),
    ('Южное Медведково','http://mosecom.ru/air/air-today/station/polyarnaya/table.html', 'southmedvedkovo'),
    ('Останкинский','http://mosecom.ru/air/air-today/station/ostankino/table.html', 'ostankinskiy'),
    ('Аэропорт','http://mosecom.ru/air/air-today/station/madi/table.html', 'aeroport'),
    ('Савеловский','http://mosecom.ru/air/air-today/station/maslovka/table.html', 'savelovskiy'),
    ('Дмитровский','http://mosecom.ru/air/air-today/station/dolgoprud/table.html', 'dmitrovskiy'),
    ('Сокол','http://mosecom.ru/air/air-today/station/svetly/table.html', 'sokol'),
    ('Покровское-Стрешнево','http://mosecom.ru/air/air-today/station/letnaya/table.html', 'pokrovskoestreshnevo'),
     ('Северное Тушино','http://mosecom.ru/air/air-today/station/turist/table.html', 'northtushino'),
     ('Хорошево-Мневники','http://mosecom.ru/air/air-today/station/narod_op/table.html', 'khoroshevomnevniki'),
     ('Раменки','http://mosecom.ru/air/air-today/station/mgu/table.html', 'ramenki'),
     ('Тропарево-Никулино','http://mosecom.ru/air/air-today/station/vernad/table.html', 'troparevonikulino'),
     ('Можайский','http://mosecom.ru/air/air-today/station/mojayskoe_sh/table.html', 'mozhaisky'),
     ('Дорогомилово','http://mosecom.ru/air/air-today/station/kutuz_2/table.html', 'dorogomilovo'),
     ('Щербинка','http://mosecom.ru/air/air-today/station/scherbinka/table.html', 'scherbinka'),
     ('Саларьево (Московский)','http://mosecom.ru/air/air-today/station/salarevo/table.html','salarievo'),
]


PDK = [
    ('CO (Оксид углерода)', 5),
    ('NO2 (Диоксид азота)', 0.2),
    ('NO (Оксид азота)', 0.4),
    ('CH4 (Метан)', 50),
    ('SO2 (Диоксид серы)', 0.5),
    ('NH3 (Аммиак)', 0.2),
    ('H2S (Сероводород)', 0.008),
    ('OZ (Озон)', 0.16),
    ('Формальдегид', 0.05),
    ('Фенол', 0.01),
    ('Бензол', 0.1),
    ('Толуол', 0.6),
    ('Параксилол', 0.3),
    ('Стирол', 0.04),
    ('ETB (Этилбензол)', 0.02),
    ('Нафталин', 0.007),
    ('PM10 (Взвешенные частицы менее 10 мкм)', 0.3),
    ('PM10 (Взвешенные частицы менее 10 мкм)', 0.16)
]

POISONS_NOPDK_TO_IGNORE = [
    'CH- (Неметановые углеводороды)',
    'CHX (Углеводороды суммарные)'
]


def get_actual_concentrations(parsed_body):
    table_headers = parsed_body.xpath(
        '/html/body/table/tr[1]/th[@class="header"]/text()')[1:]
    units_headers = parsed_body.xpath(
        '/html/body/table/tr[2]/td[@class="header"]/text()')

    parse_index = []
    counter = 0
    for poison in table_headers:
        if poison in POISONS_NOPDK_TO_IGNORE:
            parse_index.append([poison, units_headers[counter]])
            counter += 1
        else:
            parse_index.append(
                [poison, units_headers[counter], units_headers[counter + 1]])
            counter += 1

    columns_numbers = []
    number = 2
    for entry in parse_index:
        if len(entry) > 2:
            columns_numbers.append(number)
            number += 2
        else:
            columns_numbers.append(number)
            number += 1

    concentrations = []
    for number in columns_numbers:
        conc = parsed_body.xpath(
            ('/html/body/table/tr[last()]/td[{0}]/text()'.format(number)))
        conc = "".join(conc)
        concentrations.append(conc)

    all_concentrations = list(zip(table_headers, concentrations))
    actual_concentrations = []
    for poison_conc in all_concentrations:
        if poison_conc[0] in POISONS_NOPDK_TO_IGNORE:
            pass
        else:
            actual_concentrations.append(poison_conc)

    return actual_concentrations


# # Переделать под Celery
# def send_email(overpdk_list_all_stations):
#     subject = 'Предупреждение о загрязнении воздуха!'
#     sender = 'moscowaircom@yandex.ru'
#
#     recipients_and_stations = get_recipients(overpdk_list_all_stations)
#     for recipient in recipients_and_stations:
#         member = Member.objects.get(username=recipient)
#         if member.is_active:
#             station_names = ""
#             poison_names = ""
#             stations = list(recipients_and_stations[recipient])
#             acthash = member.activation_hash
#             for station in stations:
#                 if station_names:
#                     station_names = station_names + ", " + station[1]
#                 else:
#                     station_names = station_names + station[1]
#                 for station_and_poisons in overpdk_list_all_stations:
#                     if station_and_poisons[0][0] in station:
#                         poisons = station_and_poisons[1:]
#                         for poison in poisons:
#                             if poison_names and poison_names.find(poison[0]) == -1:
#                                 poison_names = poison_names + ", " + poison[0]
#                             elif not poison_names:
#                                 poison_names = poison_names + poison[0]
#                             else:
#                                 pass
#
#             emailvars = {'stations': station_names, 'poisons': poison_names, 'unsubscribe':
#                          'http://188.166.122.88/unsubscribe/' + '?' + 'pochta=' + recipient + '&'
#                          + 'hash=' + acthash}
#             email_content_context = Context(emailvars)
#             msg_plain = render_to_string('email_poison.html', email_content_context)
#             msg_html = render_to_string('email_poison.html', email_content_context)
#             mail.send_mail(subject, msg_plain, sender, [recipient],
#                            html_message=msg_html, fail_silently=False)
#         else:
#             pass

def get_recipients(overpdk_list_all_stations):
    recipients_and_stations = {}
    for station_data in overpdk_list_all_stations:
        station_name_id = station_data[0][1]
        station_name = station_data[0][0]
        query_parameter = 'memberdata__' + station_name_id
        filter_parameter = {query_parameter: True}
        recipients = Member.objects.filter(**filter_parameter)
        for recipient in recipients:
            address = recipient.username
            recipients_and_stations.setdefault(address, set())
            recipients_and_stations[address].add((station_name_id, station_name))     
    return recipients_and_stations



def main():
    sentinel = False
    overpdk_list_all_stations = []
    with open('/home/djangoair/airmsc/air/airmsc_ru/airmsc/databasepswd.txt') as f:
        DATABASE_PASSWORD = f.read().strip()

    conn = psycopg2.connect(
        database="djangoair",
        user="djangoair",
        password=DATABASE_PASSWORD,
        host="127.0.0.1")
    cur = conn.cursor()
    cur.execute(
        "CREATE TABLE IF NOT EXISTS mosecomon (id serial PRIMARY KEY, station varchar, checktime timestamp, substance varchar, concentration real);")
    conn.commit()
    for station in STATIONS_LINKS:
        response = requests.get(station[1])
        parsed_body = html.fromstring(response.text)
        actual_conc = get_actual_concentrations(parsed_body)
        datetime_of_check = datetime.datetime.now()
        station_name = station[2]
        overpdk_list_for_station = [(station[0], station_name)]

        for entry in actual_conc:
            substance = entry[0]
            if entry[1] != '—':
                concen = float(entry[1])
            else:
                concen = 0
            try:
                cur.execute(
                    "INSERT INTO mosecomon (station, checktime, substance, concentration) VALUES (%s, %s, %s, %s)",
                    (station_name, datetime_of_check, substance, concen))
                conn.commit()
                for pdk_tuple in PDK:
                    if substance == pdk_tuple[0] and concen >= pdk_tuple[1]:
                        sentinel = True
                        overpdk_list_for_station.append((substance, concen))
            except:
                print("Возникло исключение при записи в БД")
       
        overpdk_list_all_stations.append(overpdk_list_for_station)

    cur.close()
    conn.close()

#    if sentinel:
#        send_email(overpdk_list_all_stations)


if __name__ == '__main__':
    main()
