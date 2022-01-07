import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'

describe('<App /> component', () => {
  it('renders the Header content', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const HeadingComponent = screen.getByText(/^Smart traveller$/i)
    expect(HeadingComponent).toBeInTheDocument()
  })
})
