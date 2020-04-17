import json

from api.services import principleService, accountService, leavesService, projectService
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def addProject(request):
    if not principleService.isLoggedIn():
        return JsonResponse({"status": 401, "message": "MUST LOG FIRST"})
    if request.method != 'POST' or len(request.body) <= 2:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    project_data = json.loads(request.body)
    projectService.saveProject(project_data)
    return JsonResponse({"status": 200, "message": "PROJECT SAVED"})

@csrf_exempt
def getProjects(request):
    if not principleService.isLoggedIn():
        return JsonResponse({"status": 401, "message": "MUST LOG FIRST"})
    project_data = projectService.getProjectsDetail()
    if project_data is not None:
        return JsonResponse(project_data, safe=False)
    else:
        return JsonResponse({"status": 400, "message": "NO LEAVE_DETAIL FOUND"})
