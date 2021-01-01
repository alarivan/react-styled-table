import React from 'react'
import styled from 'styled-components'
import {
  Table,
  ReactStyledTableCell,
  ReactStyledTableColumn,
  ReactStyledTableDataItem,
  ReactStyledTableDataItemValue
} from '@alarivan/react-styled-table'
import '../node_modules/flag-icon-css/css/flag-icon.min.css'
import countries from 'i18n-iso-countries'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

const BlueTableCell = styled(ReactStyledTableCell)`
  background: lightblue;
`

const GreenTableCell = styled(ReactStyledTableCell)`
  background: lightgreen;
`

const CustomTable = styled(Table)`
  background: magenta;
`

const Page = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
`

const Section = styled.section`
  margin: 0 auto 1rem;
`

const data_1 = [
  {
    name: 'John',
    age: 29,
    movie_rating: 4,
    city: 'Vancouver',
    region: 'British Columbia',
    country: 'Canada'
  },
  {
    name: 'Sarah',
    age: 32,
    movie_rating: 5,
    city: 'Frankfurt',
    region: 'Hesse',
    country: 'Germany'
  },
  {
    name: 'Dave',
    age: 44,
    movie_rating: 4,
    city: 'San Diego',
    region: 'California',
    country: 'United States'
  }
]

const data_1_columns = [
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
    label: 'Age',
    value: 'age',
    sortable: true
  },
  {
    label: 'City',
    value: 'city'
  },
  {
    label: 'State / Province',
    value: 'region'
  },
  {
    label: 'Country',
    value: 'country',
    render: (value: ReactStyledTableDataItemValue) => {
      let code
      if (value === 'United States') {
        code = 'us'
      } else {
        code = countries.getAlpha2Code(value as string, 'en')
      }

      if (code) {
        return (
          <span className={`flag-icon flag-icon-${code.toLowerCase()}`}></span>
        )
      }
      return value
    }
  }
]

const data_2 = [
  {
    item: 'apple',
    inventory: 12,
    size: 'medium'
  },
  {
    item: 'blueberry',
    inventory: 103,
    size: 'small'
  },
  {
    item: 'grapefruit',
    inventory: 4,
    size: 'large'
  },
  {
    item: 'strawberry',
    inventory: 14,
    size: 'small'
  }
]

const data_2_columns = [
  {
    label: 'Food Product',
    tableCellComponent: BlueTableCell,
    value: 'item'
  },
  {
    label: 'Size',
    value: 'size'
  },
  {
    label: 'Inventory',
    value: 'inventory',
    render: (value: ReactStyledTableDataItemValue) => (
      <span style={{ color: '#6fdb6f' }}>{value}</span>
    )
  }
]

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
]

const App = () => {
  return (
    <Page>
      <h1>React Styled Table Component</h1>
      <Section>
        <h2>Table with render functions:</h2>
        <Table data={data_1} columns={data_1_columns} />
      </Section>
      <Section>
        <h2>Table with custom table cell component in columns config:</h2>
        <Table data={data_2} columns={data_2_columns} />
      </Section>
      <Section>
        <h2>
          Table with custom table cell components in Table as prop and in
          columns config:
        </h2>
        <CustomTable data={data} columns={columns} tableCell={GreenTableCell} />
      </Section>
    </Page>
  )
}

export default App
