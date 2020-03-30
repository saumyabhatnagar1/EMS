from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services import accountService, principleService


import json

def index(request):
    return JsonResponse({"message":"Hello from Server!"})

@csrf_exempt
def createUser(request):
    if request.method != 'POST' or len(request.body) <= 2:
        return JsonResponse({'status':404,'message':'INVALID_REQUEST'})

    user_data = json.loads(request.body)
    id = accountService.createUser(user_data)
    if id != None:
        return JsonResponse({'status':201,'message':'CREATED'})
    else:
        return JsonResponse({'status':409,'message':'FAILED'})

@csrf_exempt
def login(request):
    if principleService.isLoggedIn():
        return JsonResponse(principleService.getUser())
    if request.method != 'POST' or len(request.body) <= 2:
            return JsonResponse({'status':404,'message':'INVALID_REQUEST'})
    user_data = json.loads(request.body)
    json_res = accountService.getUser(user_data)
    if json_res!=None:
        json_res["status"] = 200
        return JsonResponse(json_res)
    else:
        return JsonResponse({"status":404,"message":"INVALID CREDENTIALS"})

@csrf_exempt
def logout(request):
    if principleService.isLoggedIn():
        principleService.removeCurrentUser()
    return JsonResponse({"status":205,"message":"logout success"})