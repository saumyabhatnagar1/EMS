import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from api.services import principleService, projectService
from api.security.decorators import login_required, is_post

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from .dto.projectResponse import ProjectSerializer, TaskSerializer
from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProject(request):
    project_data = json.loads(request.body)
    projectService.saveProject(project_data)
    return JsonResponse({"detail": "PROJECT CREATED!"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProjects(request):
    projects = projectService.getProjectsDetail()
    serializer = ProjectSerializer(projects, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getProjectsByID(request):
    project_id = json.loads(request.body)["project_id"]
    project = projectService.getProjectsDetailByID(project_id)
    serializer = ProjectSerializer(project)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getProjectsByAssignTo(request):
    assignTo = json.loads(request.body)['assignTo']
    projects = projectService.getProjectsDetailByAssignTo(assignTo)
    serializer = ProjectSerializer(projects, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTask(request):
    task_data = json.loads(request.body)
    projectService.saveTask(task_data)
    return JsonResponse({"detail": "TASK CREATED!"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getTaskByProjectID(request):
    project_id = json.loads(request.body)['project_id']
    tasks = projectService.getTaskByProjectID(project_id)
    serializer = TaskSerializer(tasks, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getTaskByAssignTo(request):
    assignTo = json.loads(request.body)['assignTo']
    tasks = projectService.getTaskByAssignTo(assignTo)
    serializer = TaskSerializer(tasks, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateTaskStatus(request):
    task_data = json.loads(request.body)
    projectService.updateTaskStatus(task_data)
    return JsonResponse({"message": "TASK UPDATED"}, safe=False, status=status.HTTP_200_OK)


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
