/*
import React from 'react';
import {
  SummaryState,
  CustomSummary,
  IntegratedSummary,
  SelectionState,
  IntegratedSelection,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSummaryRow,
  TableSelection,
} from 'dx-react-grid-grommet';

import {
  generateRows,
  globalSalesValues,
} from '../../../data/dx-grid-data/generator';
*/

const CurrencyFormatter = ({ value }) => `$${value}`;

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      totalSummaryItems: [
        { columnName: 'region', type: 'count' },
        { columnName: 'amount', type: 'max' },
        { columnName: 'amount', type: 'sum' },
      ],
      currencyColumns: ['amount'],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
      selection: [],
    };

    this.changeSelection = (selection) => {
      this.setState({ selection });
    };
  }

  getTotalSummaryValues() {
    const { selection, rows, totalSummaryItems } = this.state;
    const selectionSet = new Set(selection);
    const selectedRows = rows.filter((row, rowIndex) => selectionSet.has(rowIndex));
    return totalSummaryItems.map((summary) => {
      const { columnName, type } = summary;
      return IntegratedSummary.defaultCalculator(type, selectedRows, row => row[columnName]);
    });
  }

  render() {
    const {
      rows, columns, tableColumnExtensions, currencyColumns, totalSummaryItems, selection,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider
          for={currencyColumns}
        />
        <SummaryState
          totalItems={totalSummaryItems}
        />
        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />
        <IntegratedSelection />
        <CustomSummary
          totalValues={this.getTotalSummaryValues()}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableSummaryRow />
        <TableSelection
          showSelectAll
        />
      </Grid>
    );
  }
}

render(<Demo />);
