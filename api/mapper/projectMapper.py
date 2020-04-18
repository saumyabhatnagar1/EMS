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

