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
