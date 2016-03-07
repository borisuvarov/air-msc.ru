import hashlib
import random
import sys
from redis import Redis
from rq import Queue
import psycopg2
import json
from collections import OrderedDict

from django.shortcuts import render, Http404
from django.http import JsonResponse
from django.conf import settings
from .forms import MemberModelForm
from .models import Member, MemberData
from django.template.loader import render_to_string
from django.template import Context
from django.core import mail
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required


Q = Queue(connection=Redis())

clean_subscribitions_dict = {
    'donskoyshabolovka': False,
    'donskoychura': False,
    'danilovskiy': False,
    'zapbirulovo': False,
    'orekhovo': False,
    'tsarytsyno': False,
    'konkovo': False,
    'akademicheskiy': False,
    'gagarinskiy': False,
    'southbutovo': False,
    'marinskiypark': False,
    'lyblinogolovach': False,
    'lublinosovkhoz': False,
    'ryazanskiy': False,
    'kapotnya': False,
    'pechatniki': False,
    'losiniyostrov': False,
    'kosino': False,
    'kozhuhovo': False,
    'meschansky': False,
    'basmanniykazakova': False,
    'basmanniyspartak': False,
    'presnenskiy': False,
    'tverskoy': False,
    'khamovniki': False,
    'bogorodskoe': False,
    'southmedvedkovo': False,
    'ostankinskiy': False,
    'aeroport': False,
    'savelovskiy': False,
    'dmitrovskiy': False,
    'sokol': False,
    'pokrovskoestreshnevo': False,
    'northtushino': False,
    'khoroshevomnevniki': False,
    'ramenki': False,
    'troparevonikulino': False,
    'mozhaisky': False,
    'dorogomilovo': False,
    'scherbinka': False,
    'salarievo': False,
}


def get_data_for_chart(request):
    station = request.GET.get('station')
    if station in clean_subscribitions_dict:
        conn = psycopg2.connect(
            database="djangoair",
            user="djangoair",
            password=settings.DATABASE_PASSWORD,
            host="127.0.0.1")
        cur = conn.cursor()
        cur.execute("SELECT DATE(checktime), substance, MAX(concentration) FROM mosecomon WHERE station='"
                    + station + "'" + "AND DATE(checktime) >= now() - INTERVAL '20 DAY' GROUP BY substance, DATE(checktime) ORDER BY DATE(checktime);")
        data = cur.fetchall()
        cur.close()
        conn.close()
        data_provider = OrderedDict()
        for entry in data:
            date = str(entry[0].date())
            if date not in data_provider:
                data_provider[date] = [(entry[1], entry[2])]
            else:
                data_provider[date].append((entry[1], entry[2]))

        return JsonResponse(data_provider)
    else:
        return Http404


def activation(request):
    pochta = request.GET.dict()['pochta']
    activationhash = request.GET.dict()['hash']
    try:
        member_mail = Member.objects.get(email=pochta)
        member_check = MemberData.objects.get(
            activation_hash=activationhash
            ).member
        if member_mail.email == member_check.email:
            member_mail.is_active = True
            member_mail.save()

        template = "activation_success.html"
        return render(request, template)
    except:
        pass


def user_login(request):
    pochta = request.POST.dict()['login']
    passwd = request.POST.dict()['password']
    user = authenticate(username=pochta, password=passwd)
    if user is not None:
        if user.is_active:
            login(request, user)
            member_data = MemberData.objects.get(member=user)
            for station in list(clean_subscribitions_dict.keys()):
                member_data.__dict__[station] = False
            member_data.save()
            template = "login_success.html"
            return render(request, template)
        else:
            template = "login_failed.html"
            return render(request, template)
    else:
        template = "login_failed.html"
        return render(request, template)


@login_required
def change(request):
    member_data = MemberData.objects.get(member=request.user)
    true_list = request.POST.dict()['stations'].split(",")
    for station in list(clean_subscribitions_dict.keys()):
        if station in true_list:
            member_data.__dict__[station] = True
    member_data.save()
    template = "change_success.html"
    return render(request, template)


def unsubscribe(request):
    pochta = request.GET.dict()['pochta']
    activationhash = request.GET.dict()['hash']
    try:
        subscriber = Member.objects.get(email=pochta)
        if subscriber.activation_hash == activationhash:
            subscriber.delete()
    except:
        pass

    form = MemberModelForm(request.POST or None)
    template = "unsubscribe_success.html"
    context = {"form": form}
    return render(request, template, context)


def home(request):
    form = MemberModelForm(request.POST or None)
    template = "base.html"
    context = {"form": form}
    return render(request, template, context)


def login_form(request):
    template = "login_form.html"
    return render(request, template)


def process(request):
    true_list = request.POST.dict()['stations'].split(",")
    for key in list(clean_subscribitions_dict.keys()):
        clean_subscribitions_dict[key] = False
        if key in true_list:
            clean_subscribitions_dict[key] = True

    form = MemberModelForm(request.POST or None)
    if form.is_valid():
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']
        try:
            new_member = Member.objects.create_user(email, password=password)
        except Exception as e:
            new_member = None
            sys.stdout.write(str(e))

        if new_member:
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:5]
            acthash = hashlib.sha1(salt.encode('utf-8') + email.encode('utf-8')).hexdigest()
            new_subscribition = MemberData.objects.create(
                member=new_member,
                subscribitions_count=len(true_list),
                subscribitions=str(true_list),
                activation_hash=acthash,
                donskoyshabolovka=clean_subscribitions_dict['donskoyshabolovka'],
                donskoychura=clean_subscribitions_dict['donskoychura'],
                danilovskiy=clean_subscribitions_dict['danilovskiy'],
                zapbirulovo=clean_subscribitions_dict['zapbirulovo'],
                orekhovo=clean_subscribitions_dict['orekhovo'],
                tsarytsyno=clean_subscribitions_dict['tsarytsyno'],
                konkovo=clean_subscribitions_dict['konkovo'],
                akademicheskiy=clean_subscribitions_dict['akademicheskiy'],
                gagarinskiy=clean_subscribitions_dict['gagarinskiy'],
                southbutovo=clean_subscribitions_dict['southbutovo'],
                marinskiypark=clean_subscribitions_dict['marinskiypark'],
                lyblinogolovach=clean_subscribitions_dict['lyblinogolovach'],
                lublinosovkhoz=clean_subscribitions_dict['lublinosovkhoz'],
                ryazanskiy=clean_subscribitions_dict['ryazanskiy'],
                kapotnya=clean_subscribitions_dict['kapotnya'],
                pechatniki=clean_subscribitions_dict['pechatniki'],
                losiniyostrov=clean_subscribitions_dict['losiniyostrov'],
                kosino=clean_subscribitions_dict['kosino'],
                kozhuhovo=clean_subscribitions_dict['kozhuhovo'],
                meschansky=clean_subscribitions_dict['meschansky'],
                basmanniykazakova=clean_subscribitions_dict['basmanniykazakova'],
                basmanniyspartak=clean_subscribitions_dict['basmanniyspartak'],
                presnenskiy=clean_subscribitions_dict['presnenskiy'],
                tverskoy=clean_subscribitions_dict['tverskoy'],
                khamovniki=clean_subscribitions_dict['khamovniki'],
                bogorodskoe=clean_subscribitions_dict['bogorodskoe'],
                southmedvedkovo=clean_subscribitions_dict['southmedvedkovo'],
                ostankinskiy=clean_subscribitions_dict['ostankinskiy'],
                aeroport=clean_subscribitions_dict['aeroport'],
                savelovskiy=clean_subscribitions_dict['savelovskiy'],
                dmitrovskiy=clean_subscribitions_dict['dmitrovskiy'],
                sokol=clean_subscribitions_dict['sokol'],
                pokrovskoestreshnevo=clean_subscribitions_dict[
                    'pokrovskoestreshnevo'],
                northtushino=clean_subscribitions_dict['northtushino'],
                khoroshevomnevniki=clean_subscribitions_dict['khoroshevomnevniki'],
                ramenki=clean_subscribitions_dict['ramenki'],
                troparevonikulino=clean_subscribitions_dict['troparevonikulino'],
                mozhaisky=clean_subscribitions_dict['mozhaisky'],
                dorogomilovo=clean_subscribitions_dict['dorogomilovo'],
                scherbinka=clean_subscribitions_dict['scherbinka'],
                salarievo=clean_subscribitions_dict['salarievo'],
            )

            new_subscribition.save()


            subject = 'Активация подписки на сайте air-msc.ru'
            sender = 'alert@air-msc.ru'
            emailvars = {'hash': 'http://air-msc.ru/activation/'
                         + '?' + 'pochta=' + email + '&' + 'hash=' + acthash
                         }
            email_content_context = Context(emailvars)
            msg_plain = render_to_string('email_activation.html',
                                         email_content_context)
            msg_html = render_to_string('email_activation.html',
                                        email_content_context)
            try:
                Q.enqueue_call(func=mail.send_mail,
                               args=(subject, msg_plain, sender, [email]),
                               kwargs=({'html_message': msg_html, 'fail_silently': False})
                               )
            except Exception as e:
                sys.stdout.write(str(e))

            template = "form_success.html"
            return render(request, template)

    template = "form_errors.html"
    context = {"form": form}
    return render(request, template, context)
