from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Post, Category


class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='author', password='testpass123')

    def test_post_auto_slug_generation(self):
        post = Post.objects.create(
            title="My First Post",
            author=self.user,
            content="Some content here.",
            status='published',
        )
        self.assertEqual(post.slug, "my-first-post")


class BlogAPITest(TestCase):
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

    def test_post_list_api_excludes_drafts(self):
        response = self.client.get(reverse('api_post_list'))
        titles = [p['title'] for p in response.data['results']]
        self.assertIn("Published Post", titles)
        self.assertNotIn("Draft Post", titles)

    def test_post_list_category_filter(self):
        response = self.client.get(reverse('api_post_list'), {'category': 'tech'})
        titles = [p['title'] for p in response.data['results']]
        self.assertIn("Published Post", titles)

    def test_post_detail_api(self):
        response = self.client.get(reverse('api_post_detail', args=[self.published_post.slug]))
        self.assertEqual(response.status_code, 200)

    def test_draft_post_detail_404(self):
        response = self.client.get(reverse('api_post_detail', args=[self.draft_post.slug]))
        self.assertEqual(response.status_code, 404)