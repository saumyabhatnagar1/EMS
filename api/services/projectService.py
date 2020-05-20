from ..mapper import projectMapper
import datetime


def saveProject(project_data):
    project_detail = {
        "name": project_data['name'],
        "description": project_data['description'],
        "assignTo": project_data['assignTo'],
        "createdOn": datetime.datetime.now().strftime("%x %X"),
        "status": 0,
        "due": 0,
        "deadline": project_data['deadline'],
        "customer_id": project_data['customer_id'],
        "complete_percentage": 0,
    }
    projectMapper.save(project_detail)


def getProjectsDetail():
    project_detail = projectMapper.findProjects()
    if project_detail is not None:
        project_dict = {}
        cnt = 0
        for item in project_detail:
            item["id"] = str(item['_id'])
            item.pop("_id")
            project_dict[cnt] = item
            cnt += 1
        return project_dict
    return None


def getProjectsDetailByID(project_id):
    project_detail = projectMapper.findProjectsByID(project_id)
    if project_detail is not None:
        project_dict = {}
        cnt = 0
        for item in project_detail:
            item["id"] = str(item['_id'])
            item.pop("_id")
            project_dict[cnt] = item
            cnt += 1
        return project_dict
    return None


def getProjectsDetailByAssignTo(assignTo):
    project_detail = projectMapper.findProjectsByAssignTo(assignTo)
    if project_detail is not None:
        project_dict = {}
        cnt = 0
        for item in project_detail:
            item["id"] = str(item['_id'])
            item.pop("_id")
            project_dict[cnt] = item
            cnt += 1
        return project_dict
    return None


def saveTask(task_data):
    task_detail = {
        "project_id": task_data['project_id'],
        "title": task_data['title'],
        "description": task_data['description'],
        "assignTo": task_data['assignee'],
        "status": 0,
        "createdOn": datetime.datetime.now().strftime("%x %X"),
        "deadline": task_data['deadline'],
        "due" : 0
    }
    projectMapper.saveTask(task_detail)


def getTasksDetail(project_id):
    task_detail = projectMapper.findTasks(project_id)
    if task_detail is not None:
        task_dict = {}
        cnt = 0
        for item in task_detail:
            item.pop("_id")
            task_dict[cnt] = item
            cnt += 1
        return task_dict
    return None


def addTeamMember(team_data):
    team_detail = {
        "project_id": team_data['project_id'],
        "emp_id": team_data['emp_id']
    }
    response = projectMapper.saveTeam(team_detail)
    return response


def getTeamDetail(project_id):
    team = projectMapper.getTeam(project_id)
    if team is not None:
        team_dict = {"project_id": project_id, "team": []}
        for item in team:
            team_dict["team"].append(item["emp_id"])
        return team_dict
    return None
