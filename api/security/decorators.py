from functools import wraps

from django.http import JsonResponse

from api.services import principleService


def login_required(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if not principleService.isLoggedIn():
            return JsonResponse({"status": 410, "message": "MUST LOG FIRST"})
        return function(request, *args, **kwargs)

    return wrap


def is_admin(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if principleService.getRole() != "ADMIN":
            return JsonResponse({"status": 401, "message": "UNAUTHORIZED REQUEST"})
        return function(request, *args, **kwargs)

    return wrap


def is_post(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if request.method != 'POST':
            return JsonResponse({"status": 404, "message": "INVALID REQUEST"})
        return function(request, *args, **kwargs)

    return wrap


def is_HR(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if principleService.getRole() != "HR":
            return JsonResponse({"status": 401, "message": "UNAUTHORIZED REQUEST"})
        return function(request, *args, **kwargs)

    return wrap


def has_permission(permission):
    def wrap(function):
        def wrapper(*args):
            # code for checking permission
            # if permission is true:
            # return function(*args)
            # else
            # return unauthorized request
            print(permission)
            return function(*args)
        return wrapper
    return wrap
