from ..mapper import accountMapper

def authenticate(account,password):
    return account["password"] == password

def createUser(account):
    if accountMapper.findByEmail(account["email"]) == None:
        id = accountMapper.insert(account)
        return id
    return None

def getUser(user_data):
    account = accountMapper.findByEmail(user_data["email"])
    if authenticate(account,user_data["password"]):
        del account["password"]
        return account
    return None

