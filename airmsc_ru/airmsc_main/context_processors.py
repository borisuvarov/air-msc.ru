import datetime
import psycopg2
from django.conf import settings


class UptimeCounter():
    def __init__(self):
        self.initial_uptime = self.calculate_uptime()
        self.last_calculation_time = datetime.date.today()

    @property
    def uptime(self):
        if self.last_calculation_time == datetime.date.today():
            return self.initial_uptime
        else:
            return self.calculate_uptime()

    def calculate_uptime(self):
        conn = psycopg2.connect(
            database="djangoair",
            user="djangoair",
            password=settings.DATABASE_PASSWORD,
            host="127.0.0.1")
        cur = conn.cursor()
        cur.execute("SELECT COUNT (DISTINCT((DATE(checktime)))) FROM mosecomon;")
        uptime = cur.fetchall()[0][0]
        cur.close()
        conn.close()
        return uptime

counter = UptimeCounter()


def add_uptime_to_context(request):
    return {'days': counter.uptime}
