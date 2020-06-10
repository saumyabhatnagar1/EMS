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


def getByDate(timesheet_data):
    timesheet = timesheetsMapper.findByDate(timesheet_data)
    return timesheet


def getByMonth(timesheet_data):
    timesheet = timesheetsMapper.findByMonth(timesheet_data)
    return timesheet


def getByYear(timesheet_data):
    timesheet = timesheetsMapper.findByYear(timesheet_data)
    return timesheet
