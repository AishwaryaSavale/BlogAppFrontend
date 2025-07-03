import './AddBlog.css';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function AddBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const editBlog = location.state?.blog;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editBlog) {
      setValue('title', editBlog.title);
      setValue('content', editBlog.content);
    }
  }, [editBlog, setValue]);

  const onSubmit = async (data) => {
    try {
      if (!editBlog) {
        data.author = Cookies.get('username') || 'Anonymous';
        data.date = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
      }

      if (editBlog) {
        const res = await axios.put(`https://blog-app-backend-gilt.vercel.app/api/blog/update/${editBlog._id}`, data);
        if (res.data.status) {
          toast.success(res.data.message);
          navigate('/dashboard/viewblog');
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post('https://blog-app-backend-gilt.vercel.app/api/blog/add', data);
        if (res.data.status) {
          toast.success(res.data.message);
          reset();
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      toast.error('Server error. Try again later.');
    }
  };

  return (
    <div className="add-blog-container">
      <h1>{editBlog ? 'Edit Blog' : 'Add Blog'}</h1>
      <form className="add-blog-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows="8"
            {...register('content', { required: 'Content is required' })}
          ></textarea>
          {errors.content && <p className="error">{errors.content.message}</p>}
        </div>

        <button type="submit" className="send-btn" title="Submit">
          Submit <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>

    </div>
  );
}
