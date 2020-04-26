from ..mapper import projectMapper
import datetime
import time


def saveProject(project_data):
    project_detail = {
        "project_id": int(round(time.time() * 1000)),
        "name": project_data['name'],
        "date": datetime.datetime.now(),
        "team": project_data['team'],
        "completed": False,
    }
    projectMapper.save(project_detail)


def getProjectsDetail():
    project_detail = projectMapper.findProjects()
    if project_detail is not None:
        project_dict = {}
        cnt = 0
        for item in project_detail:
            item.pop("_id")
            project_dict[cnt] = item
            cnt += 1
        return project_dict
    return None


def saveTask(task_data):
    task_detail = {
        "project_id": task_data['project_id'],
        "description": task_data['description'],
        "assignee": task_data['assignee'],
        "completed": False,
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


def addTeamMember(project_id, team_detail):
    team = projectMapper.getTeam(project_id)
    cnt = len(team)
    for member in team_detail:
        team[str(cnt)] = team_detail[member]
        cnt += 1
    response = projectMapper.saveTeam(project_id, team)
    return response


def getTeamDetail(project_id):
    team = projectMapper.getTeam(project_id)
    if team is not None:
        return team
    return None
