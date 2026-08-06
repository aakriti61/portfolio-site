from django.urls import path
from . import api_views

urlpatterns = [
    path('projects/', api_views.ProjectListAPIView.as_view(), name='api_project_list'),
    path('projects/<slug:slug>/', api_views.ProjectDetailAPIView.as_view(), name='api_project_detail'),
    path('contact/', api_views.ContactMessageCreateAPIView.as_view(), name='api_contact'),
]