import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, leavesService


@csrf_exempt
def addLeave(request):
    if not principleService.isLoggedIn():
        return JsonResponse({"status": 401, "message": "MUST LOG FIRST"})
    if request.method != 'POST' or len(request.body) <= 2:
        return JsonResponse({'status': 404, 'message': 'INVALID_REQUEST'})
    leave_data = json.loads(request.body)
    leave_data["email"] = principleService.getUsername()
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
