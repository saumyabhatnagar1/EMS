from django.http import JsonResponse

from api.services import principleService
from ..models import Employee
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from ..serializers import EmployeeSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def index(request):
    user = Employee.objects.get(username=request.user)
    serializer = EmployeeSerializer(user)
    return JsonResponse(serializer.data,safe=False)
