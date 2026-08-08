import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/portfolio';

function Home() {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProjects()
            .then((response) => {
                const featured = response.data.results.filter(p => p.featured).slice(0, 3);
                setFeaturedProjects(featured);
                setLoading(false);
            })
            .catch((err) => {
                setError('Could not load projects.');
                setLoading(false);
                console.error(err);
            });
    }, []);

    return (
        <>
            <h1>Hi, I'm Aakriti</h1>
            <p>I build things with Python and Django.</p>

            <h2>Featured Projects</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && featuredProjects.length === 0 && (
                <p>No featured projects yet.</p>
            )}
            {featuredProjects.map((project) => (
                <div className="card" key={project.id}>
                    <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
                    <p>{project.description.slice(0, 120)}...</p>
                </div>
            ))}
        </>
    );
}

export default Home;