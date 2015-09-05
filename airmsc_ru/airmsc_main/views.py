from django.shortcuts import render
from .forms import MemberModelForm
from .models import Member, MemberData
from django.template.loader import render_to_string
from django.template import Context
from django.core import mail
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
import hashlib
import random
import sys
from redis import Redis
from rq import Queue

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
        sys.stdout.write('юзер из ноне')
        return render(request, template)


@login_required
def change(request):
    member_data = MemberData.objects.get(member=request.user)
    true_list = request.POST.dict()['stations'].split(",")
    for station in list(clean_subscribitions_dict.keys()):
        if station in true_list:
            member_data.__dict__[station] = True
    member_data.save()
    template = "unsubscribe_success.html"
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
            sys.stdout.write(str(e))

        if new_member:
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:5]
            acthash = hashlib.sha1(salt.encode('utf-8') + email.encode('utf-8')).hexdigest()
            new_subscribition = MemberData.objects.create(
                member=new_member,
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
            sender = 'moscowaircom@yandex.ru'
            emailvars = {'hash': 'http://air-msc.ru/activation/'
                         + '?' + 'pochta=' + email + '&' + 'hash=' + acthash
                         }
            email_content_context = Context(emailvars)
            msg_plain = render_to_string('email_activation.html',
                                         email_content_context)
            msg_html = render_to_string('email_activation.html',
                                        email_content_context)
            # mail.send_mail(subject, msg_plain, sender, [email],
            #                html_message=msg_html, fail_silently=False)
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
