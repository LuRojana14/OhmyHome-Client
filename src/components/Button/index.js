import React from 'react'
import './index.css'

export function Button ({ children, color = 'yellow', ...restOfProps }) {
  return (
    <button className={'button'} {...restOfProps} style={{ background: color }}>
      {children}
    </button>
  )
}
