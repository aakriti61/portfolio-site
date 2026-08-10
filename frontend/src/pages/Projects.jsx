import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api/portfolio';
import { getPlaceholderStyle } from '../utils/placeholder';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProjects()
            .then((response) => {
                setProjects(response.data.results);
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
            <h1>My Projects</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && projects.length === 0 && <p>No projects yet.</p>}
            {projects.map((project) => (
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
                        <p>{project.description.slice(0, 150)}...</p>
                        <span className="tag">{project.tech_stack}</span>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Projects;