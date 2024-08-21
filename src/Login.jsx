import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState({});
  const navigate = useNavigate();

  function handleUsernameChange(value) {
    setUsername(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  async function login(e) {
    e.preventDefault();

    try {
      console.log('logging in');
      const response = await fetch(
        'https://stalloyde-file-uploader-api.adaptable.app/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
          mode: 'cors',
        },
      );
      const responseData = await response.json();
      if (responseData.usernameError || responseData.passwordError) {
        setLoginError(responseData);
      } else {
        console.log(responseData);
        setLoginError({});
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form action='post' onSubmit={login}>
        {loginError.usernameError && <div>*{loginError.usernameError}</div>}
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          required
        />
        {loginError.passwordError && <div>*{loginError.passwordError}</div>}
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          required
        />

        <button>Login</button>
        <p>
          Don't have an account?
          <Link to='/signup'>Sign Up</Link>
        </p>
      </form>
    </>
  );
}

export default Login;
