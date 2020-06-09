from ..mapper import leaveMapper
from django.utils import timezone


def saveLeave(leave_data):
    leaveMapper.save(leave_data)


def getLeaveDetail(username):
    leaves_data = leaveMapper.findLeaveDetail(username=username)
    return leaves_data


def getLeavesLeft(username):
    leaves = leaveMapper.findLeaveDetail(username)
    leaveTypes = leaveMapper.getLeaveType()
    leavesThisYear = leaves.filter(date__year=timezone.now().year)
    leavesLeft = {}
    for leaveType in leaveTypes:
        temp = leavesThisYear.filter(leave_type__contains=leaveType.value).filter(date__year=timezone.now().year)
        leavesLeft[leaveType.value] = leaveType.number_of_leaves - len(temp)
    return leavesLeft


def updateLeaveStatus(leave_data):
    leaveMapper.update(leave_data)


def addLeaveType(leave_type):
    leaveMapper.saveLeaveType(leave_type)


def getLeaveType():
    leave_types = leaveMapper.getLeaveType()
    return leave_types


def updateLeaveType(leave_type):
    leaveMapper.updateLeaveType(leave_type)


def deleteLeaveType(leave_type):
    leaveMapper.deleteLeaveType(leave_type)


def findAllLeaveDetail():
    leaves = leaveMapper.findAll()
    return leaves


def getLeaveTypeById(leave_type):
    leave_type_data = leaveMapper.getLeaveTypeById(leave_type)
    return leave_type_data
