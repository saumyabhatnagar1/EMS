from ..mapper import leaveMapper


def saveLeave(leave_data):
    leaveDetail = {
        'email': leave_data['email'],
        'date': leave_data['date'],
        'reason': leave_data['reason'],
        'approved': False
    }
    leaveMapper.save(leaveDetail)


def getLeaveDetail(email):
    leaves_data = leaveMapper.findLeaveDetail(email=email)
    if leaves_data is not None:
        leaves_dict = {}
        cnt = 0
        for item in leaves_data:
            item.pop("_id")
            leaves_dict[cnt] = item
            cnt += 1
        return leaves_dict
    return None


def update(leave_data):
    response = leaveMapper.update(leave_data)
    if response is not None:
        return response
    return None


def addLeaveType(leave_type):
    leave_type_data = {
        'value': leave_type['value']
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
