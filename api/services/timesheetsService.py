from ..mapper import timesheetsMapper


def findSheetById(id):
    sheets = timesheetsMapper.findById(id)
    if sheets is not None:
        sheet_dict = {}
        cnt = 0
        for sheet in sheets:
            del sheet["_id"]
            sheet_dict[cnt] = sheet
            cnt += 1
        return sheet_dict
    return None


def add(timesheet):
    timesheet_data = {
        "username": timesheet["username"],
        "day": timesheet["day"],
        "date": timesheet["date"],
        "month": timesheet["month"],
        "year": timesheet["year"],
        "timings": timesheet["timings"],
        "createdOn": timesheet["createdOn"]
    }
    if find(timesheet) is None:
        return timesheetsMapper.save(timesheet_data)
    return None


def find(timesheet):
    sheet = timesheetsMapper.find(timesheet)
    if sheet is not None:
        return sheet
    return None


def update(timesheet):
    sheet = timesheetsMapper.find(timesheet)
    if sheet is not None:
        return timesheetsMapper.update(timesheet)
    return None
