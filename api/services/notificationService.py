from ..mapper import notificationMapper


def addNotification(notification_data):
    notificationMapper.save(notification_data)


def getAllNotices():
    notifications = notificationMapper.findAll()
    return notifications


def findByID(email, role):
    notification = notificationMapper.findByID(email, role)
    if notification is not None:
        notification_dict = {}
        cnt = 0
        for item in notification:
            del item["_id"]
            notification_dict[cnt] = item
            cnt += 1
        return notification_dict
    return None


def getNoticesByType(type):
    notifications = notificationMapper.findByType(type)
    return notifications
