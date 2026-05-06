import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <header className="sticky-header glass-card">
      <div className="container header-content">
        <Link to="/" className="logo-link">
          <Zap className="electric-bolt animate-pulse-icon" size={28} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="logo-text">MAX PREMIUM SUITE</h1>
            <span className="coming-tag">More cracked apps coming</span>
          </div>
        </Link>
        
        <nav className={`main-nav ${isOpen ? 'open' : ''}`}>
          <button className="mobile-close-btn" onClick={closeMenu} aria-label="Close menu">✕</button>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/category/All" onClick={closeMenu}>All</Link>
          <Link to="/category/Streaming & Entertainment" onClick={closeMenu}>Streaming</Link>
          <Link to="/category/Social & Communication" onClick={closeMenu}>Social</Link>
          <Link to="/category/Design, Video & Creative" onClick={closeMenu}>Creative</Link>
          <Link to="/category/Developer & AI Platforms" onClick={closeMenu}>Developer</Link>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
        </nav>

        <div className="header-actions">
           <button className="search-btn glass-card" onClick={onOpenSearch}>
             <Search size={18} />
             <span>Search... </span>
             <kbd>Ctrl+K</kbd>
           </button>
        </div>

        {/* mobile menu button moved to the far right of the header */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </header>
  );
};
