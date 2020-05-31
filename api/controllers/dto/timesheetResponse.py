from rest_framework import serializers

from api.models import Timesheet


class TimesheetSerializer(serializers.ModelSerializer):
    in_time = serializers.TimeField(format='%H:%M')
    out_time = serializers.TimeField(format='%H:%M')

    class Meta:
        model = Timesheet
        fields = ('id', 'date', 'emp_id', 'in_time', 'out_time')
