from django.db import models

from authapp.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=64)
    repo = models.URLField(max_length=128, null=True)
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.PROTECT)
    text = models.TextField(max_length=2048)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    is_closed = models.BooleanField(default=False)
