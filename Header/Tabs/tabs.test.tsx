import Store from '../../../store/store'
import { Context, State, store } from '../../../index'
import { render as rtlRender, screen } from '@testing-library/react'
import Tabs from './Tabs'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  store.setTabs([
    { id: null, name: null, isActive: false },
    { id: 0, name: 'tab 1', isActive: true },
    { id: 1, name: 'tab 2', isActive: false },
  ])
})

function render(ui, { store = new Store(), ...options }) {
  function Wrapper(props) {
    return <Context.Provider value={{ store } as State} {...props} />
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

describe('<Tabs />', () => {
  it('should close tab after clicking close button', async () => {
    render(<Tabs createContract={null} />, { store })
    expect(screen.getByText(/tab 1/i)).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', {
        name: /close/i,
      })[0]
    ).toBeInTheDocument()
    await userEvent.click(
      screen.getAllByRole('button', {
        name: /close/i,
      })[0]
    )
    expect(screen.queryByText(/tab 1/i)).not.toBeInTheDocument()
  })

  it('should swipe active tab after clicking on inactive tab', async () => {
    render(<Tabs createContract={null} />, { store })
    expect(
      screen.getAllByRole('tab', { name: /tab 2/i, selected: false })[0]
    ).toBeInTheDocument()
    await userEvent.click(
      screen.getAllByRole('tab', { name: /tab 2/i, selected: false })[0]
    )
    expect(
      screen.getAllByRole('tab', { name: /tab 2/i, selected: true })[0]
    ).toBeInTheDocument()
  })
})
