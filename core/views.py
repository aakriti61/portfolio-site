from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Project
from .forms import ContactForm

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
    return render(request, 'core/project_detail.html', {'project': project})

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Thanks for reaching out! I'll get back to you soon.")
            return redirect('contact')
    else:
        form = ContactForm()
    return render(request, 'core/contact.html', {'form': form})