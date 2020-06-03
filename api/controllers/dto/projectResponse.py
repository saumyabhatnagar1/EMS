from rest_framework import serializers

from api.models import Project, Task, WorksOn, TaskComment


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


class WorkOnSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorksOn
        fields = (
            'id',
            'project_id',
            'emp_id'
        )


class TaskCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskComment
        fields = (
            'id',
            'task_id',
            'username',
            'comment',
            'date'
        )
