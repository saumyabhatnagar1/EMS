from . import client
from bson.objectid import ObjectId

client = client.connectToDB()
Projects = client.primer.projects
Tasks = client.primer.tasks
WorksOn = client.primer.worksOn


def save(project_detail):
    id = Projects.insert_one(project_detail).inserted_id
    return id


def findProjects():
    projects = list(Projects.find())
    if len(projects) > 0:
        return projects
    return None


def saveTask(task_detail):
    id = Tasks.insert_one(task_detail).inserted_id
    return id


def findTasksByProjectID(project_id):
    query = {"project_id": project_id}
    tasks = list(Tasks.find(query))
    if len(tasks) > 0:
        return tasks
    return None


def findTasksByAssignTo(assignTo):
    query = {"assignTo": assignTo}
    tasks = list(Tasks.find(query))
    if len(tasks) > 0:
        return tasks
    return None


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
    query = {'_id': ObjectId(project_id)}
    project = list(Projects.find(query))
    print(project)

    if len(project):
        return project     
    return None


def findProjectsByAssignTo(assignTo):
    query = {'assignTo': assignTo}
    project = list(Projects.find(query))
    if len(project):
        return project
    return None
