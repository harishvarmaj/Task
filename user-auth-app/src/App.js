import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={<Register />}
          />
          <Route
            exact
            path="/login"
            element={<Login/>}
          />
          <Route
            exact
            path="/profile/:id"
            element={
              <Profile />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
