function About() {
    return (
        <>
            <h1>About Me</h1>
            <p>
                Hi, I'm Aakriti — a developer who enjoys building things end-to-end,
                from backend APIs to the interfaces people actually interact with.
            </p>
            <p>
                This site itself is a good example: the backend is built with{' '}
                <strong>Django</strong> and <strong>Django REST Framework</strong>,
                serving data through a clean API, while the frontend is a{' '}
                <strong>React</strong> app that consumes it and renders everything you're
                looking at right now.
            </p>
            <p>
                I'm interested in Python, Django, and building practical, well-structured
                projects — feel free to check out my <a href="/projects">projects</a> or{' '}
                <a href="/blog">blog</a>, or reach out via the{' '}
                <a href="/contact">contact page</a>.
            </p>
        </>
    );
}

export default About;