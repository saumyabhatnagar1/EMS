from django.http import JsonResponse

from api.services import principleService


def index(request):
    return JsonResponse(principleService.getUser())
