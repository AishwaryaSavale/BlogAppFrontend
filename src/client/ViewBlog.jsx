import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './ViewBlog.css'
import Cookies from 'js-cookie'; 

export default function ViewBlog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const currentUser = Cookies.get('username');

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://blog-app-backend-gilt.vercel.app/api/blog/all');
      if (res.data.status) {
        setBlogs(res.data.data.reverse());
      }
    } catch (err) {
      toast.error('Failed to load blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await axios.delete(`https://blog-app-backend-gilt.vercel.app/api/blog/delete/${id}`);
      if (res.data.status) {
        toast.success(res.data.message);
        fetchBlogs();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Error deleting blog');
    }
  };

  return (
   <>
 <div className="my-blogs-div">
  <h2>My Blogs</h2>

  {blogs.length === 0 ? (
    <p>No blogs found.</p>
  ) : (
    <div className="grid-blog">
      {blogs
        .filter(blog => blog.author === currentUser)
        .map(blog => (
          <div key={blog._id} className="my-card">
            <h3 className="my-title">{blog.title}</h3>
            <p className="my-date"><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</p>
            <div className="my-actions">
              <button className="delete-btn" onClick={() => deleteBlog(blog._id)}><i class="fa-solid fa-trash-can"></i> Delete</button>
              <button className="edit-btn" onClick={() => navigate('/dashboard/addblog', { state: { blog } })}><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            </div>
          </div>
        ))}
    </div>
  )}
</div>


   </>
  );
}
