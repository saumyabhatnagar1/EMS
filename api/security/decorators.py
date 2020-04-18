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
