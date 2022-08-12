from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import CustomUser
from .serializers import CustomUserModelSerializer


# Legacy
# class CustomUserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserModelSerializer


class CustomUserLimitedModelViewSet(mixins.RetrieveModelMixin,
                                    mixins.ListModelMixin,
                                    mixins.UpdateModelMixin,
                                    GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
