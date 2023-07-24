import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login";

function StackNavigation() {
  return (
        <Routes>
            <Route path="/" element={ <Login /> } />
        </Routes>
  );
}

export default StackNavigation;
