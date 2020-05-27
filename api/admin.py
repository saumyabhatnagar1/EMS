from django.contrib import admin

# Register your models here.
from .models import Employee


class AdminUser(admin.ModelAdmin):
    pass


admin.site.register(Employee, AdminUser)
