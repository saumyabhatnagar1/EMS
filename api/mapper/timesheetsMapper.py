import uuid
import datetime
from .models.TimesheetModel import Timesheet


def save(timesheet_data):
    timesheet = Timesheet.objects.create(id=uuid.uuid1().hex)
    timesheet.emp_id = timesheet_data['emp_id']
    timesheet.date = timesheet_data['date']
    timesheet.in_time = timesheet_data['in_time']
    timesheet.out_time = timesheet_data['out_time']
    timesheet.save()


def find(timesheet):
    sheet = Timesheet.objects.get(emp_id=timesheet['emp_id'], date=timesheet['date'])
    return sheet


def update(sheet, timesheet):
    sheet.emp_id = timesheet['emp_id']
    sheet.date = timesheet['date']
    sheet.in_time = timesheet['in_time']
    sheet.out_time = timesheet['out_time']
    sheet.save()


def findByEmpId(emp_id):
    return Timesheet.objects.filter(emp_id=emp_id)


def findByDate(timesheet_data):
    timesheet = Timesheet.objects.get(emp_id=timesheet_data['emp_id'], date=timesheet_data['date'])
    return timesheet


def findByMonth(timesheet_data):
    date = str(timesheet_data['year']) + "-" + str(timesheet_data['month']) + "-01"
    date_upperbound = str(timesheet_data['year']) + "-" + str(timesheet_data['month']+1) + "-01"
    timesheet = Timesheet.objects.filter(emp_id=timesheet_data['emp_id']).filter(date__gte=date, date__lt=date_upperbound)
    return timesheet


def findByYear(timesheet_data):
    timesheet = Timesheet.objects.filter(emp_id=timesheet_data['emp_id'], date__year=timesheet_data['year'])
    return timesheet
