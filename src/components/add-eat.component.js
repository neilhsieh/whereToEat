// future updates: star rating system

import React, { Component } from 'react';

export default class AddEat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      address: ''
    }
    
    this.nameChange = this.nameChange.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.addressChange = this.addressChange.bind(this)
    this.addPlace = this.addPlace.bind(this)
    
  }

  nameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  typeChange = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  addressChange = (e) => {
    this.setState({
      address: e.target.value
    })
  }

  addPlace = (event) => {
    event.preventDefault()
    // add to database

    this.setState({
      name: "",
      type: "",
      address: ""
    })
  }

  render() {
    return(
      <div>
        <h1>Add New Place to Eat</h1>
        <form onSubmit={this.addPlace}>
        <div>
          <label>Restaurant Name: <input type='text' value={this.state.name} onChange={this.nameChange}/></label>
        </div>
        <div>
          <label>Type: <input type='text' value={this.state.type} onChange={this.typeChange}/></label>
        </div>
        <div>
          <label>Address: <input type='text' value={this.state.address} onChange={this.addressChange}/></label>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}

