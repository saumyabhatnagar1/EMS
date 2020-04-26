from . import client

client = client.connectToDB()
Projects = client.primer.projects
Tasks = client.primer.tasks


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


def findTasks(project_id):
    query = {"project_id": project_id}
    tasks = list(Tasks.find(query))
    if len(tasks) > 0:
        return tasks
    return None


def saveTeam(project_id, team):
    query = {"project_id": project_id}
    update_to = {"$set": {"team": team}}
    response = Projects.update(query, update_to)
    return response


def getTeam(project_id):
    query = {"project_id": project_id}
    project = list(Projects.find(query))
    if len(project) == 0:
        return None
    if project[0].__contains__("team"):
        team = project[0]["team"]
        return team
    return None


