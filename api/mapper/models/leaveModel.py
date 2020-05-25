# from django.db import models
from djongo import models
import django.utils.timezone
import uuid
# Create your models here.


class Leave(models.Model):
	id = models.CharField(max_length=250,default=uuid.uuid1().hex,primary_key=True)
	emp_id = models.CharField(max_length=250)
	leave_type = models.CharField(max_length=250)
	date = models.DateField()
	description= models.CharField(max_length=250)
	posting_date = models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')
	admin_remark = models.CharField(max_length=250,blank=True)
	admin_remark_date = models.DateField(blank=True)
	status = models.IntegerField(default=0)
	is_read = models.BooleanField(default=False)