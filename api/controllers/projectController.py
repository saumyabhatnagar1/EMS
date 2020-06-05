import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from api.services import projectService
from .dto.projectResponse import ProjectSerializer, TaskSerializer, WorkOnSerializer, TaskCommentSerializer
from .dto.accountResponse import EmployeeSerializer


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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTeamMember(request):
    team_data = json.loads(request.body)
    projectService.addTeamMember(team_data)
    return JsonResponse({"message": "TEAM MEMBER ADDED"}, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getTeamDetail(request):
    project_id = json.loads(request.body)['project_id']
    team = projectService.getTeamDetail(project_id)
    serializer = WorkOnSerializer(team, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFreeEmployee(request):
    employees = projectService.filterEmployee()
    employee_serializer = EmployeeSerializer(employees, many=True)
    return JsonResponse(employee_serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addComment(request):
    task_comment = json.loads(request.body)
    projectService.saveComment(task_comment)
    return JsonResponse({"message": "COMMENT ADDED"}, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getAllComments(request):
    task_id = json.loads(request.body)['task_id']
    comments = projectService.getAllComments(task_id)
    serializer = TaskCommentSerializer(comments, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateProjectStatus(request):
    project_data = json.loads(request.body)
    projectService.updateProjectStatus(project_data)
    return JsonResponse({"message": "PROJECT STATUS UPDATED"}, safe=False, status=status.HTTP_200_OK)
