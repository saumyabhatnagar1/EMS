from ..mapper import projectMapper
import datetime

def saveProject(project_data):
    project_detail = {
        "project_id": project_data['project_id'],
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
