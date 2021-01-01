import React from 'react'
import styled from 'styled-components'
import { ReactStyledTableColumn, SortOrder } from '.'

interface StyledTHProps {
  sortable?: boolean
}

const StyledTH = styled.th`
  ${({ sortable }: StyledTHProps) => sortable && 'cursor: pointer;'}
`

export interface TableHeaderCellProps
  extends Pick<ReactStyledTableColumn, 'value' | 'label' | 'sortable'> {
  sortByValue?: string
  sortOrder: SortOrder
  onClick: (value: string) => void
}

const SortToggle = ({ sort }: { sort: SortOrder }) => {
  switch (sort) {
    case 'ascend':
      return <span>&#8595;</span>
    case 'descend':
      return <span>&#8593;</span>

    default:
      return (
        <React.Fragment>
          <span>&#8593;</span> <span>&#8595;</span>
        </React.Fragment>
      )
  }
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  value,
  label,
  sortable,
  sortByValue,
  sortOrder,
  onClick
}) => {
  const handleClick = () => {
    if (sortable) onClick(value)
  }

  return (
    <StyledTH
      sortable={sortable}
      onClick={handleClick}
      role={sortable ? 'button' : undefined}
    >
      {label}
      {sortable && (
        <SortToggle sort={sortByValue === value ? sortOrder : undefined} />
      )}
    </StyledTH>
  )
}

export default TableHeaderCell
