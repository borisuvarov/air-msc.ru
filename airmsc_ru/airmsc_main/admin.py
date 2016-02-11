from django.contrib import admin
from .models import Member


class MemberAdmin(admin.ModelAdmin):
    list_display = ['email']

    class Meta:
        model = Member


admin.site.register(Member, MemberAdmin)
