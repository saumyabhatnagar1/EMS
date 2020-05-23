import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, projectService
from api.security.decorators import login_required, is_post


@csrf_exempt
@login_required
@is_post
def addProject(request):
    if len(request.body) <= 4:
        return JsonResponse({"status": 404, "message": "INCOMPLETE DATA"})
    project_data = json.loads(request.body)
    projectService.saveProject(project_data)
    return JsonResponse({"status": 200, "message": "PROJECT SAVED"})


@csrf_exempt
@login_required
def getProjects(request):
    project_data = projectService.getProjectsDetail()
    if project_data is not None:
        return JsonResponse(project_data, safe=False)
    else:
        return JsonResponse({"status": 400, "message": "NO PROJECT FOUND"})


@csrf_exempt
@login_required
@is_post
def getProjectsByID(request):
    project_id = json.loads(request.body)["project_id"]
    response = projectService.getProjectsDetailByID(project_id)
    if response is not None:
        return JsonResponse(response, safe=False)
    return JsonResponse({"status": 200, "message": "PROJECTS NOT FOUND"})


@csrf_exempt
@login_required
@is_post
def getProjectsByAssignTo(request):
    assignTo = json.loads(request.body)['assignTo']
    response = projectService.getProjectsDetailByAssignTo(assignTo)
    if response is not None:
        return JsonResponse(response, safe=False)
    return JsonResponse({"status": 200, "message": "PROJECTS NOT FOUND"})


@csrf_exempt
@login_required
@is_post
def addTask(request):
    if len(request.body) <= 4:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    task_data = json.loads(request.body)
    projectService.saveTask(task_data)
    return JsonResponse({"status": 200, "message": "TASK SAVED"})


@csrf_exempt
@login_required
@is_post
def getTaskByProjectID(request):
    if len(request.body) < 1:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    project_id = json.loads(request.body)['project_id']
    task_data = projectService.getTaskByProjectID(project_id)
    if task_data is not None:
        return JsonResponse(task_data, safe=False)
    return JsonResponse({"status": 200, "message": "NO TASK FOUND"})


@csrf_exempt
@login_required
@is_post
def getTaskByAssignTo(request):
    if len(request.body) < 1:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    assignTo = json.loads(request.body)['assignTo']
    task_data = projectService.getTaskByAssignTo(assignTo)
    if task_data is not None:
        return JsonResponse(task_data, safe=False)
    return JsonResponse({"status": 200, "message": "NO TASK FOUND"})


@csrf_exempt
@login_required
@is_post
def updateTaskStatus(request):
    task_detail = json.loads(request.body)
    response = projectService.updateTaskStatus(task_detail)
    if response is not None:
        return JsonResponse({"status": 200, "message": "TASK UPDATED"})
    return JsonResponse({"status": 200, "message": "NO TASK FOUND"})


@csrf_exempt
@login_required
@is_post
def addTeamMember(request):
    team_data = json.loads(request.body)
    response = projectService.addTeamMember(team_data)
    if response is not None:
        return JsonResponse({"status": 200, "message": "TEAM MEMBER ADDED"})
    return JsonResponse({"status": 400, "message": "SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
@is_post
def getTeamDetail(request):
    project_id = json.loads(request.body)['project_id']
    team = projectService.getTeamDetail(project_id)
    if team is not None:
        return JsonResponse(team, safe=False)
    return JsonResponse({"status": 400, "message": "TEAM NOT FOUND"})
