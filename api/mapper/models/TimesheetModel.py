from django.db import models


class Timesheet(models.Model):
    id = models.CharField(primary_key=True, max_length=250, serialize=False)
    date = models.DateField()
    emp_id = models.CharField(max_length=250)
    in_time = models.TimeField()
    out_time = models.TimeField()
