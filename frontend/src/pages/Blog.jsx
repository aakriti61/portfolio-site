import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPosts, getCategories } from '../api/portfolio';
import { getPlaceholderStyle } from '../utils/placeholder';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get('category');

    useEffect(() => {
        setLoading(true);
        Promise.all([getPosts(categorySlug), getCategories()])
            .then(([postsRes, categoriesRes]) => {
                setPosts(postsRes.data.results);
                setCategories(categoriesRes.data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError('Could not load posts.');
                setLoading(false);
                console.error(err);
            });
    }, [categorySlug]);

    const stripHtml = (html) => html.replace(/<[^>]*>/g, '');

    return (
        <>
            <h1>Blog</h1>

            <div className="filter-bar">
                <Link to="/blog">All</Link>
                {categories.map((cat) => (
                    <Link key={cat.id} to={`/blog?category=${cat.slug}`}>{cat.name}</Link>
                ))}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && posts.length === 0 && <p>No posts yet.</p>}

           {posts.map((post) => (
            <div className="card card-with-image" key={post.id}>
            {post.featured_image ? (
            <img src={post.featured_image} alt={post.title} className="card-thumb" />
                ) : (
            <div className="card-thumb-placeholder" style={getPlaceholderStyle(post.title)}>
                {post.title.charAt(0)}
            </div>
        )}
        <div className="card-body">
            <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
            <p className="meta">
                {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {post.category && <> · <span className="tag">{post.category.name}</span></>}
            </p>
        </div>
    </div>
))}
        </>
    );
}

export default Blog;