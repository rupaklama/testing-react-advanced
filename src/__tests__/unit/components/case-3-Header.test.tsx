import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Header from '../../../components/Header'
import { FiltersContext } from '../../../context/filters'
import userEvent from '@testing-library/user-event'

describe('The Header component', () => {
  const defaultContext = {
    // The Header component is only working with this value in the Context store
    toggleShowingFilters: jest.fn(),
  }

  // helper render function
  function renderHeader(value = defaultContext) {
    return render(
      <FiltersContext.Provider value={...value as any}>
        <Header />
      </FiltersContext.Provider>,
    )
  }

  it('renders header correctly', () => {
    const { asFragment } = renderHeader()

    // snapshot
    expect(asFragment()).toMatchSnapshot()
  })

  it('toggles the filter open when the Filter button is clicked', () => {
    renderHeader()

    const filterButton = screen.getByRole('button', { name: /filter/i })
    fireEvent.click(filterButton)

    expect(defaultContext.toggleShowingFilters).toHaveBeenCalled()
  })
})
