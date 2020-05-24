# from django.db import models
from djongo import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
import django.utils.timezone
import uuid
# Create your models here.


class Employee(AbstractUser):
	user_id = models.CharField(default= uuid.uuid1().hex ,max_length=250,unique=True,blank=True)
	role = models.CharField(max_length=250,default="USER")
	name = models.CharField(max_length=250,blank=True)
	email = models.CharField(max_length=250,blank=True)
	gender = models.CharField(max_length=250,blank=True)
	date  = models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')
	isActive = models.BooleanField(default=True)
	houseNumber =  models.CharField(max_length=250,blank=True)
	street = models.CharField(max_length=250,blank=True)
	addressLine = models.CharField(max_length=250,blank=True)
	mobileNumber= models.CharField(max_length=250,blank=True)
	country = models.CharField(max_length=250,default='India')
	designation = models.CharField(max_length=250,blank=True)