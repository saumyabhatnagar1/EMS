import json

from django.http import Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import accountService, principleService, loggerService
from api.security.decorators import login_required


@csrf_exempt
def createUser(request):
    if request.method != 'POST' or len(request.body) <= 2:
        return Http404
    user_data = json.loads(request.body)
    id = accountService.createUser(user_data)
    if id is not None:
        return JsonResponse({'status': 201, 'message': 'CREATED'})
    else:
        return JsonResponse({'status': 409, 'message': 'FAILED'})


@csrf_exempt
def login(request):
    if principleService.isLoggedIn():
        return JsonResponse(principleService.getUser())
    if request.method != 'POST' or len(request.body) <= 2:
        return JsonResponse({'status': 404, 'message': 'INVALID_REQUEST'})
    user_data = json.loads(request.body)
    json_res = accountService.getUser(user_data)
    if json_res is not None:
        loggerService.saveLog(user_data["email"])
        json_res["status"] = 200
        return JsonResponse(json_res)
    else:
        return JsonResponse({"status": 404, "message": "INVALID CREDENTIALS"})


@csrf_exempt
@login_required
def logout(request):
    principleService.removeCurrentUser()
    return JsonResponse({"status": 205, "message": "logout success"})


def index(request):
    return JsonResponse({"msg": "hello"})


@csrf_exempt
@login_required
def getUserProfile(request):
    if request.method != 'POST':
        return JsonResponse({'status': 404, 'message': 'INVALID_REQUEST'})
    user_data = json.loads(request.body)
    account = accountService.getUserProfile(user_data["email"])
    if account is not None:
        account = dict(account)
        del account["_id"]
        del account["password"]
        return JsonResponse(account, safe=False)
    else:
        return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})
