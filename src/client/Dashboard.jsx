import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const location = useLocation();
  const isDashboardRoute = location.pathname === '/dashboard'

  useEffect(() => {
    const token = Cookies.get('loginToken');
    const name = Cookies.get('username');

    if (!token) {
      navigate('/login');
    } else {
      setUsername(name);
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('loginToken');
    Cookies.remove('username');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="dashboard">
      <button className="hamburger" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="name">
          <p>Welcome</p>
          <h1>{username || 'User'}</h1>
        </div>

        <nav className="action-field">
          <NavLink to="addblog" className="value" onClick={() => setIsSidebarOpen(false)}>
            <i className="fa-solid fa-plus"></i> Add Blog</NavLink>
          <NavLink to="viewblog" className="value" onClick={() => setIsSidebarOpen(false)}>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>  View Blogs</NavLink>
          <NavLink to="/dashboard" className="value">
            <i className="fa-solid fa-house"></i> Dashboard</NavLink>
        </nav>

        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>Logout <i class="fa-solid fa-right-from-bracket"></i></button>
        </div>
      </aside>

      <main className="main">
        <Outlet />
        {isDashboardRoute && (
          <>
            <img src="/Blog.png" style={{ width: '100%', height: '94vh' }} />
          </>
        )}
      </main>
    </div>
  );
}
