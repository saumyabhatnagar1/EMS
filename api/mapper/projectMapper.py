from . import client

client = client.connectToDB()
Projects = client.primer.projects


def save(project_detail):
    id = Projects.insert_one(project_detail).inserted_id
    return id


def findProjects():
    projects = list(Projects.find())
    if len(projects) > 0:
        return projects
    return None
