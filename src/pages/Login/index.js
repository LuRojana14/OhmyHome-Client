import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Login extends Component {
  render () {
    return (
      <div>
        <Link to={'/signup'}>To signup</Link>
      </div>
    )
  }
}
