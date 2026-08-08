import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../api/portfolio';

function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProject(slug)
            .then((response) => {
                setProject(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Project not found.');
                setLoading(false);
                console.error(err);
            });
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>{project.title}</h1>
            {project.image && <img src={project.image} alt={project.title} style={{ maxWidth: '400px' }} />}
            <p>{project.description}</p>
            <p><strong>Tech stack:</strong> {project.tech_stack}</p>
            {project.github_link && <p><a href={project.github_link} target="_blank" rel="noreferrer">GitHub</a></p>}
            {project.live_link && <p><a href={project.live_link} target="_blank" rel="noreferrer">Live Site</a></p>}
        </>
    );
}

export default ProjectDetail;