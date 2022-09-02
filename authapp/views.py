from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerV2


# Legacy
# class CustomUserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserModelSerializer


class CustomUserLimitedModelViewSet(mixins.RetrieveModelMixin,
                                    mixins.ListModelMixin,
                                    mixins.UpdateModelMixin,
                                    GenericViewSet):
    queryset = CustomUser.objects.all()

    # serializer_class = CustomUserModelSerializer
    def get_serializer_class(self):
        if self.request.version == '2.0':
            return CustomUserModelSerializerV2
        return CustomUserModelSerializer
