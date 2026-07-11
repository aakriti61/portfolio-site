from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Post, Category


class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='author', password='testpass123')
        self.category = Category.objects.create(name="Django", slug="django")

    def test_post_auto_slug_generation(self):
        post = Post.objects.create(
            title="My First Post",
            author=self.user,
            category=self.category,
            content="Some content here.",
            status='published',
        )
        self.assertEqual(post.slug, "my-first-post")

    def test_post_str(self):
        post = Post.objects.create(
            title="Another Post",
            author=self.user,
            content="Content.",
        )
        self.assertEqual(str(post), "Another Post")


class BlogViewsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='author', password='testpass123')
        self.category = Category.objects.create(name="Tech", slug="tech")
        self.published_post = Post.objects.create(
            title="Published Post",
            author=self.user,
            category=self.category,
            content="Visible content.",
            status='published',
        )
        self.draft_post = Post.objects.create(
            title="Draft Post",
            author=self.user,
            content="Hidden content.",
            status='draft',
        )

    def test_post_list_status_code(self):
        response = self.client.get(reverse('post_list'))
        self.assertEqual(response.status_code, 200)

    def test_post_list_shows_only_published(self):
        response = self.client.get(reverse('post_list'))
        self.assertContains(response, "Published Post")
        self.assertNotContains(response, "Draft Post")

    def test_post_list_category_filter(self):
        response = self.client.get(reverse('post_list'), {'category': 'tech'})
        self.assertContains(response, "Published Post")

    def test_post_detail_status_code(self):
        response = self.client.get(reverse('post_detail', args=[self.published_post.slug]))
        self.assertEqual(response.status_code, 200)

    def test_draft_post_detail_returns_404(self):
        response = self.client.get(reverse('post_detail', args=[self.draft_post.slug]))
        self.assertEqual(response.status_code, 404)