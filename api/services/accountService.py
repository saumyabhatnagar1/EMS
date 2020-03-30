from ..mapper import accountMapper
from . import principleService

def authenticate(account,password):
    return account["password"] == password

def createUser(account):
    account["role"] = "USER"
    if accountMapper.findByEmail(account["email"]) == None:
        id = accountMapper.insert(account)
        return id
    return None

def getUser(user_data):
    account = accountMapper.findByEmail(user_data["email"])
    if account and authenticate(account,user_data["password"]):
        principleService.setUsername(account["email"])
        principleService.setRole(account["role"])
        print(principleService.getUser())
        return principleService.getUser()
    return None

