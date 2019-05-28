// future updates: star rating system

import React, { Component } from 'react';
import axios from 'axios';

export default class AddEat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      address: '',
      link: ''
    }
    
    this.nameChange = this.nameChange.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.addressChange = this.addressChange.bind(this)
    this.linkChange = this.linkChange.bind(this)
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
  linkChange = (e) => {
    this.setState({
      link: e.target.value
    })
  }
  // onSubmition function
  addPlace = (event) => {
    event.preventDefault()
    
    console.log(`Form Submitted`)
    console.log(`Name: ${this.state.name}`)
    console.log(`Type: ${this.state.type}`)
    console.log(`Address: ${this.state.address}`)

    const newPlace = {
      name: this.state.name,
      type: this.state.type,
      address: this.state.address,
      link: this.state.link
    }

    axios.post('/addEat', newPlace)
      .then(res => console.log(res.data))

    this.setState({
      name: "",
      type: "",
      address: "",
      link: ""
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div className="input-container">
        <div className="form-title">
          <h1>Add New Place</h1>
        </div>
        <form className="input-form" onSubmit={this.addPlace}>
          <div className="form-rest">
            <label>Restaurant Name: </label>
            <input type='text' value={this.state.name} onChange={this.nameChange}/>
          </div>
          <div className="type-text"> 
            <label>Type: </label>
            <input type='text' value={this.state.type} onChange={this.typeChange}/>
          </div>
          <div className="add-text">
            <label>Address: </label>
            <input type='text' value={this.state.address} onChange={this.addressChange}/>
          </div>
          <div className="link-text">
            <label>Link: </label>
            <input type='text' value={this.state.link} onChange={this.linkChange}/>
          </div>
          <div className="form-button">
            <input type="submit" value="Submit" className="button" />
          </div>      
        </form>
      </div>
    )
  }
}

