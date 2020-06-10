import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from api.services import accountService
from .dto.accountResponse import ProfileSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def createAccount(request):
    user_data = JSONParser().parse(request)
    try:
        accountService.createAccount(data=user_data)
        return JsonResponse({"detail": "account created!."}, status=status.HTTP_201_CREATED)
    except:
        return JsonResponse({"detail": "account already exist."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user_data = json.loads(request.body)
    account = accountService.getUserProfile(username=user_data["username"])
    serializer = ProfileSerializer(account)
    if serializer.data is not None:
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated | IsAdminUser])
def updateUserProfile(request):
    user_data = json.loads(request.body)
    accountService.updateUserProfile(user_data, user_data["username"])
    return JsonResponse({"detail": "employee details updated!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getAllAccounts(request):
    accounts = accountService.getAllAccounts()
    serializer = ProfileSerializer(accounts, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def countEmployeeByGender(request):
    gender_count = accountService.countEmployeeByGender()
    return JsonResponse(gender_count, safe=False, status=status.HTTP_200_OK)
