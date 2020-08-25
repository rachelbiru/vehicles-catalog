import React, { useState } from 'react'
import ShowVehicles from '../ShowVehicles/ShowVehicles';
import '../../App.css'

/**
* @author
* @function FilterVehicles
**/

const FilterVehicles = (props) => {
    const [filterVehiclesByMake, setFilterVehiclesByMake] = useState([]);
    const [filterVehiclesByModel, setFilterVehiclesByModel] = useState([]);
    const [finalFilter, setFinalFilter] = useState([]);

    const [makeSelected, setMakeSelected] = useState();
    const [modelSelected, setModelSelected] = useState();
    const [yearSelected, setYearSelected] = useState();

    const vehicles = props.vehicles;

    const filterByMake = (make) => {
        let tmp = [...vehicles];
        const newVehicles = tmp.filter(vehicle => { return vehicle.make === make })
        setFilterVehiclesByMake(newVehicles)
    }
    const filterByModel = (model) => {
        let tmp = [...vehicles];
        const newVehicles = tmp.filter(vehicle => { return vehicle.model === model })
        setFilterVehiclesByModel(newVehicles);
    }

    const getUnique = (arr, comp) => {
        const unique = arr
            //store the comparison values in array
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e])

            .map(e => arr[e]);
        // console.log(unique)

        return unique;
    }


    const uniqueCarMake = getUnique(vehicles, "make");
    const uniqueCarModels = getUnique(filterVehiclesByMake, "model")

    const filterSelected = () => {
        const finalFilter = filterVehiclesByModel.filter(vehicle => vehicle.year === Number(yearSelected))

        if (makeSelected && modelSelected && yearSelected) {
            return finalFilter
        }
        else if (makeSelected && modelSelected && !yearSelected) {
            return filterVehiclesByModel

        }
        else if (makeSelected && !modelSelected && !yearSelected){
            return filterVehiclesByMake
        }
        

    }

    const disabled = !makeSelected

    return (
        <div className="filter">
            <video autoPlay muted loop id="myVideo">
                <source src="https://media.istockphoto.com/videos/driving-into-the-sunset-video-id635808578" type="video/mp4" />
            </video>

            <div className='content'>
                <div className='divTitle'>
                    <h1 className='title'>Catalog Vehicle</h1>
                </div>

                <div className='selectVehicles'>
                    <select onChange={(e) => {
                        setMakeSelected(e.target.value);
                        filterByMake(e.target.value)
                    }}>
                        <option>Make</option>
                        {uniqueCarMake.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.make}>{vehicle.make}</option>
                        ))}
                    </select>

                    <select onChange={(e) => {
                        setModelSelected(e.target.value);
                        filterByModel(e.target.value)
                    }} >
                        <option>Model</option>
                        {uniqueCarModels.map(vehicle => (
                            <option key={vehicle.id} >{vehicle.model}</option>
                        ))}
                    </select>

                    <select onChange={(e) => {
                        setYearSelected(e.target.value);
                    }}>
                        <option>Year</option>
                        {filterVehiclesByModel.map(vehicle => (
                            <option key={vehicle.id} >{vehicle.year}</option>
                        ))}
                    </select>
                    <br /><br />
                    <button disabled={disabled} type="button" className="btn btn-outline-light" onClick={() => {
                        const final = filterSelected();
                        setFinalFilter(final);
                    }}>Search ...</button>
                    
                </div>
                <ShowVehicles finalFilter={finalFilter} />
            </div>

        </div>
    )

}

export default FilterVehicles