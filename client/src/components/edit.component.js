import React, { Component } from 'react'
import axios from 'axios'


export default class UpdatePlaces extends Component {
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
        address: response.data.address,
        link: response.data.link
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

  linkChange = (e) => {
    this.setState({
      link: e.target.value
    })
  }

  updatePlace = event => {
    event.preventDefault()

    const updatedPlace = {
      name: this.state.name,
      type: this.state.type,
      address: this.state.address,
      link: this.state.link
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
        <div className="form-title">
          <h1>Update Place</h1>
        </div>
        <form className="input-form" onSubmit={this.addPlace}>
          <div className="rest-text">
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
            <input type="submit" value="Submit" onClick={this.updatePlace} className="button" />
            <input type="button" value="Delete" onClick={this.deletePlace} className="button button-del" />
          </div>
        </form>
      </div>
      )
  }
}