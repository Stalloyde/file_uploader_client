import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleUsernameChange(value) {
    setUsername(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  function handleConfirmPasswordChange(value) {
    setConfirmPassword(value);
  }

  function signup(e) {
    e.preventDefault();
    console.log(username, password, confirmPassword);
  }

  return (
    <>
      <form action='post' onSubmit={signup}>
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
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='confirmPassword'
          name='confirmPassword'
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        />
        <button>Signup</button>
        <p>
          Already have an account?
          <Link to='/login'>Login</Link>
        </p>
      </form>
    </>
  );
}

export default Signup;
