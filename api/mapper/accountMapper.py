from . import client

client = client.connectToDB()
Users = client.primer.users


def save(account):
    id = Users.insert_one(account).inserted_id
    return id


def findByEmail(email):
    query = {"email": email}
    result = list(Users.find(query))
    if len(result) > 0:
        return result[0]
    return None
