from django.contrib import admin
from .models import Member


class MemberAdmin(admin.ModelAdmin):
    list_display = ['email', 'stations_count']

    def stations_count(self):
        return self.memberdata_set.get().count()

    class Meta:
        model = Member


admin.site.register(Member, MemberAdmin)
