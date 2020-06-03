from ..mapper import projectMapper


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
    projectMapper.saveTeam(team_data)


def getTeamDetail(project_id):
    team = projectMapper.getTeam(project_id)
    return team


def filterEmployee():
    employees = projectMapper.filterEmployee()
    return employees


def saveComment(task_comment):
    projectMapper.saveComment(task_comment)


def getAllComments(task_id):
    comments = projectMapper.getAllComments(task_id)
    return comments
