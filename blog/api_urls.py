from django.urls import path
from . import api_views

urlpatterns = [
    path('posts/', api_views.PostListAPIView.as_view(), name='api_post_list'),
    path('posts/<slug:slug>/', api_views.PostDetailAPIView.as_view(), name='api_post_detail'),
    path('categories/', api_views.CategoryListAPIView.as_view(), name='api_category_list'),
]