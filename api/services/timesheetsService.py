from ..mapper import timesheetsMapper


def findSheetById(id):
    sheet = timesheetsMapper.findById(id)
    if sheet is not None:
        return sheet
    return None


def add(timesheet):
    if find(timesheet) is None:
        return timesheetsMapper.save(timesheet)
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