#!/bin/bash

NAME=airmsc
HOMEDIR=/home/djangoair/airmsc
SOCKFILE=/tmp/${NAME}.sock
NUM_WORKERS=3
DJANGO_SETTINGS_MODULE=airmsc.settings
DJANGODIR=/home/djangoair/airmsc/air/airmsc_ru

DJANGO_WSGI_MODULE=${NAME}.wsgi
GUNICORN=${HOMEDIR}/bin/gunicorn

cd /home/djangoair/airmsc/air/airmsc_ru
source ${HOMEDIR}/bin/activate

# Если по какой-то причине директории с SOCKFILE не существует -- создаем её
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR
 
# Запускаем наш Django-проект
# Опционально можем записывать Debug в лог файлы (или другие файлы)


exec ${GUNICORN} ${DJANGO_WSGI_MODULE}:application \
  --workers $NUM_WORKERS \
  --bind unix:${SOCKFILE} \
# --log-level=debug \
# --log-file=-


