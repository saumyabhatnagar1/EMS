# from django.db import models
import django.utils.timezone
from djongo import models


# Create your models here.


class Leave(models.Model):
    id = models.CharField(max_length=250, primary_key=True)
    emp_id = models.CharField(max_length=250)
    leave_type = models.CharField(max_length=250)
    date = models.DateField()
    description = models.CharField(max_length=250)
    posting_date = models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')
    admin_remark = models.CharField(max_length=250, blank=True)
    admin_remark_date = models.DateField(blank=True)
    status = models.IntegerField(default=0)
    is_read = models.BooleanField(default=False)


class LeaveType(models.Model):
    id = models.CharField(max_length=250, primary_key=True)
    value = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    createdOn = models.DateTimeField(default=django.utils.timezone.now, verbose_name='created date')
    number_of_leaves = models.IntegerField()
