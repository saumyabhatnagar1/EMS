import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, projectService


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
        return JsonResponse({"status": 400, "message": "NO PROJECT FOUND"})


@csrf_exempt
def addTask(request):
    if not principleService.isLoggedIn():
        return JsonResponse({"status": 401, "message": "MUST LOG FIRST"})
    if request.method != 'POST' or len(request.body) <= 2:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    task_data = json.loads(request.body)
    projectService.saveTask(task_data)
    return JsonResponse({"status": 200, "message": "TASK SAVED"})


@csrf_exempt
def getTasks(request):
    if not principleService.isLoggedIn():
        return JsonResponse({"status": 401, "message": "MUST LOG FIRST"})
    if request.method != 'POST' or len(request.body) < 1:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    project_id = json.loads(request.body)['project_id']
    task_data = projectService.getTasksDetail(project_id)
    if task_data is not None:
        return JsonResponse(task_data, safe=False)
    return JsonResponse({"status":400, "message": "NO TASK FOUND"})