const skillGroups = [
    {
        category: 'Backend',
        color: 'var(--indigo)',
        skills: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'SQLite'],
    },
    {
        category: 'Frontend',
        color: 'var(--coral)',
        skills: ['React', 'JavaScript', 'HTML & CSS', 'React Router'],
    },
    {
        category: 'Tools',
        color: 'var(--teal)',
        skills: ['Git & GitHub', 'REST APIs', 'VS Code', 'Vite'],
    },
];

function About() {
    return (
        <>
            <div className="about-header">
                <div className="avatar-small">YN</div>
                <div className="about-bio">
                    <h1>About Me</h1>
                    <p>
                        Hi, I'm building things end-to-end — from backend APIs to the
                        interfaces people actually interact with.
                    </p>
                    <p>
                        This site itself is a good example: the backend is built with{' '}
                        <strong>Django</strong> and <strong>Django REST Framework</strong>,
                        serving data through a clean API, while the frontend is a{' '}
                        <strong>React</strong> app that consumes it and renders everything
                        you're looking at right now.
                    </p>
                    <p>
                        I'm interested in Python, Django, and building practical,
                        well-structured projects — feel free to check out my{' '}
                        <a href="/projects">projects</a> or <a href="/blog">blog</a>, or
                        reach out via the <a href="/contact">contact page</a>.
                    </p>
                </div>
            </div>

            <div className="skills-section">
                <h2>Skills &amp; Tools</h2>
                <div className="skills-grid">
                    {skillGroups.map((group) => (
                        <div className="skill-group" key={group.category}>
                            <h3>
                                <span className="skill-group-dot" style={{ background: group.color }} />
                                {group.category}
                            </h3>
                            <div className="skill-pills">
                                {group.skills.map((skill) => (
                                    <span className="skill-pill" key={skill}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default About;