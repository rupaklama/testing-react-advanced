import React from 'react'
import { axe } from 'jest-axe'
import { render, screen } from '@testing-library/react'
import ProductTile from '../../../components/ProductTile'

describe('The <ProductTile /> component', () => {
  const defaultProps = {
    id: 1,
    name: 'test product name',
    image: '/image.png',
    price: 'from $12.99',
    brand: 'adidas',
    createdAt: '10-01-2022',
    isActive: true,
  }

  it('renders a product tile with name, image and price', () => {
    // type assertion to any so not to add all the additional default props
    render(<ProductTile {...(defaultProps as any)} />)

    const titleElement = screen.getByText(defaultProps.name)
    const priceElement = screen.getByText(defaultProps.price)
    const imageElement = screen.getByAltText(defaultProps.name)

    expect(titleElement).toBeInTheDocument()
    expect(priceElement).toBeInTheDocument()
    expect(imageElement).toBeInTheDocument()
  })

  it('renders a product tile with name and price only when no image', () => {
    // updating the default prop
    render(<ProductTile {...({ ...defaultProps, image: undefined } as any)} />)

    const imageElement = screen.queryByAltText(defaultProps.name)
    // expect(imageElement).not.toBeInTheDocument()

    // note - queryBy returns null if not found
    expect(imageElement).toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ProductTile {...(defaultProps as any)} />)

    const results = await axe(container)
    // console.log(results)
    expect(results).toHaveNoViolations()
  })
})
