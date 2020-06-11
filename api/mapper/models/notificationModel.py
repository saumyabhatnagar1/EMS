from django.utils import timezone
from djongo import models


class Notification(models.Model):
    id = models.CharField(max_length=250, primary_key=True)
    title = models.CharField(max_length=250)
    description = models.TextField(max_length=1000)
    datetime = models.DateTimeField(default= timezone.now)
    type = models.CharField(max_length=50)
