from . import principleService
from ..mapper import accountMapper,loggerMapper
import datetime


def saveLog(email):
    logDetail = {
        'email': email,
        'time': datetime.datetime.now()
    }
    loggerMapper.save(logDetail)
