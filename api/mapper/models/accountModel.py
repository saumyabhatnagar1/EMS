# from django.db import models
import django.utils.timezone
from django.contrib.auth.models import AbstractUser
from djongo import models


# Create your models here.


class Employee(AbstractUser):
    role = models.CharField(max_length=250, default="USER")
    name = models.CharField(max_length=250, blank=True)
    email = models.CharField(max_length=250, blank=True)
    gender = models.CharField(max_length=250, blank=True)
    date = models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')
    isActive = models.BooleanField(default=True)
    houseNumber = models.CharField(max_length=250, blank=True)
    street = models.CharField(max_length=250, blank=True)
    addressLine = models.CharField(max_length=250, blank=True)
    mobileNumber = models.CharField(max_length=250, blank=True)
    country = models.CharField(max_length=250, default='India')
    designation = models.CharField(max_length=250, blank=True)
    isWorking = models.BooleanField(default=False)
    birthDay = models.DateField()
