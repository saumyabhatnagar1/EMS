from ..mapper import projectMapper
import datetime


def saveProject(project_data):
    projectMapper.save(project_data)


def getProjectsDetail():
    projects = projectMapper.findProjects()
    return projects


def getProjectsDetailByID(project_id):
    project = projectMapper.findProjectsByID(project_id)
    return project


def getProjectsDetailByAssignTo(assignTo):
    projects = projectMapper.findProjectsByAssignTo(assignTo)
    return projects


def saveTask(task_data):
    task_detail = {
        "project_id": task_data['project_id'],
        "title": task_data['title'],
        "description": task_data['description'],
        "assignTo": task_data['assignTo'],
        "status": 0,
        "createdOn": datetime.datetime.now().strftime("%x %X"),
        "deadline": task_data['deadline'],
        "due": 0
    }
    projectMapper.saveTask(task_data)


def getTaskByProjectID(project_id):
    tasks = projectMapper.findTasksByProjectID(project_id)
    return tasks


def getTaskByAssignTo(assignTo):
    tasks = projectMapper.findTasksByAssignTo(assignTo)
    return tasks


def updateTaskStatus(task_detail):
    projectMapper.updateTask(task_detail)


def addTeamMember(team_data):
    team_detail = {
        "project_id": team_data['project_id'],
        "emp_id": team_data['emp_id']
    }
    projectMapper.saveTeam(team_detail)


def getTeamDetail(project_id):
    team = projectMapper.getTeam(project_id)
    return team
