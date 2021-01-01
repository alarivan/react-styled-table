import 'jest-styled-components'
import styled from 'styled-components'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactStyledTableCell, Table } from '../Table'
import { ReactStyledTableColumn, ReactStyledTableDataItem } from '..'

const BlueTableCell = styled(ReactStyledTableCell)`
  background: lightblue;
`

const GreenTableCell = styled(ReactStyledTableCell)`
  background: green;
`

const data: ReactStyledTableDataItem[] = [
  {
    name: 'test-name-1',
    movie_rating: 4,
    city: 'Vancouver',
    country: 'Canada'
  },
  {
    name: 'test-name-2',
    movie_rating: 5,
    city: 'Frankfurt',
    country: 'Germany'
  }
]

const columns: ReactStyledTableColumn[] = [
  {
    label: 'Name',
    value: 'name',
    sortable: true
  },
  {
    label: 'Rating',
    value: 'movie_rating',
    render: (value: string | number) => {
      return `~${value}`
    }
  },
  {
    label: 'City',
    value: 'city'
  },
  {
    label: 'Country',
    value: 'country',
    tableCellComponent: BlueTableCell
  }
]

test('should render correctly with all possible data and columns variants', () => {
  const { container } = render(<Table data={data} columns={columns} />)

  screen.getByText('~5')

  expect(screen.getByText('Germany')).toHaveStyleRule('background: lightblue;')

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly with empty data', () => {
  const { container } = render(<Table data={[]} columns={columns} />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly with empty columns', () => {
  const { container } = render(<Table data={data} columns={[]} />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly with empty columns and data', () => {
  const { container } = render(<Table data={[]} columns={[]} />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly with custom table cell', () => {
  const { container } = render(
    <Table data={data} columns={columns} tableCell={GreenTableCell} />
  )

  expect(screen.getByText('Frankfurt')).toHaveStyleRule(
    'background: lightblue;'
  )
  expect(screen.getByText('Germany')).toHaveStyleRule('background: green;')
  expect(screen.getByText('test-name-1')).toHaveStyleRule('background: green;')
  expect(screen.getByText('~5')).toHaveStyleRule('background: green;')

  expect(container.firstChild).toMatchSnapshot()
})

test('should switch order', async () => {
  render(<Table data={data} columns={columns} />)

  const names = screen.queryAllByText(/test-name-[1-2]/)

  expect(names[0].textContent).toStrictEqual('test-name-1')
  expect(names[1].textContent).toStrictEqual('test-name-2')

  const sortableHeaderCell = screen.getByText(/Name/)

  userEvent.click(sortableHeaderCell)

  expect(names[0].textContent).toStrictEqual('test-name-1')
  expect(names[1].textContent).toStrictEqual('test-name-2')

  userEvent.click(sortableHeaderCell)

  expect(names[0].textContent).toStrictEqual('test-name-2')
  expect(names[1].textContent).toStrictEqual('test-name-1')
})
