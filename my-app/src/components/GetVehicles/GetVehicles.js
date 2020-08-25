import React, { useState, useEffect } from 'react'
import FilterVehicles from '../FilterVehicles/FilterVehicles';
import axios from 'axios';
// import '../FilterVehicles/FilterVehicles.css'


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