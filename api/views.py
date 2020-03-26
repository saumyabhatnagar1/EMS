from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services import accountService

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
    if request.method != 'POST' or len(request.body) <= 2:
            return JsonResponse({'status':404,'message':'INVALID_REQUEST'})
    user_data = json.loads(request.body)
    account = accountService.getUser(user_data)
    return JsonResponse({"email":account["email"],"name":account["name"]})