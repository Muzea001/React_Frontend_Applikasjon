import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";


const PersonTabell = ()=>{

return (
    <>
    
    <section>
        <h1>personTabell</h1>
    </section>
    <Outlet></Outlet>
    
    
    
    
    
    
    </>



);
};

export default PersonTabell;