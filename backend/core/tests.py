from django.test import TestCase
from django.urls import reverse
from .models import Project, ContactMessage


class ProjectModelTest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Test Project",
            slug="test-project",
            description="A test project description.",
            tech_stack="Python, Django",
            featured=True,
        )

    def test_project_str(self):
        self.assertEqual(str(self.project), "Test Project")


class ProjectAPITest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Sample Project",
            slug="sample-project",
            description="Sample description.",
            tech_stack="Python",
            featured=True,
        )

    def test_project_list_api(self):
        response = self.client.get(reverse('api_project_list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['count'], 1)

    def test_project_detail_api(self):
        response = self.client.get(reverse('api_project_detail', args=['sample-project']))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], "Sample Project")

    def test_project_detail_404_for_missing_slug(self):
        response = self.client.get(reverse('api_project_detail', args=['does-not-exist']))
        self.assertEqual(response.status_code, 404)


class ContactAPITest(TestCase):
    def test_contact_submission_creates_message(self):
        response = self.client.post(reverse('api_contact'), {
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            'subject': 'Hello',
            'message': 'This is a test message.',
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_contact_rejects_invalid_email(self):
        response = self.client.post(reverse('api_contact'), {
            'name': 'Jane Doe',
            'email': 'not-an-email',
            'subject': 'Hello',
            'message': 'Test',
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContactMessage.objects.count(), 0)