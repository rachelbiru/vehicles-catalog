import React, {useState, useEffect} from 'react'
import FilterVehicles from '../FilterVehicles/FilterVehicles';
import axios from 'axios';
import './getVehicles.css'


/**
* @author
* @function GetVehicles
**/

const GetVehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getVehicles();
    })

    const getVehicles = () => {
        axios.get(`/vehicles`)
            .then(res => {
                setVehicles(res.data.vehicles)
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div>
            <FilterVehicles vehicles={vehicles}/>
        </div>
    )

}

export default GetVehicles