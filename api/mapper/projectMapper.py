import uuid

from . import client
from .models.projectModel import Project, Task, WorksOn, TaskComment
from .models.accountModel import Employee
import datetime

client = client.connectToDB()
Projects = client.primer.projects
Tasks = client.primer.tasks


# WorksOn = client.primer.worksOn


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
    task.due = 1 if str(datetime.datetime.now()) <= str(task.deadline) else 2
    task.save()


def findTasksByAssignTo(assignTo):
    tasks = Task.objects.filter(assignTo=assignTo)
    return tasks


def saveTeam(team_detail):
    worksOn = WorksOn.objects.create(id=uuid.uuid1().hex)
    worksOn.project_id = team_detail["project_id"]
    worksOn.emp_id = team_detail["emp_id"]
    employee = Employee.objects.get(username=team_detail['emp_id'])
    employee.isWorking = True
    employee.save()
    worksOn.save()


def getTeam(project_id):
    team = WorksOn.objects.filter(project_id=project_id)
    return team


def findProjectsByID(project_id):
    project = Project.objects.get(id=project_id)
    return project


def findProjectsByAssignTo(assignTo):
    projects = Project.objects.filter(assignTo=assignTo)
    return projects


def filterEmployee():
    employees = Employee.objects.filter(isWorking=False)
    return employees


def saveComment(task_comment):
    comment = TaskComment.objects.create(id=uuid.uuid1().hex)
    comment.task_id = task_comment['task_id']
    comment.username = task_comment['username']
    comment.comment = task_comment['comment']
    comment.save()


def getAllComments(task_id):
    comments = TaskComment.objects.filter(task_id=task_id)
    return comments


def updateProject(project_data):
    project = Project.objects.get(id=project_data['id'])
    project.status = project_data['status']
    project.due = 1 if str(datetime.datetime.now()) <= str(project.deadline) else 2
    project.save()


def updateEmployeeWorkingStatus(project_data):
    worksOn = WorksOn.objects.filter(project_id=project_data['id'])
    workingStatus = True if project_data['status']!=2 else False
    for emp in worksOn:
        employee = Employee.objects.get(username=emp.emp_id)
        employee.isWorking = workingStatus
        employee.save()
