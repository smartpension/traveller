import React from 'react'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { render } from '../test-utils'
import { Home } from '../Home'
import { MockedProvider } from '@apollo/client/testing'
import {
  getGraphQlMutation,
  mockGraphQlEmpty,
  mockGraphQlError,
  mockGraphQlWithRows,
  mockGraphQlFilteredWithRows,
  getGraphQlMutationError,
} from '../__mocks__/graphql-mock'
import { getGraphQlWishListMutation } from '../__mocks__/graphql-mock-wishlist'

describe('Home component', () => {
  it('shows empty table when we have empty data', async () => {
    render(
      <MockedProvider mocks={[mockGraphQlEmpty]} addTypename={false}>
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
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const SearchComponent = screen.getByRole('button')

    // do a search
    fireEvent.click(SearchComponent)

    const Spinner = screen.getByTestId('spinner')

    expect(Spinner).not.toBeNull()
  })

  it('shows table with matching row', async () => {
    render(
      <MockedProvider mocks={[mockGraphQlWithRows]} addTypename={false}>
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
      <MockedProvider mocks={[mockGraphQlFilteredWithRows]} addTypename={false}>
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
      <MockedProvider mocks={[mockGraphQlError]} addTypename={false}>
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

  it('updates visited for city when clicked', async () => {
    const wasMutationCalled = jest.fn()

    render(
      <MockedProvider mocks={[mockGraphQlWithRows, getGraphQlMutation(wasMutationCalled)]} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const SearchComponent = screen.getByRole('button')

    // do a search
    fireEvent.click(SearchComponent)

    // wait for render
    const checkBoxes = await waitFor(() => screen.getAllByRole('checkbox'))

    // get 2nd visited checkbox
    const secondVisitor = checkBoxes[2]
    fireEvent.click(secondVisitor)

    // wait for it to call mutation
    await waitFor(() => screen.getAllByRole('checkbox'))

    expect(wasMutationCalled).toHaveBeenCalled()
  })

  it('updates wishlist for city when clicked', async () => {
    const wasMutationCalled = jest.fn()

    render(
      <MockedProvider mocks={[mockGraphQlWithRows, getGraphQlWishListMutation(wasMutationCalled)]} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    const SearchComponent = screen.getByRole('button')

    // do a search
    fireEvent.click(SearchComponent)

    // wait for render
    const checkBoxes = await waitFor(() => screen.getAllByRole('checkbox'))

    // get 2nd visited checkbox
    const secondVisitor = checkBoxes[1]
    fireEvent.click(secondVisitor)

    // wait for it to call mutation
    await waitFor(() => screen.getAllByRole('checkbox'))

    expect(wasMutationCalled).toHaveBeenCalled()
  })
})
