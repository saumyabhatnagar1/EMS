from .client import connectToDB

Notifications = connectToDB().primer.notification


def save(notification_detail):
    id = Notifications.insert_one(notification_detail).inserted_id
    return id


def findAll():
    notifications = list(Notifications.find())
    if len(notifications) > 0:
        return notifications
    return None


def findByID(email):
    query = {"publisher": email}
    notifications = list(Notifications.find(query))
    if len(notifications) > 0:
        return notifications
    return None