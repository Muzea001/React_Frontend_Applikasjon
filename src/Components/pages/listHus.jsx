import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";


const ListHus = ()=>{

return (
    <>
    

    <section>
        <h1>hus Listing</h1>
    </section>
    <Outlet></Outlet>
    
    
    
    
    
    
    </>



);
};

export default ListHus;