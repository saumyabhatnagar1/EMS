import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .dto.notificationResponse import NotificationSerializer
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, notificationService
from api.security.decorators import login_required, is_post, is_HR


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def addNotification(request):
    notification_data = json.loads(request.body)
    notificationService.addNotification(notification_data)
    return JsonResponse({"detail": "NOTIFICATION CREATED"}, safe=False, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllNotifications(request):
    notifications = notificationService.getAllNotices()
    serializer = NotificationSerializer(notifications, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getNotificationsByType(request):
    type = json.load(request)['type']
    notifications = notificationService.getNoticesByType(type)
    serializer = NotificationSerializer(notifications, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@csrf_exempt
@login_required
def findNotificationsById(request):
    email = principleService.getUsername()
    role = principleService.getRole()
    notifications = notificationService.findByID(email, role)
    if notifications is not None:
        return JsonResponse(notifications, safe=False)
    return JsonResponse({"status": 200, "message": "NOTIFICATION NOT FOUND"})
