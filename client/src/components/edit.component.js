import React, { Component } from 'react'
import axios from 'axios'


export default class UpdatePlaces extends Component {
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
    this.updatePlace = this.updatePlace.bind(this)
    this.deletePlace = this.deletePlace.bind(this)

  }
  componentDidMount() {
    axios.get('/'+ this.props.match.params.id)
    .then(response => {
      console.log("updating information")
      this.setState({ 
        name: response.data.name,
        type: response.data.type,
        address: response.data.address
      })
    })
    .catch(error => {
      console.log(error)
    })
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

  updatePlace = event => {
    event.preventDefault()

    const updatedPlace = {
      name: this.state.name,
      type: this.state.type,
      address: this.state.address
    }

    axios.post('/update/'+this.props.match.params.id, updatedPlace)
      .then(res => console.log(res.data))

    this.props.history.push('/')
  }

  deletePlace = e => {
    axios.delete('/delete/'+this.props.match.params.id)
    .then(res => console.log("Deleted"))
    .catch(err => console.log(err))

    this.props.history.push('/')
  }

  render() {
      return(
        <div className="input-container">
        <div className="text-container">
          <h1>Update Place</h1>
        </div>
        <form className="input-form" onSubmit={this.addPlace}>
          <div className="rest-text">
            <label>Restaurant Name: </label>
          </div>
          <div className="rest-input">
            <input type='text' value={this.state.name} onChange={this.nameChange}/>
          </div>
          <div className="type-text"> 
            <label>Type: </label>
          </div>
          <div className="type-input">
            <input type='text' value={this.state.type} onChange={this.typeChange}/>
          </div>
          <div className="add-text">
            <label>Address: </label>
          </div>
          <div className="add-input">
            <input type='text' value={this.state.address} onChange={this.addressChange}/>
          </div >
          <input type="submit" value="Submit" onClick={this.updatePlace} className="button" />
          <input type="button" value="Delete" onClick={this.deletePlace} className="button button-del" />
        </form>
      </div>
      )
  }
}