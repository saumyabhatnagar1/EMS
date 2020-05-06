from ..mapper import permissionMapper


def addPermission(permission_data):
    roles = permissionMapper.getPermission(permission_data["role_id"])
    if roles is None:
        response = permissionMapper.addPermission(permission_data)
    else:
        for i in range(0, len(permission_data['permission'])):
            roles['permission'].append(permission_data['permission'][i])
        response = permissionMapper.updatePermission(roles)
    if response is not None:
        return response
    return None


def getPermissionDetail(role_id):
    roles = permissionMapper.getPermission(role_id)
    del roles["_id"]
    if roles is not None:
        return roles
    return None
