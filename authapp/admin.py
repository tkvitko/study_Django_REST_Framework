from django.contrib import admin
from authapp.models import CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    pass


admin.site.register(CustomUser, CustomUserAdmin)
