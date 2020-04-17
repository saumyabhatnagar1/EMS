import pymongo

client = pymongo.MongoClient("localhost", 27017)
Leaves = client.primer.leaves


def save(leaveDetail):
    id = Leaves.insert_one(leaveDetail).inserted_id
    return id


def findLeaveDetail(email):
    query = {"email": email}
    leaves = list(Leaves.find(query))
    if len(leaves) > 0:
        return leaves
    return None
