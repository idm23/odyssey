from django.contrib import admin
from .models import Lift, Run, Swim

# Register your models here.
admin.site.register(Lift)
admin.site.register(Run)
admin.site.register(Swim)

