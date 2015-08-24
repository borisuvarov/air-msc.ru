#!/bin/bash

NAME=rqworker_worker
DJANGO_SETTINGS_MODULE=airmsc.settings
DJANGODIR=/home/djangoair/airmsc/air/airmsc_ru
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

cd /home/djangoair/airmsc/air/airmsc_ru
source /home/djangoair/airmsc/bin/activate
export DJANGO_SETTINGS_MODULE="airmsc.settings"

exec /home/djangoair/airmsc/bin/rqworker --url redis://localhost:6379
