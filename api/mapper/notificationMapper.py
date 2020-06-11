from .models.notificationModel import Notification
import uuid
from .client import connectToDB

Notifications = connectToDB().primer.notifications


def save(notification_data):
    notification = Notification.objects.create(id=uuid.uuid1().hex)
    notification.title = notification_data['title']
    notification.description = notification_data['description']
    notification.type = notification_data['type']
    notification.save()


def findAll():
    notifications = Notification.objects.all()
    return notifications


def findByID(email, role):
    query1 = {"to": email}
    query2 = {"to": role}
    query3 = {"to": "ALL"}
    notifications = list(Notifications.find(query1)) + list(Notifications.find(query2)) + list(Notifications.find(query3))
    if len(notifications) > 0:
        return notifications
    return None


def findByType(type):
    notifications = Notification.objects.filter(type=type)
    return notifications
