// Future code improvements
// integrate routes to clean up App code
// clean up components into different files?
// Add flash notifications for new add/delete/edit


import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

import AddEat from './components/add-eat.component'
import ListPlaces from './components/list-places.component'
import UpdatePlaces from './components/edit.component'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">WhereToEat</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="/addEat">Add</a>

              </div>
            </div>
          </nav>
          <br/>
          {/* <PlacesAdd />  */}
          <Route path="/" exact component={ListPlaces} /> 
          <Route path="/addEat" component={AddEat} />
          <Route path="/update/:id" component={UpdatePlaces} />
        </div>
      </Router>
    );
  }
}

export default App;
