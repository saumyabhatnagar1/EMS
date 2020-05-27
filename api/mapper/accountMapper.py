from .models.accountModel import Employee


def save(account):
    employee = Employee.objects.create_user(username=account['username'], password=account['password'])
    employee.save()


def find(username):
    return Employee.objects.get(username=username)


def update(user_data, username):
    employee = Employee.objects.get(username=username)
    employee.role = user_data['role']
    employee.name = user_data['name']
    employee.mobileNumber = user_data['mobileNumber']
    employee.street = user_data['street']
    employee.addressLine = user_data['addressLine']
    employee.gender = user_data['gender']
    employee.houseNumber = user_data['houseNumber']
    employee.country = user_data['country']
    employee.isActive = user_data['isActive']
    employee.designation = user_data['designation']
    employee.save()


def getAll():
    accounts = Employee.objects.all()
    return accounts
