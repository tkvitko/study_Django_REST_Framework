from rest_framework.serializers import ModelSerializer

from authapp.serializers import CustomUserModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    users = CustomUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = ('name', 'repo', 'users')


class TodoModelSerializer(ModelSerializer):
    author = CustomUserModelSerializer()
    project = ProjectModelSerializer()

    class Meta:
        model = Todo
        fields = ('project', 'text', 'author', 'is_closed')
