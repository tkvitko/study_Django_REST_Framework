from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    pagination_class = ProjectLimitOffsetPagination
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer

    def get_queryset(self):
        # фильтр по строке, содержащейся в названии проекта
        name_contains = self.request.query_params.get('name_contains', None)
        if name_contains:
            return Project.objects.filter(name__contains=name_contains)
        return Project.objects.all()


class TodoModelViewSet(ModelViewSet):
    pagination_class = TodoLimitOffsetPagination
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer

    def perform_destroy(self, instance):
        # при HTTP DELETE не удалять запись из базы, а помечать удаленной
        instance.is_closed = True
        instance.save()

    def get_queryset(self):
        # фильтр по id проекта
        project_id = self.request.query_params.get('project_id', None)
        if project_id:
            return Todo.objects.filter(project=project_id)
        return Todo.objects.all()
