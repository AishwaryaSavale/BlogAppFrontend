import { useLayoutEffect, useState } from 'react';
import './Login.css'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {

  const { register, handleSubmit, formState: { errors }, setFocus, watch } = useForm()
  const [isBackgound, setBackground] = useState(false)

  const password = watch('password')
  const navigate = useNavigate()

  useLayoutEffect(() => {
    setFocus('fullname')
  }, [])

  const onRegister = async (data) => {
    console.log(data);
    setBackground(true);

    const payload = {
      fullname: data.fullname,
      username: data.username,
      password: data.password
    };

    try {
      const res = await axios.post('https://blog-app-backend-gilt.vercel.app/api/register', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = res.data;
      if (resData.status) {
        toast.success(resData.message);
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Check console for details.");
    }

    setBackground(false);
  };

  return (

    <>


      <div className="container" style={{ background: "linear-gradient(120deg,crimson,blueviolet)" }}>
        <div className="box">
          <div className="title">
            <h2>Register</h2>
          </div>
          <form onSubmit={handleSubmit(onRegister)} autoComplete='off'>
            <div className="input-field">
              <label>Fullname :</label>
              <input type="text" {...register('fullname', {
                required: "Fullname is required !!"
              })} />
            </div>
            <div className="input-field">
              <label>Username :</label>
              <input type="email" {...register('username', {
                required: "Username is required !!",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid Email Id !!"
                }
              })} />
            </div>

            <div className="input-field">
              <label>Password:</label>
              <input type="password" {...register('password', {
                required: "Password is required !!"
              })} />
            </div>

            {
              errors &&
              <p className='error' style={{ fontWeight: "bold", color: "red" }}>
                {Object.values(errors)[0]?.message}
              </p>
            }
            <button disabled={isBackgound} type="submit">Register</button>
          </form>
          <p>
            <NavLink to='/login'>Click Here</NavLink>
            to Login.
          </p>
        </div>
      </div>
    </>
  )
}