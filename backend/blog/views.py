from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Post, Category


def post_list(request):
    post_list = Post.objects.filter(status='published')

    category_slug = request.GET.get('category')
    if category_slug:
        post_list = post_list.filter(category__slug=category_slug)

    paginator = Paginator(post_list, 5)
    page_number = request.GET.get('page')
    posts = paginator.get_page(page_number)

    categories = Category.objects.all()

    return render(request, 'blog/post_list.html', {
        'posts': posts,
        'categories': categories,
        'current_category': category_slug,
    })


def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, status='published')
    return render(request, 'blog/post_detail.html', {'post': post})