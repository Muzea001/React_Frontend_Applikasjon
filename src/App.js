import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/layout/Layout';
import Home from './Components/pages/Home';
import HusTabell from './Components/pages/husTabell';
import KundeTabell from './Components/pages/kundeTabell';
import EierTabell from './Components/pages/eierTabell';
import PersonTabell from './Components/pages/personTabell';
import OrdreTabell from './Components/pages/ordreTabell';
import ListHus from './Components/pages/listHus';
import Oversikt from './Components/pages/oversikt';



const App = () => {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HusTabell type="Grid" />} />
      <Route path="husTabell" element={<HusTabell type="Tabell" />} />
      <Route path="oversikt/:husId" element={<Oversikt />} />
      <Route path="kundeTabell" element={<KundeTabell />} />
      <Route path="eierTabell" element={<EierTabell />} />
      <Route path="personTabell" element={<PersonTabell />} />
      <Route path="ordreTabell" element={<OrdreTabell />} />
      <Route path="listHus" element={<ListHus />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
};

export default App;
