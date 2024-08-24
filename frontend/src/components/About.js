// About.js
import React from 'react';
import '../App.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About NoteMaster</h1>
            <p>NoteMaster is a powerful and user-friendly note-taking application designed to help you manage and organize your notes efficiently. Whether you're a student, professional, or just someone who loves to keep track of ideas, NoteMaster has you covered.</p>
            
            <h2>Features</h2>
            <ul>
                <li><strong>Organize Notes:</strong> Create, edit, and delete notes with ease.</li>
                <li><strong>Tag Management:</strong> Use tags to categorize and filter your notes.</li>
                <li><strong>User Authentication:</strong> Securely manage your notes with user authentication.</li>
                <li><strong>Responsive Design:</strong> Access your notes from any device, anytime, anywhere.</li>
            </ul>
            
            <h2>How to Use</h2>
            <p>To get started, simply log in or sign up to create an account. Once logged in, you can start creating and managing your notes right away. Use the sidebar to navigate between different sections of the application, such as your notes, profile, and more.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions, feedback, or need assistance, feel free to reach out to us at <a href="mailto:support@notemaster.com">support@notemaster.com</a>.</p>
        </div>
    );
}

export default About;
