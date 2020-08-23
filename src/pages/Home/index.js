import React from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../../contexts'

export function Home () {
  return (
    <AppContext.Consumer>
      {props => {
        return (
          <div style={{ width: '100vw', height: '100vh', background: 'violet', display: 'flex', flexDirection: 'column' }}>
            {'image here'}
            <h1>Oh my home</h1>
            {JSON.stringify(props)}

            <Link to='signup'>Create group</Link>
            <Link to='login'>login</Link>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}
