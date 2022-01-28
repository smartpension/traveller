import React from 'react'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { render } from '../test-utils'
import { MockedProvider } from '@apollo/client/testing'
import { Visited } from '../Visited'
import {
  mockGraphQlVisitedEmpty,
  mockGraphQlVisitedError,
  mockGraphQlVisitedWithRows,
} from '../__mocks__/graphql-mock-visited'

describe('Visited component', () => {
  it('shows empty table when we have empty data', async () => {
    render(
      <MockedProvider mocks={[mockGraphQlVisitedEmpty]} addTypename={false}>
        <Visited />
      </MockedProvider>
    )

    const TableComponent = await waitFor(() => screen.getByRole('table'))
    const RowComponents = screen.getAllByRole('row')

    expect(TableComponent).toBeInTheDocument()
    expect(RowComponents.length).toBe(1)
  })

  it('shows spinner when waiting', () => {
    render(
      <MockedProvider mocks={[mockGraphQlVisitedEmpty]} addTypename={false}>
        <Visited />
      </MockedProvider>
    )

    const Spinner = screen.getByTestId('spinner')

    expect(Spinner).not.toBeNull()
  })

  it('shows table with rows', async () => {
    render(
      <MockedProvider mocks={[mockGraphQlVisitedWithRows]} addTypename={false}>
        <Visited />
      </MockedProvider>
    )

    // wait for render
    await waitFor(() => screen.getByText(/.*Frankfurt.*/))
    const Rows = screen.getAllByRole('row')

    expect(Rows.length).toBe(3)
  })

  it('shows alert when there is an error', async () => {
    render(
      <MockedProvider mocks={[mockGraphQlVisitedError]} addTypename={false}>
        <Visited />
      </MockedProvider>
    )

    // wait for render
    await waitFor(() => screen.getByText(/.*Error.*/))
    const Alert = screen.getByRole('alert')

    expect(Alert).not.toBeNull()
  })
})
