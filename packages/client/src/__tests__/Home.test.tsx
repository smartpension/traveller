import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { render } from '../test-utils'
import { Home } from '../Home'
import { MockedProvider } from '@apollo/client/testing'
import { mockGraphQlEmpty, mockGraphQlError, mockGraphQlWithRows } from '../__mocks__/graphql-mock'

describe('Home component', () => {
  it('shows empty table when we have empty data', async () => {
    render(
      <MockedProvider mocks={mockGraphQlEmpty} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const TableComponent = screen.getByRole('table')
    const RowComponents = screen.getAllByRole('row')

    expect(TableComponent).toBeInTheDocument()
    expect(RowComponents.length).toBe(1)
  })

  it('shows spinner when waiting', () => {
    render(
      <MockedProvider mocks={mockGraphQlWithRows} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const Spinner = screen.getByTestId('spinner')

    expect(Spinner).not.toBeNull()
  })

  it('shows table with matching row', async () => {
    render(
      <MockedProvider mocks={mockGraphQlWithRows} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const SearchComponent = screen.getByRole('button')

    // do a search
    fireEvent.click(SearchComponent)

    // wait for render
    await waitFor(() => screen.getByText(/.*Frankfurt.*/))
    const Rows = screen.getAllByRole('row')

    expect(Rows.length).toBe(5)
  })

  it('shows table with filter set', async () => {
    render(
      <MockedProvider mocks={mockGraphQlWithRows} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const SearchComponent = screen.getByRole('button')
    const SearchInput = screen.getByRole('textbox')

    // do a search
    fireEvent.change(SearchInput, { target: { value: 'Fra' } })
    fireEvent.click(SearchComponent)

    // wait for render
    await waitFor(() => screen.getByText(/.*Frankfurt.*/))
    const Rows = screen.getAllByRole('row')

    expect(Rows.length).toBe(4)
  })

  it('shows alert when there is an error', async () => {
    render(
      <MockedProvider mocks={mockGraphQlError} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const SearchComponent = screen.getByRole('button')

    // do a search
    fireEvent.click(SearchComponent)

    // wait for render
    await waitFor(() => screen.getByText(/.*Error.*/))
    const Alert = screen.getByRole('alert')

    expect(Alert).not.toBeNull()
  })
})
