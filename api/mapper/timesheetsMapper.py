import pymongo

client = pymongo.MongoClient("localhost", 27017)
Timesheets = client.primer.timesheets


def save(timesheet):
    var = Timesheets.insert_one(timesheet).inserted_id
    return var


def find(timesheet):
    query = {"username": timesheet["username"], "date": timesheet["date"], "month": timesheet["month"],
             "year": timesheet["year"]}
    result = list(Timesheets.find(query))
    if len(result) > 0:
        return result[0]
    return None
