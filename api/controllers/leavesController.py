import json

from api.services import principleService, accountService, leavesService
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def addLeave(request):
    if not principleService.isLoggedIn():
        return JsonResponse({"status": 401, "message": "MUST LOG FIRST"})
    if request.method != 'POST' or len(request.body) <= 2:
        return JsonResponse({'status': 404, 'message': 'INVALID_REQUEST'})
    leave_data = json.loads(request.body)
    leavesService.saveLeave(leave_data)
    return JsonResponse({"status": 200, "message": "LEAVE_REQUEST SUBMITTED"})


@csrf_exempt
def getLeavesData(request):
    if not principleService.isLoggedIn():
        return JsonResponse({"status": 401, "message": "MUST LOG FIRST"})
    email = principleService.getUsername()
    leave_data = leavesService.getLeaveDetail(email)
    if leave_data is not None:
        return JsonResponse(leave_data, safe=False)
    else:
        return JsonResponse({"status": 400, "message": "NO LEAVE_DETAIL FOUND"})