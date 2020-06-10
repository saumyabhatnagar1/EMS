from ..mapper import accountMapper


# newly added methods...
def createAccount(data):
    accountMapper.save(data)


def getUserProfile(username):
    account = accountMapper.find(username)
    if account is not None:
        return account
    return None


def updateUserProfile(user_data, username):
    accountMapper.update(user_data, username)


def getAllAccounts():
    accounts = accountMapper.getAll()
    return accounts


def countEmployeeByGender():
    account = accountMapper.getAll()
    male = account.filter(gender='Male')
    female = account.filter(gender='Female')
    other = account.filter(gender='Other')
    gender_count = {
        'Male': len(male),
        'Female': len(female),
        'Other': len(other)
    }
    return gender_count
