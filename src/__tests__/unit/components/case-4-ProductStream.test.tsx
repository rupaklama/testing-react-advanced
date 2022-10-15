import React from 'react'
import { axe } from 'jest-axe'
import { screen, render } from '@testing-library/react'
import ProductStream from '../../../components/ProductStream'

const defaultProducts = [
  {
    brand: 'Marke',
    createdAt: '2020-07-02T13:59:07+02:00',
    id: 4855515,
    image: '/4855515.jpg',
    isActive: true,
    isNew: true,
    isSoldOut: false,
    name: 'People Wear Organic',
    price: 'from $22.99',
    priceUnformatted: 2299,
  },
  {
    brand: '"Marke"',
    createdAt: '2020-07-02T13:59:07+02:00',
    id: 4855516,
    image: '/4855514.jpg',
    isActive: true,
    isNew: true,
    isSoldOut: false,
    name: 'WE Fashion',
    price: 'from $22.99',
    priceUnformatted: 2299,
  },
]

describe('The <ProductStream /> component', () => {
  it('renders a list of Product tiles for each product passed to it', async () => {
    render(<ProductStream products={defaultProducts} />)

    expect(screen.getAllByTestId('ProductTile')).toHaveLength(
      defaultProducts.length,
    )
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ProductStream products={defaultProducts} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
