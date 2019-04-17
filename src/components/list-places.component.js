import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Places = props => (
  <tr>
    <td>{props.placesItem.name}</td>
    <td>{props.placesItem.type}</td>
    <td>{props.placesItem.address}</td>
    <td> 
      <Link to={"/update/"+props.placesItem._id}>Edit</Link> 
    </td>
    <td></td>
  </tr>
)

export default class ListPlaces extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      randPlace: []
    }

    this.placesList = this.placesList.bind(this)
    this.pickPlace = this.pickPlace.bind(this)
    this.showRand = this.showRand.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:4000/')
      .then(response => {
        this.setState({ places: response.data})
      })
      .catch(error => {
        console.log(error)
      })
  }

  placesList() {
    return this.state.places.map((currentPlace, i) => {
        return <Places placesItem={currentPlace} key={i} />
      })
  }

  showRand() {
    return this.state.randPlace.map((random, i) => {
      return <Places placesItem={random} key={i} />
    })
  }

  pickPlace() {
    axios.get('http://localhost:4000/random/')
    .then( response => {
      this.setState({ randPlace: response.data })
      console.log(response.data)
    })
  }

  render() {
    return (
      <div>
        <h1>Where to Eat?</h1>
        <div>
          <button className="btn btn-info" onClick={this.pickPlace}>Pick for Me!</button>
        </div>

        <div className="table-responsive">
          <table className="table">
            <tbody>
              {this.showRand()}
            </tbody>
          </table>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.placesList()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


// CONTINUE BY ADDING LIST COMPONENT WITH ROUTER CONNECTED TO DB