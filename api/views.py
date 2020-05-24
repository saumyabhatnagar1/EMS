
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .models import Employee
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.core import serializers
from .serializers import EmployeeSerializer
    
@api_view(['POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def createAccount(request):
    if request.method == "POST":
        user_data = JSONParser().parse(request)
        try:
            Employee.objects.get(username=user_data['username'])
        except Employee.DoesNotExist:
            employee = Employee.objects.create_user(username=user_data['username'],password=user_data['password'])
            return JsonResponse({},status=status.HTTP_201_CREATED)
        return JsonResponse({"detail":"account already exist."},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def getAccount(request):
    user = Employee.objects.get(username=request.user)
    serializer = EmployeeSerializer(user)
    return JsonResponse(serializer.data,safe=False)


