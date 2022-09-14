import graphene

from graphene_django import DjangoObjectType

from .models import Todo, Project, CustomUser


class ProjectObjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoObjectType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserObjectType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoObjectType)
    all_projects = graphene.List(ProjectObjectType)

    def resolve_all_todos(self, info):
        return Todo.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
