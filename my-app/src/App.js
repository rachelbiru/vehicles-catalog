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
      if (this.vehicleSelected.make !== '' && this.vehicleSelected.model !== '' && this.vehicleSelected.year !== '') {
        return finalFilter
      }
      else if (this.vehicleSelected.make !== '' && this.vehicleSelected.model !== '' && this.vehicleSelected.year === ''){
        return  filterWithModel
      }
      else if (this.vehicleSelected.make !== '' && this.vehicleSelected.model === '' && this.vehicleSelected.year === ''){
        return  filterWithMake
      }
      
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

        <video autoPlay muted loop id="myVideo">
          <source src="https://media.istockphoto.com/videos/driving-into-the-sunset-video-id635808578" type="video/mp4" />
        </video>
       
        <div className='content'>
           <div>
          <h1 className='title'>Catalog Vehicle</h1>
        </div>
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

          <button type="button" class="btn btn-outline-light" onClick={() => {
            const finalFilter = filterSelected();
            this.setState({ final: finalFilter })
          }}>Search ...</button>
          <table class="table table-striped">
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
              {this.state.final.map((vehicle, i) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.price}</td>
                  <td><img className='images' src={vehicle.image} alt='' /></td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  }

}
export default App;























