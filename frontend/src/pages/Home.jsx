import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon, MailIcon } from '../components/Icons';
import { getProjects } from '../api/portfolio';
import { getPlaceholderStyle } from '../utils/placeholder';
import myPhoto from '../assets/me.jpg';

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
             <div className="hero-split">
                <div className="hero-left">
                    <p className="hero-eyebrow">Hi, I am</p>
                    <h1 className="hero-name">Aakriti</h1>
                    <p className="hero-title">Python &amp; Django Developer</p>
                    <div className="hero-socials">
                        <a href="mailto:aakriti206105@gmail.com" className="social-circle" aria-label="Email">
                        <MailIcon />
                        </a>
                        <a href="https://github.com/aakriti61" target="_blank" rel="noreferrer" className="social-circle" aria-label="GitHub">
                        <GithubIcon />
                        </a>
                        <a href="https://linkedin.com/in/aakriti-simkhada" target="_blank" rel="noreferrer" className="social-circle" aria-label="LinkedIn">
                        <LinkedinIcon />
                        </a>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={myPhoto} alt="Aakriti" className="hero-photo" />
                </div>
            </div>

            <h2>Featured Projects</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && featuredProjects.length === 0 && (
                <p>No featured projects yet.</p>
            )}
            {featuredProjects.map((project) => (
                <div className="card card-with-image" key={project.id}>
                    {project.image ? (
                        <img src={project.image} alt={project.title} className="card-thumb" />
                    ) : (
                        <div className="card-thumb-placeholder" style={getPlaceholderStyle(project.title)}>
                            {project.title.charAt(0)}
                        </div>
                    )}
                    <div className="card-body">
                        <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
                        <p>{project.description.slice(0, 120)}...</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Home;