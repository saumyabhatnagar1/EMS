import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.security.decorators import login_required, is_post
from api.services import permissionService


@csrf_exempt
@login_required
@is_post
def addPermission(request):
    permission_data = json.loads(request.body)
    response = permissionService.addPermission(permission_data)
    if response is not None:
        return JsonResponse({"status": 200, "message": "PERMISSION ADDED"})
    return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
@is_post
def getPermissionDetail(request):
    role_id = json.loads(request.body)['role_id']
    response = permissionService.getPermissionDetail(role_id)
    if response is not None:
        return JsonResponse(response, safe=False)
    return JsonResponse({"status": 200, "message": "NO PERMISSION DATA FOUND"})

