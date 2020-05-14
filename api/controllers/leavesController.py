import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, leavesService
from api.security.decorators import login_required, is_post, is_HR


@csrf_exempt
@login_required
@is_post
def addLeave(request):
    if len(request.body) <= 2:
        return JsonResponse({'status': 404, 'message': 'INVALID_REQUEST'})
    leave_data = json.loads(request.body)
    leave_data["email"] = principleService.getUsername()
    leavesService.saveLeave(leave_data)
    return JsonResponse({"status": 200, "message": "LEAVE_REQUEST SUBMITTED"})


@csrf_exempt
@login_required
def getLeavesData(request):
    email = principleService.getUsername()
    leave_data = leavesService.getLeaveDetail(email)
    if leave_data is not None:
        return JsonResponse(leave_data, safe=False)
    else:
        return JsonResponse({"status": 200, "message": "NO LEAVE_DETAIL FOUND"})


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
        return JsonResponse({"status":200, "message": "LEAVE REQUEST UPDATED"})
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
    return JsonResponse({"status": 200, "message":"NO LEAVE TYPE FOUND"})


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
        return JsonResponse(leave_type, safe=False)
    return JsonResponse({"status": 200, "message":"NO LEAVE TYPE FOUND"})