import * as React from 'react'
import * as R from 'ramda'
import styled, { StyledComponent } from 'styled-components'
import TableHeaderCell from './TableHeaderCell'
import { ReactStyledTableDataItem, ReactStyledTableColumn, SortOrder } from '.'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: ReactStyledTableDataItem[]
  columns: ReactStyledTableColumn[]
  tableCell?: StyledComponent<'td', any, {}, never>
}

export const ReactStyledTableCell = styled.td`
  min-width: 140px;
`

export const ReactStyledTableContainer = styled.div`
  max-width: 500px;
  overflow-x: auto;
`

export const Table = ({ data, columns, tableCell, className }: Props) => {
  const [sortedData, setSortedData] = React.useState<
    ReactStyledTableDataItem[]
  >(data)
  const [sortByValue, setSortByValue] = React.useState<string>()
  const [sortOrder, setSortOrder] = React.useState<SortOrder>()

  const handleSortChange = (value: string) => {
    let nextSortOrder: SortOrder
    switch (sortOrder) {
      case 'ascend':
        nextSortOrder = 'descend'
        break
      case undefined:
        nextSortOrder = 'ascend'
        break
    }

    if (!nextSortOrder) {
      setSortedData(data)
    } else if (value) {
      const sorter = R[nextSortOrder](R.prop(value))
      setSortedData(R.sortWith([sorter], sortedData))
    }

    setSortByValue(value)
    setSortOrder(nextSortOrder)
  }

  const renderTableCell = (
    item: ReactStyledTableDataItem,
    column: ReactStyledTableColumn,
    index: number
  ) => {
    return React.createElement(
      column.tableCellComponent || tableCell || ReactStyledTableCell,
      { key: index },
      column.render ? column.render(item[column.value]) : item[column.value]
    )
  }

  return (
    <ReactStyledTableContainer className={className}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.value}
                value={column.value}
                label={column.label}
                sortable={column.sortable}
                sortByValue={sortByValue}
                sortOrder={sortOrder}
                onClick={handleSortChange}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, idx) => (
            <tr key={idx}>
              {columns.map((column, idx) => renderTableCell(item, column, idx))}
            </tr>
          ))}
        </tbody>
      </table>
    </ReactStyledTableContainer>
  )
}
