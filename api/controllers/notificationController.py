import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, notificationService
from api.security.decorators import login_required, is_post, is_HR


@csrf_exempt
@is_post
@login_required
def addNotification(request):
    notification_data = json.loads(request.body)
    response = notificationService.addNotification(notification_data)
    if response is not None:
        return JsonResponse({"status": 200, "message": "NOTIFICATION ADDED"})
    return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
def findAllNotifications(request):
    notifications = notificationService.findAll()
    if notifications is not None:
        return JsonResponse(notifications, safe=False)
    return JsonResponse({"status": 200, "message": "NOTIFICATION NOT FOUND"})


@csrf_exempt
@login_required
def findNotificationsById(request):
    email = principleService.getUsername()
    role = principleService.getRole()
    notifications = notificationService.findByID(email, role)
    if notifications is not None:
        return JsonResponse(notifications, safe=False)
    return JsonResponse({"status": 200, "message": "NOTIFICATION NOT FOUND"})
