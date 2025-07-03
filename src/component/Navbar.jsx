import { useState } from 'react';
import './style.css'

export default function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


    return(
        <>
        <header>
        <div className="title">
        <h1>AS Blogger <i class="fa-solid fa-pen-nib"></i></h1>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`links ${menuOpen ? 'active' : ''}`}>
        <a href='/' onClick={() => setMenuOpen(false)}>Home</a>
        <a href='/blog' onClick={() => setMenuOpen(false)}>Blog</a>  
        <a href='/login' onClick={() => setMenuOpen(false)}>Login</a>      
      </div>
        </header>
        </>
    )
}