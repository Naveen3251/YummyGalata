//for router setting
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';

// instead of ./scenes/homePage we use this for this only we specify in jsonconfig.json file
import HomePage from 'scenes/homePage'; 
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';

import { useMemo } from "react";
import { useSelector } from 'react-redux';
import {CssBaseline, ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
//importing our customized theme from theme.js
import { themeSettings } from "./theme"

function App() {
  // from the state folder index.js file grab mode
  const mode=useSelector((state)=>state.mode);

  //passing that mode to theme.js file
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);

  //to determine the login
  const isAuth=Boolean(useSelector(state=>state.token));

  return (
    <div className="app">
      <BrowserRouter>

        <ThemeProvider theme={ theme }>
          
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/home" element={isAuth?<HomePage />:<Navigate to="/"/>}/>
            <Route path="/profile/:userId" element={isAuth?<ProfilePage />:<Navigate to="/" />}/>
          </Routes>
        </ThemeProvider>

      </BrowserRouter>

    </div>
  );
}

export default App;
