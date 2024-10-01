import React from 'react';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/logo'; 
import { useAuth } from '../context/AuthContext';
import { LoginNavigationLink, LogoutNavigationLink } from './shared/navigationLink';

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar sx={{ position: "static", bgcolor: "transparent", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 1rem" }}>
        <Logo />
        <div className="flex items-center">
          {auth.isLoggedIn ? (
            <LogoutNavigationLink />
          ) : (
            <LoginNavigationLink />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
