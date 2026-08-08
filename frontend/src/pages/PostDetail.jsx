import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/portfolio';

function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPost(slug)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Post not found.');
                setLoading(false);
                console.error(err);
            });
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>{post.title}</h1>
            <p className="meta">
                {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' — by '}{post.author}
                {post.category && <> · <span className="tag">{post.category.name}</span></>}
            </p>
            {post.featured_image && (
                <img src={post.featured_image} alt={post.title} style={{ maxWidth: '500px' }} />
            )}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
    );
}

export default PostDetail;