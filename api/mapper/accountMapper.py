import pymongo
client = pymongo.MongoClient("localhost",27017)
Users = client.primer.users
import json

def insert(account):
    id = Users.insert_one(account).inserted_id
    return id

def findByEmail(email):
    query = {"email":email}
    result = list(Users.find(query))
    if len(result) > 0:
        return result[0]
    return None