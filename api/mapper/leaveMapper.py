from . import client
from bson.objectid import ObjectId
import datetime

client = client.connectToDB()
Leaves = client.primer.leaves
LeaveTypes = client.primer.leavetypes


def save(leaveDetail):
    id = Leaves.insert_one(leaveDetail).inserted_id
    return id


def findLeaveDetail(email):
    query = {"emp_id": email}
    leaves = list(Leaves.find(query))
    if len(leaves) > 0:
        return leaves
    return None


def update(leaveDetail):
    query = {"emp_id": leaveDetail['emp_id'], "date": leaveDetail['date']}
    update_to = {"$set": {
        "admin_remark": leaveDetail['admin_remark'],
        "admin_remark_date": datetime.datetime.now(),
        "status": leaveDetail['status'],
        "is_read": True
    }}
    response = Leaves.update(query, update_to)
    return response


def saveLeaveType(leave_type):
    id = LeaveTypes.insert_one(leave_type).inserted_id
    return id


def getLeaveType():
    leave_types = list(LeaveTypes.find())
    if len(leave_types) > 0:
        return leave_types
    return None


def updateLeaveType(leave_type):
    query = {"_id": ObjectId(leave_type["id"])}
    update_to = {"$set": {"value": leave_type["value"]}}
    response = LeaveTypes.update(query, update_to)
    return response


def deleteLeaveType(leave_type):
    query = {"_id": ObjectId(leave_type["id"])}
    response = LeaveTypes.remove(query)
    return response


def findAll():
    leaves = list(Leaves.find())
    if len(leaves) > 0:
        return leaves
    return None

def getLeaveTypeById(leave_type):
    query = {"_id": ObjectId(leave_type["id"])}
    result = list(LeaveTypes.find(query))
    if len(result)>0:
        return result[0]
    return None