from . import client
from bson.objectid import ObjectId
import uuid

client = client.connectToDB()
Projects = client.primer.projects
Tasks = client.primer.tasks
WorksOn = client.primer.worksOn

from .models.projectModel import Project, Task


def save(project_data):
    project = Project.objects.create(id=uuid.uuid1().hex)
    project.name = project_data['name']
    project.description = project_data['description']
    project.assignTo = project_data['assignTo']
    project.deadline = project_data['deadline']
    project.customer_id = project_data['customer_id']
    project.save()


def findProjects():
    projects = Project.objects.all()
    return projects


def saveTask(task_data):
    task = Task.objects.create(id=uuid.uuid1().hex)
    task.title = task_data['title']
    task.description = task_data['description']
    task.assignTo = task_data['assignTo']
    task.project_id = task_data['project_id']
    task.deadline = task_data['deadline']
    task.save()


def findTasksByProjectID(project_id):
    tasks = Task.objects.filter(project_id=project_id)
    return tasks


def updateTask(task_data):
    task = Task.objects.get(id=task_data['id'])
    task.status = task_data['status']
    task.save()


def findTasksByAssignTo(assignTo):
    tasks = Task.objects.filter(assignTo=assignTo)
    return tasks


def saveTeam(team_detail):
    id = WorksOn.insert_one(team_detail).inserted_id
    return id


def getTeam(project_id):
    query = {"project_id": project_id}
    project = list(WorksOn.find(query))
    if len(project) > 0:
        return project
    return None


def findProjectsByID(project_id):
    project = Project.objects.get(id=project_id)
    return project


def findProjectsByAssignTo(assignTo):
    projects = Project.objects.filter(assignTo=assignTo)
    return projects
