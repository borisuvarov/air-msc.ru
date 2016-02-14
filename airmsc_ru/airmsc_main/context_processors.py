import datetime
import psycopg2


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
        with open('/home/djangoair/airmsc/air/airmsc_ru/airmsc/databasepswd.txt') as f:
            DATABASE_PASSWORD = f.read().strip()
        conn = psycopg2.connect(
            database="djangoair",
            user="djangoair",
            password=DATABASE_PASSWORD,
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
