import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, projectService
from api.security.decorators import login_required, is_post


@csrf_exempt
@login_required
@is_post
def addProject(request):
    if len(request.body) <= 5:
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
def addTask(request):
    if len(request.body) <= 2:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    task_data = json.loads(request.body)
    projectService.saveTask(task_data)
    return JsonResponse({"status": 200, "message": "TASK SAVED"})


@csrf_exempt
@login_required
@is_post
def getTasks(request):
    if len(request.body) < 1:
        return JsonResponse({"status": 404, "message": "INVALID_REQUEST"})
    project_id = json.loads(request.body)['project_id']
    task_data = projectService.getTasksDetail(project_id)
    if task_data is not None:
        return JsonResponse(task_data, safe=False)
    return JsonResponse({"status":400, "message": "NO TASK FOUND"})


@csrf_exempt
@login_required
@is_post
def addTeamMember(request):
    project_id = json.loads(request.body)['project_id']
    team_detail = json.loads(request.body)['team']
    response = projectService.addTeamMember(project_id, team_detail)
    if response is not None:
        return JsonResponse({"status":200, "message":"TEAM MEMBER ADDED"})
    return JsonResponse({"status":400, "message":"SOMETHING WENT WRONG"})


@csrf_exempt
@login_required
@is_post
def getTeamDetail(request):
    project_id = json.loads(request.body)['project_id']
    team = projectService.getTeamDetail(project_id)
    if team is not None:
        return JsonResponse(team, safe=False)
    return JsonResponse({"status":400, "message":"SOMETHING WENT WRONG"})