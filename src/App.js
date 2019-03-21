import React, { Component } from 'react';
import './App.css';

class PlacesAdd extends React.Component {
  constructor(props){
    super(props)
    this.state={
      input: '',
      places: []
    }
    this.enterNewPlace=this.enterNewPlace.bind(this)
    this.addPlace=this.addPlace.bind(this)
  }
  
  enterNewPlace = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  
  addPlace = (event) => {
    event.preventDefault()
    this.setState({
      input: "",
      places: [... this.state.places, this.state.input]
    })
  }
  
  render() {
    return (
      <div>
        
        
        <form onSubmit={this.addPlace}>
          <input placeholder="Enter New Place" value={this.state.input} onChange={this.enterNewPlace}/>
          <button>Enter Place</button>
        </form>
        
        <PlacesList item={this.state.places} />
        
      </div>
    )
  }
}


function PlacesList(props) {
  return(
    <div>
      <ul>
        {props.item.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
    )
}

class FrontPage extends React.Component {

  render() {
    return (
      <div className="storeList">
          <h1>Where to Eat?</h1>
        <PlacesAdd />
      </div>
    );
  }
}

export default FrontPage;
