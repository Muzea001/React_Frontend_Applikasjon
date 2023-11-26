import React, { useContext , useEffect} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/layout/Layout';
import Home from './Components/pages/Home';
import HusTabell from './Components/pages/Hus/husTabell';
import KundeTabell from './Components/pages/kunde/kundeTabell';
import EierTabell from './Components/pages/Eier/eierTabell';
import PersonTabell from './Components/pages/Person/personTabell';
import OrdreTabell from './Components/pages/Ordre/ordreTabell';
import ListHus from './Components/pages/Hus/listHus';
import Oversikt from './Components/pages/Hus/oversikt';
import LagOrdre from './Components/pages/Ordre/lagOrdre';
import slettKunde from './Components/pages/kunde/slettKunde';
import Register from './Components/pages/Innlogging/Register';
import LoggInn from './Components/pages/Innlogging/LoggInn';
import MyProfile from './Components/pages/Innlogging/myProfile';
import { AuthProvider } from './AuthContext';
import MyOrders from './Components/pages/Innlogging/myOrders';
import MyHouses from './Components/pages/Innlogging/myHouses';
import Kvittering from './Components/pages/Ordre/Kvittering';
import './App.css'





const App = () => {

  


  return (
    
    <BrowserRouter>
    <AuthProvider>
    <div className='full-height-container'>
  <Routes>
    
    <Route path="/" element={<Layout />}>
    <Route path="Innlogging/Register" element={<Register />} />
    <Route path="Innlogging/myOrders" element={<MyOrders />} />
    <Route path="Innlogging/myHouses" element={<MyHouses />} />
    <Route path="Innlogging/MyProfile" element={<MyProfile />} />
    <Route path="Innlogging/LoggInn" element={<LoggInn />} />
    <Route path="Innlogging/Register" element={<Register />} />
      <Route index element={<HusTabell type="Grid" />} />
      <Route path="husTabell" element={<HusTabell type="Tabell" />} />
      <Route path="oversikt/:husId" element={<Oversikt />} />
      <Route path="lagOrdre/:husId/:pris" element={<LagOrdre />} />
      <Route path ="/Kvittering/:ordreId" element={<Kvittering/>}/>
      <Route path="/kunde/kundeTabell" element={<KundeTabell />} />
      <Route path="eierTabell" element={<EierTabell />} />
      <Route path='/kunde/slettKunde/:husId' element={<slettKunde/>} />
      <Route path="personTabell" element={<PersonTabell />} />
      <Route path="ordreTabell" element={<OrdreTabell />} />
      <Route path="listHus" element={<ListHus />} />
    </Route>
    
  </Routes>
  </div>
  </AuthProvider>
</BrowserRouter>


  );
};

export default App;
