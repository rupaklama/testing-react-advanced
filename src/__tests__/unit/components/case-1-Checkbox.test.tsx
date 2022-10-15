import React from 'react'
import ReactDOM from 'react-dom'
import userEvent from '@testing-library/user-event'

import { axe } from 'jest-axe'

import { render, screen, fireEvent } from '@testing-library/react'

import Checkbox from '../../../components/Checkbox'
import { debug } from 'console'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  const defaultCheckboxProps = {
    label: 'test_checkbox_label',
    id: 'test_checkbox_id',
    onChange: jest.fn(),
    checked: false,
  }

  it('Should render the label and checkbox the user will see', () => {
    // place to render this element
    // const container = document.createElement('div')

    // note - using ReactDOM for manual testing
    // ReactDOM.render(<Checkbox {...defaultCheckboxProps} />, container)

    // check to see if elements are present
    // expect(container.querySelector('label')).not.toBeNull()
    // expect(container.querySelector('input[type="checkbox"]')).not.toBeNull()
    // console.log(container.innerHTML)

    const { asFragment } = render(<Checkbox {...defaultCheckboxProps} />)

    // to see rendered dom elements
    // screen.debug()

    // NOTE - Returns a DocumentFragment of your rendered component.
    // This can be useful if you need to avoid live bindings and see how your component reacts to events.
    // Also, to Find all the DOM Elements on initial renders
    // console.log(asFragment()) DocumentFragment {}

    //  Snapshot Testing using 'asFragment()'
    expect(asFragment()).toMatchSnapshot()

    const inputElement = screen.getByRole('checkbox', {
      name: /test_checkbox_label/i,
    })
    expect(inputElement).toBeInTheDocument()
  })

  it('Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    render(<Checkbox {...defaultCheckboxProps} />)

    const labelElement = screen.getByLabelText(defaultCheckboxProps.label)
    expect(labelElement).toBeInTheDocument()
  })

  it('Should call the onChange handler when it is provided', () => {
    render(<Checkbox {...defaultCheckboxProps} />)

    const checkbox = screen.getByRole('checkbox', {
      name: /test_checkbox_label/i,
    })

    // NOTE - userEvent won't work here because
    // fireEvent dispatches exactly the events you tell it to and just those -
    // even if those exact events never had been dispatched in a real interaction in a browser.

    // User-event on the other hand dispatches the events like they would happen if a user interacted with the document. That might lead to the same events you previously dispatched per fireEvent directly, but it also might catch bugs that make it impossible for a user to trigger said events.
    fireEvent.click(checkbox)

    expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
  })

  it('Should change state correctly when clicked (checked and unchecked)', () => {
    // updating prop
    const updatedCheckProp = {
      ...defaultCheckboxProps,
      checked: true,
    }

    // console.log(updatedCheckProp)
    render(<Checkbox {...updatedCheckProp} />)

    const checkbox = screen.getByRole('checkbox', {
      name: /test_checkbox_label/i,
    })

    // CHECKBOX is checked now
    expect(checkbox).toBeChecked()
  })

  it('should not fail any accessibility tests', async () => {
    const { container } = render(<Checkbox {...defaultCheckboxProps} />)

    const results = await axe(container)
    // console.log(results)
    expect(results).toHaveNoViolations()
  })
})
