import React, { useState, useEffect } from 'react'
import FilterVehicles from '../FilterVehicles/FilterVehicles';
import axios from 'axios';
import './getVehicles.css'


/**
* @author
* @function GetVehicles
**/

const GetVehicles = ({token}) => {
    const [vehicles, setVehicles] = useState([]);

    const authAxios = axios.create({
        baseURL: "/vehicles",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })


    useEffect(() => {
        getVehicles();
    })

    const getVehicles = () => {
        authAxios.get(`/`)
            .then(res => {
                console.log(res.data)
                setVehicles(res.data.vehicles)
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <FilterVehicles vehicles={vehicles} />
        </div>
    )

}

export default GetVehicles