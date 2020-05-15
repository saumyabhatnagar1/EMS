from . import principleService, permissionService
from ..mapper import accountMapper
import datetime


def authenticate(account, password):
    return account["password"] == password


def createUser(account):
    account["role"] = "USER"
    account["isActive"] = True
    account["createdOn"] = datetime.datetime.now()
    if accountMapper.findByEmail(account["email"]) is None:
        id = accountMapper.save(account)
        return id
    return None


def getUser(user_data):
    account = accountMapper.findByEmail(user_data["email"])
    if account and authenticate(account, user_data["password"]):
        principleService.setUsername(account["email"])
        principleService.setRole(account["role"])
        permissions = permissionService.getPermissionDetail(account["role"])
        principleService.setAuthorizations(permissions)
        return principleService.getUser()
    return None


def getUserProfile(email):
    account = accountMapper.findByEmail(email)
    if account is not None:
        return account
    return None


def updateUserProfile(user_data, email):
    response = accountMapper.update(user_data, email)
    if response is not None:
        return response
    return None

def getAllAccounts():
    accounts = accountMapper.getAll()
    for account in accounts:
        account["id"] = str(account["_id"])
        del account["_id"]
    return accounts
