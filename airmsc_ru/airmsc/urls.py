from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^$', 'airmsc_main.views.home', name='home'),
    url(r'^process/', 'airmsc_main.views.process', name='process'),
    url(r'^activation/', 'airmsc_main.views.activation', name='activation'),
    url(r'^unsubscribe/', 'airmsc_main.views.unsubscribe', name='unsubscribe'),
    url(r'^login/', 'airmsc_main.views.user_login', name='user_login'),
    url(r'^loginform/', 'airmsc_main.views.login_form', name='login_form'),
    url(r'^change/', 'airmsc_main.views.change', name='change'),
    url(r'^charts-data/', 'airmsc_main.views.get_data_for_chart', name='charts_data'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^django-rq/', include('django_rq.urls')),
]
