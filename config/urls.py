"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from graphene_django.views import GraphQLView

from authapp.views import CustomUserLimitedModelViewSet
from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg.openapi import Info, License, Contact

schema_view = get_schema_view(
    Info(
        title='TodoApp',
        default_version='1.0',
        description='My App',
        license=License(name='MIT'),
        contact=Contact(email='tkvitko@gmail.com')
    )
)

router = DefaultRouter()
router.register('users', CustomUserLimitedModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-auth-token/', views.obtain_auth_token),
    path('swagger', schema_view.with_ui()),
    path('graphql', GraphQLView.as_view(graphiql=True)),
]
