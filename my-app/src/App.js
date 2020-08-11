import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = { vehicles: [], final: [], newVehiclesFilterByModel: [], newVehiclesFilterByYear: [] }

  vehicleSelected = {
    make: '',
    model: '',
    year: ''
  }

  componentDidMount() {
    axios.get(`/vehicle`)
      .then(res => {
        this.setState({ vehicles: res.data.vehicle })
      })
      .catch(err => {
        console.log(err);
      });
  }


  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])

      .map(e => arr[e]);

    return unique;
  }


  render() {
    const uniqueCarMake = this.getUnique(this.state.vehicles, "make")
    const uniqueCarModels = this.getUnique(this.state.newVehiclesFilterByModel, "model")

    const filterSelected = () => {
      const filterWithMake = this.state.vehicles.filter(vehicle => vehicle.make === this.vehicleSelected.make)
      const filterWithModel = filterWithMake.filter(vehicle => vehicle.model === this.vehicleSelected.model)
      const finalFilter = filterWithModel.filter(vehicle => vehicle.year === Number(this.vehicleSelected.year))
      return finalFilter;
    }

    const filterByMake = (make) => {
      let tmp = [...this.state.vehicles];
      const newVehicles = tmp.filter(vehicle => { return vehicle.make === make })
      this.setState({ newVehiclesFilterByModel: newVehicles })
    }
    const filterByModel = (model) => {
      let tmp = [...this.state.vehicles];
      const newVehicles = tmp.filter(vehicle => { return vehicle.model === model })
      this.setState({ newVehiclesFilterByYear: newVehicles })
    }


    return (
      <div className="App">
        <select onChange={(e) => {
          this.vehicleSelected.make = e.target.value;
          filterByMake(e.target.value)
        }}>
          <option>Make</option>
          {uniqueCarMake.map(vehicle => (
            <option key={vehicle.id} value={vehicle.make}>{vehicle.make}</option>
          ))}
        </select>

        <select onChange={(e) => {
          this.vehicleSelected.model = e.target.value;
          filterByModel(e.target.value)
        }} >
           <option>Model</option>
          {uniqueCarModels.map(vehicle => (
            <option key={vehicle.id} >{vehicle.model}</option>
          ))}
        </select>

        <select onChange={(e) => { this.vehicleSelected.year = e.target.value }}>
        <option>Year</option>
          {this.state.newVehiclesFilterByYear.map(vehicle => (
            <option key={vehicle.id} >{vehicle.year}</option>
          ))}
        </select>


        <button onClick={() => {
          const finalFilter = filterSelected();
          this.setState({ final: finalFilter })
        }}>click here</button>

        {this.state.final.map((vehicle, i) => (
          <div key={vehicle.id}>
            <p>{vehicle.make}</p>
            <p>{vehicle.model}</p>
            <p>{vehicle.year}</p>
            <p>{vehicle.price}</p>
            <img src={vehicle.image} />
          </div>
        ))}
      </div>
    );

  }

}
export default App;























