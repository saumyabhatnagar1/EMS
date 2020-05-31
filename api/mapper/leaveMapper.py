import datetime
import uuid

from . import client

client = client.connectToDB()
Leaves = client.primer.leaves
LeaveTypes = client.primer.leavetypes

from .models.leaveModel import Leave, LeaveType


def save(leave_data):
    leave = Leave.objects.create(id=uuid.uuid1().hex)
    leave.emp_id = leave_data["emp_id"]
    leave.date = leave_data["date"]
    leave.leave_type = leave_data["leave_type"]
    leave.description = leave_data["description"]
    leave.save()


def findLeaveDetail(username):
    leaves = Leave.objects.filter(emp_id=username)
    return leaves


def update(leave_data):
    leave = Leave.objects.get(emp_id=leave_data['emp_id'], date=leave_data['date'])
    leave.admin_remark = leave_data['admin_remark']
    leave.admin_remark_date = datetime.datetime.now()
    leave.status = leave_data['status']
    leave.is_read = True
    leave.save()


def saveLeaveType(leave_type_data):
    leave_type = LeaveType.objects.create(id=uuid.uuid1().hex)
    leave_type.value = leave_type_data["value"]
    leave_type.description = leave_type_data["description"]
    leave_type.save()


def getLeaveType():
    leave_types = LeaveType.objects.all()
    return leave_types


def updateLeaveType(leave_type_date):
    leave_type = LeaveType.objects.get(id=leave_type_date['id'])
    leave_type.value = leave_type_date['value']
    leave_type.description = leave_type_date['description']
    leave_type.createdOn = datetime.datetime.now()
    leave_type.save()


def deleteLeaveType(leave_type_data):
    leave_type = LeaveType.objects.get(id=leave_type_data['id'])
    leave_type.delete()


def findAll():
    leaves = Leave.objects.all()
    return leaves


def getLeaveTypeById(leave_type):
    leave_type_data = LeaveType.objects.get(id=leave_type['id'])
    return leave_type_data
