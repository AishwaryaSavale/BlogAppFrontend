import { useState } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Register from './pages/Register';
import Dashboard from './client/Dashboard';
import AddBlog from './client/AddBlog';
import ViewBlog from './client/ViewBlog';

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      <Toaster />

      {!isDashboardRoute && (
        <>
          <Navbar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="addblog" element={<AddBlog />} />
          <Route path="viewblog" element={<ViewBlog />} />
        </Route>
      </Routes>

      {!isDashboardRoute && (
        <>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
