import { useState } from 'react';
import { submitContactForm } from '../api/portfolio';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        submitContactForm(formData)
            .then(() => {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setSubmitting(false);
            })
            .catch((err) => {
                setSubmitting(false);
                if (err.response && err.response.data) {
                    setErrors(err.response.data);
                } else {
                    setErrors({ general: 'Something went wrong. Please try again.' });
                }
            });
    };

    return (
        <>
            <h1>Get in Touch</h1>

            {submitted && <p className="success-message">Thanks for reaching out! I'll get back to you soon.</p>}
            {errors.general && <p className="success-message" style={{ background: '#FFE8E8', borderColor: '#FF6B6B', color: '#8B1E1E' }}>{errors.general}</p>}

            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <span style={{ color: '#FF6B6B', fontSize: '0.85rem' }}>{errors.name}</span>}
                </p>
                <p>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <span style={{ color: '#FF6B6B', fontSize: '0.85rem' }}>{errors.email}</span>}
                </p>
                <p>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
                </p>
                <p>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required />
                    {errors.message && <span style={{ color: '#FF6B6B', fontSize: '0.85rem' }}>{errors.message}</span>}
                </p>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </>
    );
}

export default Contact;