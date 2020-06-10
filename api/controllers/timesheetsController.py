import json

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from api.controllers.dto.timesheetResponse import TimesheetSerializer
from api.mapper.models.TimesheetModel import Timesheet
from api.services import timesheetsService


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def add(request):
    timesheet = json.loads(request.body)
    timesheetsService.add(timesheet)
    return JsonResponse({'detail': 'Timesheet saved.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def find(request):
    timesheet = json.loads(request.body)
    try:
        timesheets = timesheetsService.find(timesheet)
        serializer = TimesheetSerializer(timesheets)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    except Timesheet.DoesNotExist:
        return JsonResponse({'detail': 'No Timesheet found'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update(request):
    timesheet_data = json.loads(request.body)
    try:
        timesheetsService.update(timesheet_data)
        return JsonResponse({'detail': 'Timesheet updated!'}, status=status.HTTP_200_OK)
    except Timesheet.DoesNotExist:
        return JsonResponse({'detail': 'No Timesheet found'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getByEmpId(request):
    emp_id = request.user.username
    sheet = timesheetsService.getByEmpId(emp_id)
    serializer = TimesheetSerializer(sheet, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getByDate(request):
    timesheet_data = json.loads(request.body)
    timesheet = timesheetsService.getByDate(timesheet_data)
    serializer = TimesheetSerializer(timesheet, many=False)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getByMonth(request):
    timesheet_data = json.loads(request.body)
    timesheets = timesheetsService.getByMonth(timesheet_data)
    serializer = TimesheetSerializer(timesheets, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getByYear(request):
    timesheet_data = json.loads(request.body)
    timesheets = timesheetsService.getByYear(timesheet_data)
    serializer = TimesheetSerializer(timesheets, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
