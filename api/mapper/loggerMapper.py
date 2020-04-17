from . import client

client = client.connectToDB()
Logs = client.primer.logs


def save(logDetail):
    id = Logs.insert_one(logDetail).inserted_id
    return id
