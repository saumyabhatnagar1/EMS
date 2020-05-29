from djongo import models
import django.utils.timezone


class Project(models.Model):
    id = models.CharField(max_length=250, primary_key=True)
    name = models.CharField(max_length=250)
    description = models.TextField(max_length=250, blank=True)
    assignTo = models.TextField(max_length=250, blank=True)
    status = models.IntegerField(default=0)
    due = models.IntegerField(default=0)
    createdOn = models.DateTimeField(default=django.utils.timezone.now)
    deadline = models.DateField()
    customer_id = models.CharField(max_length=250)
    complete_percentage = models.FloatField(default=0.0)


class Task(models.Model):
    id = models.CharField(max_length=250, primary_key=True)
    title = models.CharField(max_length=250)
    description = models.TextField(max_length=250, blank=True)
    assignTo = models.TextField(max_length=250, blank=True)
    project_id = models.CharField(max_length=250)
    status = models.IntegerField(default=0)
    due = models.IntegerField(default=0)
    createdOn = models.DateTimeField(default=django.utils.timezone.now)
    deadline = models.DateField()
