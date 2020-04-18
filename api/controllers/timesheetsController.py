import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, timesheetsService
from api.security.decorators import login_required, is_admin


@csrf_exempt
@login_required
def index():
    return JsonResponse({"msg": "hello from timesheets"})


@csrf_exempt
@is_admin
def add(request):
    timesheet = json.loads(request.body)
    var = timesheetsService.add(timesheet)
    if var is not None:
        return JsonResponse({"status": 201, "message": "CREATED"})
    else:
        return JsonResponse({"status": 402, "message": "RECORD ALREADY EXISTS"})


@csrf_exempt
@is_admin
def update(request):
    timesheet = json.loads(request.body)
    var = timesheetsService.update(timesheet)
    if var is not None:
        return JsonResponse({"status": 200, "message": "UPDATED"})
    else:
        return JsonResponse({"status": 403, "message": "RECORD NOT FOUND"})


@csrf_exempt
@login_required
def find(request):
    timesheet = json.loads(request.body)
    if principleService.getRole() != "ADMIN":
        username = principleService.getUsername()
        timesheet["username"] = username
    sheet = timesheetsService.find(timesheet)
    if sheet is not None:
        return JsonResponse({"status": 200, "message": "RECORD FOUND",
                             "data": {"id": str(sheet["_id"]), "username": sheet["username"],
                                      "timings": sheet["timings"]}})
    return JsonResponse({"status": 200, "message": "RECORD NOT FOUND"})
