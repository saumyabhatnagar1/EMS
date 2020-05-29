from django.contrib import admin

# Register your models here.
from .models import Employee
from .models import Leave,LeaveType


class AdminUser(admin.ModelAdmin):
    pass


admin.site.register(Employee, AdminUser)
admin.site.register(Leave)
admin.site.register(LeaveType)