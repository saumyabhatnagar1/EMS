from ..mapper import leaveMapper
import datetime


def saveLeave(leave_data):
    leaveMapper.save(leave_data)


def getLeaveDetail(username):
    leaves_data = leaveMapper.findLeaveDetail(username=username)
    return leaves_data


def updateLeaveStatus(leave_data):
    response = leaveMapper.update(leave_data)
    if response is not None:
        return response
    return None


def addLeaveType(leave_type):
    leave_type_data = {
        'value': leave_type['value'],
        'description': leave_type['description'],
        'createdOn': datetime.datetime.now().strftime("%x %X")
    }
    response = leaveMapper.saveLeaveType(leave_type_data)
    if response is not None:
        return response
    return None


def getLeaveType():
    leave_types = leaveMapper.getLeaveType()
    if leave_types is not None:
        leave_types_dict = {}
        cnt = 0
        for item in leave_types:
            item["id"] = str(item["_id"])
            item.pop("_id")
            leave_types_dict[cnt] = item
            cnt += 1
        return leave_types_dict
    return None


def updateLeaveType(leave_type):
    response = leaveMapper.updateLeaveType(leave_type)
    if response is not None:
        return response
    return None


def deleteLeaveType(leave_type):
    response = leaveMapper.deleteLeaveType(leave_type)
    if response is not None:
        return response
    return None


def findAllLeaveDetail():
    leaves = leaveMapper.findAll()
    if leaves is not None:
        leaves_dict = {}
        cnt = 0
        for leave in leaves:
            leave["id"] = str(leave["_id"])
            del leave["_id"]
            leaves_dict[cnt] = leave
            cnt += 1
        return leaves_dict
    return None


def getLeaveTypeById(leave_type):
    leave_type = leaveMapper.getLeaveTypeById(leave_type)
    if leave_type is not None:
        return leave_type
    return None
