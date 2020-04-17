from ..mapper import projectMapper


def saveProject(project_data):
    project_detail = {
        "project_id": project_data['project_id'],
        "name": project_data['name'],
        "team": project_data['team'],
        "completed": False
    }
    projectMapper.save(project_detail)

def getProjectDetail():
    project_detail = projectMapper.findActiveProjects()
    if project_detail is not None:
        project_dict = {}
        cnt = 0
        for item in project_detail:
            item.pop("completed")
            item.pop("_id")
            project_dict[cnt] = item
            cnt += 1
        return project_dict
    return None
