from rest_framework import serializers 
from api.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('username','role')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('user_id','username','role','name','email','gender','date','isActive',
        	'houseNumber', 'street','addressLine','mobileNumber','country')