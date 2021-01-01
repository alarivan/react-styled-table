import 'jest-styled-components'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableHeaderCell, { TableHeaderCellProps } from '../TableHeaderCell'

const renderTh = (props: TableHeaderCellProps) => {
  return render(
    <table>
      <thead>
        <tr>
          <TableHeaderCell {...props} />
        </tr>
      </thead>
    </table>
  )
}

test('should render correctly with sortable true', () => {
  const onClick = jest.fn()
  const { container } = renderTh({
    value: 'name',
    label: 'Name',
    sortable: true,
    sortByValue: 'name',
    sortOrder: undefined,
    onClick
  })

  const tableCell = screen.getByText(/Name/)
  userEvent.click(tableCell)
  expect(onClick).toHaveBeenCalledTimes(1)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly with sortable false', () => {
  const onClick = jest.fn()
  const { container } = renderTh({
    value: 'name',
    label: 'Name',
    sortable: false,
    sortByValue: 'other',
    sortOrder: undefined,
    onClick
  })

  const tableCell = screen.getByText(/Name/)
  userEvent.click(tableCell)
  expect(onClick).toHaveBeenCalledTimes(0)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly with undefined sortOrder', () => {
  renderTh({
    value: 'name',
    label: 'Name',
    sortable: true,
    sortByValue: 'name',
    sortOrder: undefined,
    onClick: jest.fn()
  })

  expect(screen.queryByText(/↑/)).toBeTruthy()
  expect(screen.queryByText(/↓/)).toBeTruthy()
})

test('should render correctly with ascending sortOrder', () => {
  renderTh({
    value: 'name',
    label: 'Name',
    sortable: true,
    sortByValue: 'name',
    sortOrder: 'ascend',
    onClick: jest.fn()
  })

  expect(screen.queryByText(/↑/)).toBeFalsy()
  expect(screen.queryByText(/↓/)).toBeTruthy()
})

test('should render correctly with descending sortOrder', () => {
  renderTh({
    value: 'name',
    label: 'Name',
    sortable: true,
    sortByValue: 'name',
    sortOrder: 'descend',
    onClick: jest.fn()
  })

  expect(screen.queryByText(/↑/)).toBeTruthy()
  expect(screen.queryByText(/↓/)).toBeFalsy()
})
