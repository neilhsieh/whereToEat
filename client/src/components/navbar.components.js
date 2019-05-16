import React, { Component} from 'react';
import '../css/styles.css';


export default class AppNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <nav className='nav-container'>
        <h1 className='logo'><a href='/'>Home</a></h1>
        <ul className='nav'>
          <li><a href='/addEat'>Add</a></li>
        </ul>
      </nav>
    )
  }
}