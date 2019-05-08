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
        <div>
          <h1>Update Place</h1>
          <form onSubmit={this.updatePlace}>
          <div>
            <label>Restaurant Name: </label><input type='text' value={this.state.name} onChange={this.nameChange}/>
          </div>
          <div>
            <label>Type: </label><input type='text' value={this.state.type} onChange={this.typeChange}/>
          </div>
          <div>
            <label>Address: </label><input type='text' value={this.state.address} onChange={this.addressChange}/>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
          <input type="button" onClick={this.deletePlace} value="Delete" className="btn btn-danger btn-xs" />
          </form>
        </div>
      )
  }
}