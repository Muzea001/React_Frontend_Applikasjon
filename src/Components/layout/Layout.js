import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => (
  <>
    <Header />
    <div className='bg-dark full-height'> 
    <main className="centered-content" >
        <Outlet /> {}
      
    </main>
    </div>
    <Footer />
   
  </>
);

export default Layout;
