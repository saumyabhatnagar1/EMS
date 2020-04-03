import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, timesheetsService


@csrf_exempt
def index(request):
    return JsonResponse({"msg": "hello from timesheets"})


@csrf_exempt
def add(request):
    if not principleService.isLoggedIn():
        # future add redirection to login
        return JsonResponse({"status": 401, "message": "Must log first"})
    timesheet = json.loads(request.body)
    username = principleService.getUsername()
    timesheet["username"] = username
    var = timesheetsService.add(timesheet)
    if var is not None:
        return JsonResponse({"status": 201, "message": "CREATED"})
    else:
        return JsonResponse({"status": 402, "message": "RECORD ALREADY EXISTS"})


@csrf_exempt
def find(request):
    if not principleService.isLoggedIn():
        # future add redirection to login
        return JsonResponse({"status": 401, "message": "Must log first"})
    timesheet = json.loads(request.body)
    username = principleService.getUsername()
    timesheet["username"] = username
    sheet = timesheetsService.find(timesheet)
    if sheet is not None:
        return JsonResponse({"status": 200, "message": "SUBMITTED",
                             "data": {"id": str(sheet["_id"]), "username": sheet["username"], "timings": sheet["timings"]}})
    return JsonResponse({"status": 200, "message": "NOT SUBMITTED"})
