import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from './utils/authcontext';
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('./Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('./Layout/title'), {
  ssr: false,
})

export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
    } else if (!isValidEmail(email)) {
      setError('Invalid email address');
    } else {
      const res = await doSignIn(email, password)
      console.log(res);

    }
  };
  async function doSignIn(email, password) {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/signin/', {
        email,
        password,
      },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
      );
      if (response.data == true) {
        console.log("cookie: " + document.cookie);
        login(email, document.cookie);
        router.push('/admindashboard/profile');
      }
      else {
        setError("Invalid user");
      }

      console.log("response: " + response)

      console.log(response.data)
      return response.data;

    } catch (error) {

      console.error('Login failed:', error);
    }
  }
  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <Title page="Login"> </Title>
      <Layout>
        <div class="flex">

          <div class="flex-auto ">
            <p class="text-4 font-bold">Login</p>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChangeEmail}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChangePassword}
                  />
                </div>
                {error && <p>{error}</p>}
                <button className="btn btn-primary" type="submit">Login</button>
              </form>
            </div>
          </div>

        </div>

      </Layout>
    </>
  );
};

