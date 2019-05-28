// Future code improvements
// integrate routes to clean up App code
// clean up components into different files?
// Add flash notifications for new add/delete/edit


import React from 'react';
//import './App.css';
import './css/styles.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from 'react-router-dom'

import AppNavbar from './components/navbar.components'
import AddEat from './components/add-eat.component'
import ListPlaces from './components/list-places.component'
import UpdatePlaces from './components/edit.component'
import MapLink from './components/map-link.components'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <AppNavbar />
          <br/>
          {/* <PlacesAdd />  */}
          <Route path="/" exact component={ListPlaces} /> 
          <Route path="/addEat" component={AddEat} />
          <Route path="/update/:id" component={UpdatePlaces} />
          <Route path="/link" component={MapLink} />
        </div>
      </Router>
    );
  }
}

export default App;
