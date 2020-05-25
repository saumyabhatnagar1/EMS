from rest_framework import serializers 
from api.models import Leave

class LeaveSerializer(serializers.ModelSerializer):
	class Meta:
		model = Leave
		fields = ('id','emp_id','leave_type','date','description',
			'posting_date','admin_remark','admin_remark_date','status','is_read')