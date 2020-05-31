import uuid

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
