from django.shortcuts import render, get_object_or_404
from .models import Project

def home(request):
    featured_projects = Project.objects.filter(featured=True)[:3]
    return render(request, 'core/home.html', {'featured_projects': featured_projects})

def about(request):
    return render(request, 'core/about.html')

def project_list(request):
    projects = Project.objects.all()
    return render(request, 'core/project_list.html', {'projects': projects})

def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)