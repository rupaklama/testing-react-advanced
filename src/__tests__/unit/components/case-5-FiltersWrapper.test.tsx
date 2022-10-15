import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'

import useFilters from '../../../hooks/useFilters'

import { FiltersContext } from '../../../context/filters'
import { FiltersWrapper } from '../../../components/FiltersWrapper'

describe('The <FiltersWrapper /> component', () => {
  it('should render all children passed to it', () => {
    render(
      <FiltersWrapper>
        <p data-testid="TestParagraph"></p>
      </FiltersWrapper>,
    )

    // screen.debug()

    expect(screen.getByTestId('TestParagraph')).toBeInTheDocument()
  })

  it('should update the filters context with correct state values', () => {
    render(
      // note - to make sure the FiltersWrapper is passing correct values to the Context store
      <FiltersWrapper>
        <FiltersContext.Consumer>
          {({ showingFilters, toggleShowingFilters }) => {
            return (
              // created button element to test
              <button onClick={toggleShowingFilters}>
                {showingFilters ? 'SHOWING FILTERS' : 'HIDE FILTERS'}
              </button>
            )
          }}
        </FiltersContext.Consumer>
      </FiltersWrapper>,
    )

    // screen.debug()

    expect(screen.getByText('HIDE FILTERS')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    // screen.debug()

    expect(screen.getByText('SHOWING FILTERS')).toBeInTheDocument()
  })

  it('should update the body style to prevent scrolling when filter is toggled', () => {
    render(
      // note - to make sure the FiltersWrapper is passing correct values to the Context store
      <FiltersWrapper>
        <FiltersContext.Consumer>
          {({ showingFilters, toggleShowingFilters }) => {
            return (
              // created button element to test
              <button onClick={toggleShowingFilters}>
                {showingFilters ? 'SHOWING FILTERS' : 'HIDE FILTERS'}
              </button>
            )
          }}
        </FiltersContext.Consumer>
      </FiltersWrapper>,
    )

    fireEvent.click(screen.getByRole('button'))

    screen.debug()

    expect(document.body.style.overflow).toBe('hidden')
  })
})
