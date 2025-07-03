import './style.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://www.instagram.com/magic_photos_and_art?igsh=NWJrMG84ZmEwNjBy" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/aishwarya-s-239872215/" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/AishwaryaSavale" className="social-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
      </div>

      <h1 className="copyright">
        © {new Date().getFullYear()} Aishwarya Savale. All Rights Reserved.
      </h1>
    </footer>
  );
}
