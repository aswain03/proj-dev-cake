import React, { useEffect, useState, useContext } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { Redirect } from 'react-router';
import { loginUser } from '../utils/api';
import ILoginQuery from '../interfaces/loginQuery.interface';

const LoginPage: React.FC<IPage> = (props) => {
  const { user, setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log('usernameInput:', usernameInput);
  console.log('passwordInput:', passwordInput);

  useEffect(() => {
    setIsError(false);
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    setIsError(false);
    e.preventDefault();
    const userInfo: ILoginQuery = { username: usernameInput, password: passwordInput };
    loginUser(userInfo)
      .then((user) => {
        if (user) {
          setUser(user);
          localStorage.setItem('devCakeUser', JSON.stringify(user));
          setSubmitted(true);
        }
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  if (submitted || user.username) {
    return <Redirect push to={{ pathname: '/' }} />;
  }

  return (
    <div>
      <h1> DevCake</h1>
      <h2>Witty Slogan.</h2>
      {user.username ? <h3> {`Hello ${user.username}`} </h3> : <h3>"Hello guest" </h3>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        ></input>
        <br /> <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        ></input>
        <br /> <br />
        <button type="submit">Sign In</button>
        {isError ? <p>Incorrect Username or Password</p> : null}
      </form>
      <p>
        Don't have an account? <Link to="/sign-up"> Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
