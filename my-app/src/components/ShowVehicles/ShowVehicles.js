import React from 'react';
import '../../App.css'
/**
* @author
* @function ShowVehicles
**/

const ShowVehicles = ({finalFilter}) => {
    console.log(finalFilter)
    return (
    
            <div className='tableVehicals'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Make</th >
                            <th scope="col">Model</th >
                            <th scope="col">Year</th>
                            <th scope="col">Price</th>
                            <th scope="col">img</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalFilter.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.price}</td>
                                <td><img className='images' src={vehicle.image} alt={vehicle.model} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )

}

export default ShowVehicles