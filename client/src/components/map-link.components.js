import React, { Component } from 'react'
import axios from 'axios'

export default class MapLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  // componentDidMount() {
  //   const { mapLink } = this.props.location.state
  // }

  render () {
    return (
      <div>
        Map Link
        <br />
         {/* {mapLink} */}
      </div>
    )
  }
}