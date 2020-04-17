from . import client

client = client.connectToDB()
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


def update(timesheet):
    query = {"username": timesheet["username"], "date": timesheet["date"], "month": timesheet["month"],
             "year": timesheet["year"]}
    updateTo = {"$set": {"timings": {"in_time": {"hours": timesheet["timings"]["in_time"]["hours"],
                                                 "minutes": timesheet["timings"]["in_time"]["minutes"]},
                                     "out_time": {"hours": timesheet["timings"]["out_time"]["hours"],
                                                  "minutes": timesheet["timings"]["out_time"]["minutes"]}}}}
    var = Timesheets.update(query, updateTo)
    return var
