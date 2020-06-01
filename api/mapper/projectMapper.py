import uuid

from . import client
from .models.projectModel import Project, Task, WorksOn
from .models.accountModel import Employee

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
    task.save()


def findTasksByAssignTo(assignTo):
    tasks = Task.objects.filter(assignTo=assignTo)
    return tasks


def saveTeam(team_detail):
    # emp = Employee.objects.get(username=team_detail['emp_id'])
    # proj = Project.objects.get(id=team_detail['project_id'])

    # workson = WorksOn.objects.create(project_id=proj, emp_id=emp)
    # workson.save()
    worksOn = WorksOn.objects.create(id=uuid.uuid1().hex)
    worksOn.project_id = team_detail["project_id"]
    worksOn.emp_id = team_detail["emp_id"]
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
    employees = Employee.objects.all()
    working_emp = WorksOn.objects.all()
    return employees, working_emp

