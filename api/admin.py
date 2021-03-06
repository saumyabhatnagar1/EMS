from django.contrib import admin

# Register your models here.
from .models import Employee
from .models import Leave, LeaveType
from .models import Project, Task, WorksOn
from .models import Timesheet
from .models import Notification


class AdminUser(admin.ModelAdmin):
    pass


admin.site.register(Employee, AdminUser)
admin.site.register(Leave)
admin.site.register(LeaveType)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(WorksOn)
admin.site.register(Timesheet)
admin.site.register(Notification)
