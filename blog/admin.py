from django.contrib import admin
from .models import Post, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'status', 'published_at')
    list_filter = ('status', 'category', 'author')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'content')