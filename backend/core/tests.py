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

    def test_project_featured_default_false(self):
        project2 = Project.objects.create(
            title="Another Project",
            slug="another-project",
            description="Desc",
            tech_stack="Django",
        )
        self.assertFalse(project2.featured)


class CoreViewsTest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Sample Project",
            slug="sample-project",
            description="Sample description.",
            tech_stack="Python",
            featured=True,
        )

    def test_home_page_status_code(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)

    def test_home_page_shows_featured_project(self):
        response = self.client.get(reverse('home'))
        self.assertContains(response, "Sample Project")

    def test_about_page_status_code(self):
        response = self.client.get(reverse('about'))
        self.assertEqual(response.status_code, 200)

    def test_project_list_status_code(self):
        response = self.client.get(reverse('project_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Sample Project")

    def test_project_detail_status_code(self):
        response = self.client.get(reverse('project_detail', args=['sample-project']))
        self.assertEqual(response.status_code, 200)

    def test_project_detail_404_for_missing_slug(self):
        response = self.client.get(reverse('project_detail', args=['does-not-exist']))
        self.assertEqual(response.status_code, 404)


class ContactFormTest(TestCase):
    def test_contact_page_loads(self):
        response = self.client.get(reverse('contact'))
        self.assertEqual(response.status_code, 200)

    def test_contact_form_submission_creates_message(self):
        response = self.client.post(reverse('contact'), {
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            'subject': 'Hello',
            'message': 'This is a test message.',
        })
        self.assertEqual(response.status_code, 302)  # redirect after success
        self.assertEqual(ContactMessage.objects.count(), 1)
        saved = ContactMessage.objects.first()
        self.assertEqual(saved.name, 'Jane Doe')

    def test_contact_form_rejects_invalid_email(self):
        response = self.client.post(reverse('contact'), {
            'name': 'Jane Doe',
            'email': 'not-an-email',
            'subject': 'Hello',
            'message': 'Test',
        })
        self.assertEqual(ContactMessage.objects.count(), 0)