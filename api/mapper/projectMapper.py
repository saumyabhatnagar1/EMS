import pymongo

client = pymongo.MongoClient("localhost", 27017)
Projects = client.primer.projects


def save(project_detail):
    id = Projects.insert_one(project_detail).inserted_id
    return id


def findActiveProjects():
    query = {"completed": False}
    projects = list(Projects.find())
    if len(projects) > 0:
        return projects
    return None

print(findActiveProjects())