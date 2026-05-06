import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky-header glass-card">
      <div className="container header-content">
        <Link to="/" className="logo-link">
          <Zap className="electric-bolt animate-pulse-icon" size={28} />
          <h1 className="logo-text">MAX PREMIUM SUITE</h1>
        </Link>
        
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          ☰
        </button>

        <nav className={`main-nav ${isOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/category/Streaming & Entertainment">Streaming</Link>
          <Link to="/category/Social & Communication">Social</Link>
          <Link to="/category/Design, Video & Creative">Creative</Link>
          <Link to="/category/Developer & AI Platforms">Developer</Link>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="header-actions">
           <button className="search-btn glass-card" onClick={onOpenSearch}>
             <Search size={18} />
             <span>Search... </span>
             <kbd>Ctrl+K</kbd>
           </button>
        </div>
      </div>
      <div className="tagline-banner">
        <span>Verified Cracked Premium Apps • Virus-Free • Instant Delivery</span>
      </div>
    </header>
  );
};
