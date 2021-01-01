import { StyledComponent } from 'styled-components'

export type ReactStyledTableDataItemValue = string | number

export type ReactStyledTableDataItem = Record<
  string,
  ReactStyledTableDataItemValue
>

export type SortOrder = 'ascend' | 'descend' | undefined

export interface ReactStyledTableColumn {
  label: string
  value: string
  sortable?: boolean
  tableCellComponent?: StyledComponent<'td', any, {}, never>
  render?: (
    value: ReactStyledTableDataItemValue
  ) => ReactStyledTableDataItemValue | JSX.Element
}

export { Table, ReactStyledTableContainer, ReactStyledTableCell } from './Table'
