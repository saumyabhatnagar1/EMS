from ..mapper import notificationMapper


def addNotification(notification_data):
    notification_detail = {
        "title": notification_data['title'],
        "description": notification_data['description'],
        "date": notification_data['date'],
        "publisher": notification_data['publisher'],
        "to": notification_data['to']
    }
    response = notificationMapper.save(notification_detail)
    if response is not None:
        return response
    return None


def findAll():
    notification = notificationMapper.findAll()
    if notification is not None:
        notification_dict = {}
        cnt = 0
        for item in notification:
            del item["_id"]
            notification_dict[cnt] = item
            cnt += 1
        return notification_dict
    return None


def findByID(email):
    notification = notificationMapper.findByID(email)
    if notification is not None:
        notification_dict = {}
        cnt = 0
        for item in notification:
            del item["_id"]
            notification_dict[cnt] = item
            cnt += 1
        return notification_dict
    return None
