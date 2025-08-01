import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { usePlanets } from '../hooks/usePlanets'
import { useSpacecrafts } from '../hooks/useSpacecrafts'
import Spacecrafts from './Spacecrafts'

vi.mock('../hooks/usePlanets', () => ({
  usePlanets: vi.fn(),
}))
vi.mock('../hooks/useSpacecrafts', () => ({
  useSpacecrafts: vi.fn(),
}))

vi.mock('../components/Spinner', () => ({
  default: () => <div data-testid="spinner" />,
}))
vi.mock('./SpacecraftCard', () => ({
  default: ({ data, homePlanetName }) => (
    <div data-testid="spacecraft-card">
      {data.name} @ {homePlanetName}
    </div>
  ),
}))

describe('Spacecrafts component', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('shows a spinner if either hook is loading', () => {
    usePlanets.mockReturnValue({ planets: [], loading: true,  error: null })
    useSpacecrafts.mockReturnValue({ spacecrafts: [], loading: false, error: null })

    render(
      <MemoryRouter>
        <Spacecrafts />
      </MemoryRouter>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('shows an error message if either hook errors', () => {
    usePlanets.mockReturnValue({ planets: [], loading: false, error: { message: 'planet fail' } })
    useSpacecrafts.mockReturnValue({ spacecrafts: [], loading: false, error: null })

    render(
      <MemoryRouter>
        <Spacecrafts />
      </MemoryRouter>
    )

    expect(screen.getByText(/Error loading data: planet fail/)).toBeInTheDocument()
  })

  it('renders a “Create Spacecraft” link and one card per spacecraft', () => {
    const mockPlanets = [{ id: 'p1', name: 'Earth' }]
    const mockCrafts = [{ id: 'c1', name: 'Voyager', currentLocation: 'p1' }]

    usePlanets.mockReturnValue({ planets: mockPlanets, loading: false, error: null })
    useSpacecrafts.mockReturnValue({ spacecrafts: mockCrafts, loading: false, error: null })

    render(
      <MemoryRouter>
        <Spacecrafts />
      </MemoryRouter>
    )

    // Check Create link
    const createLink = screen.getByRole('link', { name: /Create Spacecraft/i })
    expect(createLink).toHaveAttribute('href', '/spacecrafts/new')

    // Check cards
    const cards = screen.getAllByTestId('spacecraft-card')
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('Voyager @ Earth')
  })
})
