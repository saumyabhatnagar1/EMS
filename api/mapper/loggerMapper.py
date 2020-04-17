import pymongo

client = pymongo.MongoClient("localhost", 27017)
Logs = client.primer.logs


def save(logDetail):
    id = Logs.insert_one(logDetail).inserted_id
    return id
