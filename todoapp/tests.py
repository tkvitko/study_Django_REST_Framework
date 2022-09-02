from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from authapp.models import CustomUser
from todoapp.models import Project, Todo
from todoapp.views import ProjectModelViewSet

TEST_USERNAME = 'autotest_user'
TEST_PASSWORD = 'autotest_password'


class APIRequestFactoryTests(TestCase):
    def setUp(self) -> None:
        self.user = CustomUser.objects.create_superuser(username=TEST_USERNAME, password=TEST_PASSWORD)
        self.project = mixer.blend(Project)

    def test_get_projects_without_auth(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_projects_with_auth(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')

        # login
        force_authenticate(request, user=self.user)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)


class APIClientTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user = CustomUser.objects.create_superuser(username=TEST_USERNAME, password=TEST_PASSWORD)

    def test_get_todos_without_auth(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class APITestCaseTests(APITestCase):

    def setUp(self) -> None:
        self.user = CustomUser.objects.create_superuser(username=TEST_USERNAME, password=TEST_PASSWORD)
        self.todo = mixer.blend(Todo)

    def test_get_todos_without_auth(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_todos_with_auth(self):
        self.client.force_authenticate(self.user)

        # login
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

        # logout
        self.client.logout()
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
