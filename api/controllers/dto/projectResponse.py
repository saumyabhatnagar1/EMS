from rest_framework import serializers
from api.models import Project, Task


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'description',
            'assignTo',
            'status',
            'due',
            'createdOn',
            'deadline',
            'customer_id',
            'complete_percentage'
        )


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'id',
            'title',
            'description',
            'assignTo',
            'project_id',
            'status',
            'due',
            'createdOn',
            'deadline',
        )