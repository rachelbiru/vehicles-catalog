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
    console.log(token);


    useEffect(() => {
        getVehicles();
    })

    const getVehicles = () => {
        axios.get(`/vehicles`, {
            headers: {
                'Authorization': `${token}`
            }
        })
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