import apiClient from './client';

export const getProjects = () => apiClient.get('/projects/');
export const getProject = (slug) => apiClient.get(`/projects/${slug}/`);

export const getPosts = (categorySlug) => {
    const params = categorySlug ? { category: categorySlug } : {};
    return apiClient.get('/posts/', { params });
};
export const getPost = (slug) => apiClient.get(`/posts/${slug}/`);

export const getCategories = () => apiClient.get('/categories/');

export const submitContactForm = (data) => apiClient.post('/contact/', data);