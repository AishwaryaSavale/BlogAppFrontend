import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [utterance, setUtterance] = useState(null);

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


  const handleSpeak = (text) => {
    speechSynthesis.cancel();
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = 'hi-IN'; 
    newUtterance.rate = 1;
    setUtterance(newUtterance);
    speechSynthesis.speak(newUtterance);
  };

  const handlePause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
    }
  };

  const handleResume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setUtterance(null);
  };
  return (
    <div className="blog-container">
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => {
            const wordCount = blog.content.trim().split(/\s+/).length;
            const isScrollable = wordCount > 20;

            return (
              <div className="blog-card" key={blog._id}>
                <h3>"{blog.title}"</h3>
                <div className="name">
                  <p><strong>Author:</strong> {blog.author}</p>
                  <p><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</p>
                </div>
                <div className={`blog-content ${isScrollable ? 'scrollable' : ''}`}>
                  {blog.content}
                </div>

                <div className="btn">
                  <button onClick={() => handleSpeak(blog.content)}><i class="fa-solid fa-volume-high"></i></button>
                  <button onClick={handlePause}><i class="fa-solid fa-pause"></i> </button>
                  <button onClick={handleResume}><i class="fa-solid fa-play"></i></button>
                  <button  onClick={handleStop}><i class="fa-solid fa-stop"></i></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}