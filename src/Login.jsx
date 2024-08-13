import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(value) {
    setUsername(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  function login(e) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <>
      <form action='post' onSubmit={login}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
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
