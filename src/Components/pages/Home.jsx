import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Layout from "../layout/Layout"
import HusTabell from "./Hus/husTabell";



const Home = ()=>{

return (
    <>
    

    <Layout />
    <HusTabell type ="Grid"/>
    

    </>



);
};

export default Home;