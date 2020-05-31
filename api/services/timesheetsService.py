from ..mapper import timesheetsMapper


def getByEmpId(emp_id):
    sheets = timesheetsMapper.findByEmpId(emp_id)
    return sheets


def add(timesheet):
    timesheetsMapper.save(timesheet)


def find(timesheet):
    sheet = timesheetsMapper.find(timesheet)
    return sheet


def update(timesheet):
    sheet = find(timesheet)
    timesheetsMapper.update(sheet, timesheet)
