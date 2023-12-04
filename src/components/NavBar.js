import React from 'react';
import '../style/NavBar.css'

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                {/* More links */}
            </ul>
        </nav>
    );
};

export default NavBar;