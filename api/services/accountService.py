from . import principleService
from ..mapper import accountMapper


def authenticate(account, password):
    return account["password"] == password


def createUser(account):
    account["role"] = "USER"
    if accountMapper.findByEmail(account["email"]) is None:
        id = accountMapper.save(account)
        return id
    return None


def getUser(user_data):
    account = accountMapper.findByEmail(user_data["email"])
    if account and authenticate(account, user_data["password"]):
        principleService.setUsername(account["email"])
        principleService.setRole(account["role"])
        return principleService.getUser()
    return None


def getUserProfile(email):
    account = accountMapper.findByEmail(email)
    if account is not None:
        return account
    return None
