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
import UserProtectedRoute from './Components/pages/userprotectedRoute';
import MyProfile from './Components/pages/Innlogging/myProfile';
import { AuthProvider } from './AuthContext';
import MyOrders from './Components/pages/Innlogging/myOrders';
import MyHouses from './Components/pages/Innlogging/myHouses';
import Kvittering from './Components/pages/Ordre/Kvittering';
import EndreOrdre from './Components/pages/Ordre/endreOrdre';
import EndreHus from './Components/pages/Hus/endreHus';
import ProtectedRoute from './Components/pages/protectedRoute';
import { logout } from './AuthService';
import './App.css'





const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className='full-height-container'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="Innlogging/Register" element={<Register />} />
            <Route path="Innlogging/LoggInn" element={<LoggInn />} />
            
            <Route index element={<HusTabell type="Grid" />} />
            <Route path="oversikt/:husId" element={<Oversikt />} />

            {/* User Protected Routes */}
            <Route element={<UserProtectedRoute />}>
              <Route path="/Innlogging/MyOrders" element={<MyOrders />} />
              <Route path="/Innlogging/MyHouses" element={<MyHouses />} />
              <Route path="/Innlogging/MyProfile" element={<MyProfile />} />
              <Route path="/lagOrdre/:husId/:pris" element={<LagOrdre />} />
              <Route path="/Kvittering/:ordreId" element={<Kvittering />} />
              <Route path="/listHus" element={<ListHus />} />
            </Route>

            {user && user.role === 'Admin' && (
            <Route element={<ProtectedRoute />}>
              <Route path="/husTabell" element={<HusTabell type="Tabell" />} />
              <Route path="/endreHus" element={<EndreHus />} />
              <Route path="/kundeTabell" element={<KundeTabell />} />
              <Route path="/personTabell" element={<PersonTabell />} />
              <Route path="/ordreTabell" element={<OrdreTabell />} />
              <Route path="/eierTabell" element={<EierTabell />} />
              <Route path="/listHus" element={<ListHus />} />
              <Route path="/lagOrdre/:husId/:pris" element={<LagOrdre />} />
              <Route path="/Kvittering/:ordreId" element={<Kvittering />} />
            </Route>
            )}
            {/* Other Routes */}
            <Route path="/kunde/slettKunde/:husId" element={<slettKunde />} />
            <Route path="/endreOrdre" element={<EndreOrdre />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppWrapper;
