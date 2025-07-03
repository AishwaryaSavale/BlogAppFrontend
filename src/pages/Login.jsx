import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setValue, setFocus } = useForm();
  const [isBackgound, setBackground] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('loginToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onLogin = (data) => {
    setBackground(true);

    setTimeout(async () => {
      try {
        const res = await axios.post('https://blog-app-backend-gilt.vercel.app/api/login', data, {
          headers: { 'Content-Type': 'application/json' }
        });

        const resData = res.data;
        setBackground(false);

        if (resData.status) {
          Cookies.set('loginToken', resData.token, { expires: 1 / 24 });
          Cookies.set('username', resData.fullname);

          toast.success(resData.message);
          navigate('/dashboard');
        } else {
          toast.error(resData.message);
          if (resData.message === 'Wrong Username and Password !!') {
            setValue('username', "");
            setValue('password', "");
            setFocus('username');
          } else {
            setValue('password', "");
          }
        }
      } catch (error) {
        setBackground(false);
        toast.error('Login failed. Server error or invalid credentials.');
        console.error(error);
      }
    }, 1000);
  };

  return (
    <div className="container">
      <div className="box">
        <div className="title">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit(onLogin)}autoComplete='off'>
          <div className="input-field">
            <label>Username :</label>
            <input
              type="email"
              {...register('username', {
                required: "Username is required !!",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid Email Id !!"
                }
              })}
            />
          </div>
          <div className="input-field">
            <label>Password:</label>
            <input
              type="password"
              {...register('password', {
                required: "Password is required !!"
              })}
            />
          </div>
          {
            errors &&
            <p className='error' style={{ fontWeight: "bold", color: "red" }}>
              {Object.values(errors)[0]?.message}
            </p>
          }
          <button disabled={isBackgound} type="submit">Login</button>
        </form>
        <p>
          <NavLink to='/register'>Click Here</NavLink>
          to create a new account ?
        </p>
      </div>
    </div>
  );
}
