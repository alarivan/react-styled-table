# @alarivan/react-styled-table

> React table with styled-components

[![NPM](https://img.shields.io/npm/v/@alarivan/react-styled-table.svg)](https://www.npmjs.com/package/@alarivan/react-styled-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

[![@alarivan/react-styled-table](https://nodei.co/npm/@alarivan/react-styled-table.png)](https://npmjs.org/package/@alarivan/react-styled-table)

### NPM

```bash
npm install --save @alarivan/react-styled-table
```

### Yarn

```bash
yarn add @alarivan/react-styled-table
```

## Development

```bash
yarn

yarn start
```

## Testing

```bash
yarn test

yarn test:watch
```

## Running examples

```
yarn

cd example

yarn

yarn start
```

## Usage

```tsx
import React from 'react'
import styled from 'styled-components'
import {
  Table,
  ReactStyledTableCell,
  ReactStyledTableColumn,
  ReactStyledTableDataItem,
  ReactStyledTableDataItemValue
} from '@alarivan/react-styled-table'


const BlueTableCell = styled(ReactStyledTableCell)`
  background: lightblue;
`

const GreenTableCell = styled(ReactStyledTableCell)`
  background: lightgreen;
`

const CustomTable = styled(Table)`
  background: magenta;
`

const data: ReactStyledTableDataItem[] = [
  {
    name: 'John',
    movie_rating: 4,
    city: 'Vancouver',
    country: 'Canada'
  },
  {
    name: 'Sarah',
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
    render: (value: ReactStyledTableDataItemValue) => {
      return (
        <>
          {[...Array(value)].map((_val, idx) => (
            <span style={{ color: '#ffa500' }} key={idx}>
              &#9733;
            </span>
          ))}
        </>
      )
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
]}

const App = () => {
  return (
    <>
      <Table data={data} columns={data_columns} tableCell={GreenTableCell} />
      <CustomTable data={data} columns={columns} />
    </>
  )
}
```

## API

### Props

| Name      | Type                                    | Required | Description                                                                                                                                                                                  |
| --------- | --------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data      | `Object[]`                              | true     | Data record array to be rendered                                                                                                                                                             |
| columns   | `ReactStyledTableColumn[]`              | true     | Columns config see possible config values below                                                                                                                                              |
| tableCell | `StyledComponent<'td', any, {}, never>` | false    | Custom styled table cell `<td>` component that will replace all table cells in `<tbody>`. If column config has `tableCellComponent` defined then table cell will be replaced with it instead |

## Column Props

| Name               | Type                                                                     | Required      | Description                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value              | `string`                                                                 | true          | Key in the data record                                                                                                                                      |
| label              | `string`                                                                 | true          | Label that will be displayed in table header                                                                                                                |
| sortable           | `boolean`                                                                | false         | Enables data to be sorted by this column's values                                                                                                           |
| tableCellComponent | `StyledComponent<'td', any, {}, never>;`                                 | false         | Custom styled table cell `<td>` component that will replace all table cells in the column. Has higher precedence then `tableCell` prop on `Table` component |
| render             | `(value: ReactStyledTableDataItemValue) => ReactStyledTableDataItemValue | JSX.Element;` | false                                                                                                                                                       | Replaces data value with the returned value for the column. This values is rendered inside table cell `<td>` if you want to replace table cell itself then use `tableCellComponent` |

## License

MIT © [alarivan](https://github.com/alarivan)
