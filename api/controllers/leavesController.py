import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, leavesService
from api.security.decorators import login_required, is_post, is_HR

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from .dto.leaveResponse import LeaveSerializer
from rest_framework import status


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


@csrf_exempt
@login_required
@is_post
@is_HR
def updateLeaveStatus(request):
    if len(request.body) <= 1:
        return JsonResponse({'status': 404, 'message': 'INVALID_REQUEST'})
    leave_data = json.loads(request.body)
    response = leavesService.updateLeaveStatus(leave_data)
    if response is not None:
        return JsonResponse({"status": 200, "message": "LEAVE REQUEST UPDATED"})
    return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
@is_post
@is_HR
def addLeaveType(request):
    leave_type = json.loads(request.body)
    response = leavesService.addLeaveType(leave_type)
    if response is not None:
        return JsonResponse({"status": 200, "message": "LEAVE TYPE ADDED"})
    return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
def getLeaveType(request):
    leave_types = leavesService.getLeaveType()
    if leave_types is not None:
        return JsonResponse(leave_types, safe=False)
    return JsonResponse({"status": 200, "message": "NO LEAVE TYPE FOUND"})


@csrf_exempt
@login_required
@is_post
@is_HR
def updateLeaveType(request):
    leave_type = json.loads(request.body)
    response = leavesService.updateLeaveType(leave_type)
    if response is not None:
        return JsonResponse({"status": 200, "message": "LEAVE TYPE UPDATED"})
    return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
@is_post
@is_HR
def deleteLeaveType(request):
    leave_type = json.loads(request.body)
    response = leavesService.deleteLeaveType(leave_type)
    if response is not None:
        return JsonResponse({"status": 200, "message": "LEAVE TYPE DELETED"})
    return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
@is_HR
def findAllLeaves(request):
    leaves = leavesService.findAllLeaveDetail()
    if leaves is not None:
        return JsonResponse(leaves, safe=False)
    return JsonResponse({"status": 200, "message": "NO LEAVE TYPE FOUND"})


@csrf_exempt
@login_required
@is_post
@is_HR
def getLeaveTypeById(request):
    leave_type = json.loads(request.body)
    response = leavesService.getLeaveTypeById(leave_type)

    if response is not None:
        print(response)
        response["id"] = str(response["_id"])
        del (response["_id"])
        return JsonResponse(response, safe=False)
    return JsonResponse({"status": 200, "message": "NO LEAVE TYPE FOUND"})
