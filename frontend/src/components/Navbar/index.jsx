import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar__inner container--wide">
        <Link to="/" className="navbar__logo" id="navbar-logo">
          <span className="navbar__logo-icon">⚡</span>
          <span className="navbar__logo-text">
            Snap<span className="navbar__logo-accent">URL</span>
          </span>
        </Link>

        <div className="navbar__links">
          <Link
            to="/"
            className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
            id="nav-home"
          >
            Trang chủ
          </Link>
        </div>
      </div>
    </nav>
  );
}
