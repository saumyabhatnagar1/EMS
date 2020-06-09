from rest_framework import serializers

from api.models import Leave, LeaveType
from api.services import leavesService


class LeaveSerializer(serializers.ModelSerializer):
    leavesLeft = serializers.SerializerMethodField()

    class Meta:
        model = Leave
        fields = ('id', 'emp_id', 'leave_type', 'date', 'description',
                  'posting_date', 'admin_remark', 'admin_remark_date', 'status', 'is_read', 'leavesLeft')

    @staticmethod
    def get_leavesLeft(obj):
        leavesLeft = leavesService.getLeavesLeft(username=obj.emp_id)
        return leavesLeft


class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveType
        fields = (
            'id',
            'value',
            'description',
            'createdOn',
            'number_of_leaves'
        )
