import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from api.services import leavesService
from .dto.leaveResponse import LeaveSerializer, LeaveTypeSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addLeave(request):
    leave_data = json.loads(request.body)
    leave_data['emp_id'] = request.user.username
    leavesService.saveLeave(leave_data)
    return JsonResponse({"detail": "leave request created!"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLeavesData(request):
    username = request.user.username
    leave_data = leavesService.getLeaveDetail(username)
    serializer = LeaveSerializer(leave_data, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def updateLeaveStatus(request):
    leave_data = json.loads(request.body)
    leavesService.updateLeaveStatus(leave_data)
    return JsonResponse({"detail": "LEAVE REQUEST UPDATED"}, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def addLeaveType(request):
    leave_type = json.loads(request.body)
    leavesService.addLeaveType(leave_type)
    return JsonResponse({"detail": "LEAVE TYPE ADDED"}, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLeaveType(request):
    leave_types = leavesService.getLeaveType()
    serializer = LeaveTypeSerializer(leave_types, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def updateLeaveType(request):
    leave_type = json.loads(request.body)
    leavesService.updateLeaveType(leave_type)
    return JsonResponse({"detail": "LEAVE TYPE UPDATED"}, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def deleteLeaveType(request):
    leave_type = json.loads(request.body)
    leavesService.deleteLeaveType(leave_type)
    return JsonResponse({"status": 200, "message": "LEAVE TYPE DELETED"})


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def findAllLeaves(request):
    leaves = leavesService.findAllLeaveDetail()
    serializer = LeaveSerializer(leaves, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getLeaveTypeById(request):
    leave_type = json.loads(request.body)
    response = leavesService.getLeaveTypeById(leave_type)
    serializer = LeaveTypeSerializer(response)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def filterLeavesByStatus(request):
    status_detail = json.loads(request.body)['status']
    username = request.user.username
    leaves = leavesService.filterLeavesByStatus(username, status_detail)
    serializer = LeaveSerializer(leaves, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
