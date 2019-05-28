import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Notifier from './notifier.component'

const Places = props => (
  <tr>
    <th>{props.placesItem.name}</th>
    <td>{props.placesItem.type}</td>
    <td>
      <Link to={{
        pathname:'/link',
        state: {
          mapLink: 'testing link'
        }
      }}>
        {props.placesItem.address}
      </Link>
    </td>
    <td> 
      <Link to={"/update/"+props.placesItem._id}>Edit</Link> 
    </td>
  </tr>
)

export default class ListPlaces extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      randPlace: [],
      successAdd: false
    }

    this.placesList = this.placesList.bind(this)
    this.pickPlace = this.pickPlace.bind(this)
    this.showRand = this.showRand.bind(this)
    this.showNotifier = this.showNotifier.bind(this)
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
      return (
        <div className="places-list random-list">
          <h4><i>You're eating at... </i></h4>
          <table className="table">
            <tbody>
              <Places placesItem={random} key={i} />
            </tbody>
          </table>
        </div>
      )
    })
  }

  pickPlace() {
    axios.get('/random/')
    .then( response => {
      this.setState({ randPlace: response.data })
    })
  }

  showSuccess(props) {
    this.setState({
      successAdd: props.success
    })
  }

  showNotifier () {
    if(this.state.successAdd === true){
      return (
        <div>
          <Notifier/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        
        {this.showNotifier()}
        
        <h1>Where to Eat?</h1>
        <div>
          <button className="button" onClick={this.pickPlace}>Pick for Me!</button>
        </div>

        {this.showRand()}

        <div className="places-list">
          <table className="table">
            <thead className="table-borderless">
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