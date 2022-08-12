from django_filters import rest_framework as filters

from todoapp.models import Todo


class TodoFilter(filters.FilterSet):

    created_year = filters.NumberFilter(field_name='created_at', lookup_expr='year')
    created_year__gt = filters.NumberFilter(field_name='created_at', lookup_expr='year__gt')
    created_year__lt = filters.NumberFilter(field_name='created_at', lookup_expr='year__lt')

    class Meta:
        model = Todo
        fields = ['created_at',]
