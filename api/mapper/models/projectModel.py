import django.utils.timezone
from djongo import models


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


class WorksOn(models.Model):
    id = models.CharField(max_length=250, primary_key=True)
    project_id = models.CharField(max_length=250)
    emp_id = models.CharField(max_length=250)


class TaskComment(models.Model):
    id = models.CharField(max_length=250, primary_key=True)
    task_id = models.CharField(max_length=250)
    username = models.CharField(max_length=250)
    comment = models.CharField(max_length=500)
    date = models.DateTimeField(default=django.utils.timezone.now)
