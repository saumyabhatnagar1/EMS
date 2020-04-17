import pymongo


def connectToDB():
    client = pymongo.MongoClient("localhost", 27017)
    return client
