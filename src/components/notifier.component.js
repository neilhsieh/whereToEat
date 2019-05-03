import React,  { Component } from 'react'

export default class Notifier extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  render () {
    return (
      <div className="notifier-test" color="blue">
        <h2>Test Notification</h2>
      </div>
    )
  }
}