import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className="site-header">
            <Link to="/" className="logo">Aakriti</Link>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact" className="nav-cta">Contact</Link>
            </nav>
        </header>
    );
}

export default Navbar;