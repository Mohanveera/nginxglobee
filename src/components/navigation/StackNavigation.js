import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import Index from "../../pages/savedAudiences/Index";
import QueryBuilder from "../../pages/queryBuilder/Index";
import Login from "../../pages/auth/Login";
import Layout from '../Layout';

function StackNavigation() {
  return (
    <Layout>
        <Routes>            
            <Route path="/" element={ <Home /> } />          
            <Route path="/audiences" element={ <Index /> } />
            <Route path="/queryBuilder" element={ <QueryBuilder /> } />
        </Routes>
    </Layout>
  );
}

export default StackNavigation;
