import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { selectIsAuth, signOut } from '../../redux/slices/auth';

import styles from './Header.module.scss';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(signOut());
      window.localStorage.removeItem('token');
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MY BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="outlined">Sign in</Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
