import React, { useEffect, useState, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table"
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const KundeTabell = (props) => {





    const [show, setShow] = useState(false);
    const [husId, sethusId] = useState(0);
    const [bildeListe, setBildeListe] = useState([]);
    const [bildeUrl, setbildeUrl] = useState("");
    const [pris, setPris] = useState(0);
    const [beskrivelse, setBeskrivelse] = useState("");






    const navigate = useNavigate();

    const detailClick = (husId) => {
      navigate(`/oversikt/${husId}`);
    }


    const [data, setData] = useState([]);



    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get("http://localhost:11569/api/Hus/Tabell");
                setData(result.data);
                console.log(result.data)
                console.log(result.bildeListe);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchData();
    }, []);


}

    export default KundeTabell;
