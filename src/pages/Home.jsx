
import { NavLink } from 'react-router-dom'
import './Home.css'
export default function Home() {

  return (
    <>
      <div className="home-container">
        <section className="intro-section">
          <h1>
            Welcome to <span>AS Blogger</span>
          </h1>
          <p>Your space to write, share, and listen to stories that matter.</p>
        </section>

        <section className="section">
          <h2><i className="fa-solid fa-book-open-reader"></i> What is AS Blogger?</h2>
          <p>
            AS Blogger is a modern blogging platform built for creative minds. Whether you're a storyteller, a techie, or a poet — you can write, publish, and even let your readers <strong>listen to your blogs</strong> using our built-in audio feature.
          </p>
        </section>

        <section className="section">
          <h2><i className="fa-solid fa-lightbulb"></i> Why Choose Us?</h2>
          <ul>
            <li>
              <i className="fa-solid fa-lock"></i> <strong>Secure Platform:</strong> Your data is safe with us. We use modern security practices.
            </li>
            <li>
              <i className="fa-solid fa-volume-high"></i> <strong>Read & Listen:</strong> Users can read or listen to blogs anytime, anywhere.
            </li>
            <li>
              <i className="fa-regular fa-thumbs-up"></i> <strong>Easy to Use:</strong> Minimal design and seamless user experience.
            </li>
            <li>
              <i className="fa-solid fa-user-group"></i> <strong>Developer Friendly:</strong> Built using React.js, Node.js, MongoDB — full stack tech!
            </li>
          </ul>
        </section>

        <section className="cta-section">
          <h3>Start your blogging journey with<span> AS Blogger</span> today!</h3>
          <NavLink to="/register" className="cta-button">
            <i className="fa-solid fa-plus"></i> Get Started
          </NavLink>
        </section>
      </div>
    </>
  )
}