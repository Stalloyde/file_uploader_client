import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignUpError] = useState({});
  const navigate = useNavigate();

  function handleUsernameChange(value) {
    setUsername(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  function handleConfirmPasswordChange(value) {
    setConfirmPassword(value);
  }

  async function signup(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://file-uploader-api.adaptable.app/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({ username, password, confirmPassword }),
          mode: 'cors',
        },
      );

      const responseData = await response.json();
      if (
        responseData.usernameError ||
        responseData.passwordError ||
        responseData.confirmPasswordError
      ) {
        setSignUpError(responseData);
        setPassword('');
        setConfirmPassword('');
      } else {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setSignUpError({});
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form action='post' onSubmit={signup}>
        {signupError.usernameError && <div>*{signupError.usernameError}</div>}
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          required
        />
        {signupError.passwordError && <div>*{signupError.passwordError}</div>}
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          required
        />
        {signupError.confirmPasswordError && (
          <div>*{signupError.confirmPasswordError}</div>
        )}
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='password'
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
