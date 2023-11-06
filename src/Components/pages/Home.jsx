import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import HusTabell from "./husTabell";


const Home = ()=>{

return (
    <>
    

    <Layout />
    <HusTabell type ="Grid"/>
    

    </>



);
};

export default Home;