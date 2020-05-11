from .client import connectToDB

Notifications = connectToDB().primer.notifications


def save(notification_detail):
    id = Notifications.insert_one(notification_detail).inserted_id
    return id


def findAll():
    notifications = list(Notifications.find())
    if len(notifications) > 0:
        return notifications
    return None


def findByID(email, role):
    query1 = {"to": email}
    query2 = {"to": role}
    query3 = {"to": "ALL"}
    notifications = list(Notifications.find(query1)) + list(Notifications.find(query2)) + list(Notifications.find(query3))
    if len(notifications) > 0:
        return notifications
    return None