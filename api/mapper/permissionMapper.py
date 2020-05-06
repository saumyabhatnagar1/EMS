from . import client

client = client.connectToDB()
Permissions = client.primer.permissions


def getPermission(role_id):
    query = {"role_id": role_id}
    roles = list(Permissions.find(query))
    if len(roles) > 0:
        return roles[0]
    return None


def addPermission(permission_data):
    id = Permissions.insert_one(permission_data).inserted_id
    return id


def updatePermission(permission_detail):
    query = {"role_id": permission_detail['role_id']}
    update_to = {"$set": {"permission":permission_detail["permission"]}}
    response = Permissions.update(query, update_to)
    return response

