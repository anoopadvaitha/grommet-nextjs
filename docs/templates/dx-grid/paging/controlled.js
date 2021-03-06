/*
import React from 'react';
import {
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from 'dx-react-grid-grommet';

import { generateRows } from '../../../data/dx-grid-data/generator';
*/

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 8 }),
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15],
    };

    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
  }

  render() {
    const {
      rows, columns, pageSize, pageSizes, currentPage,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={this.changePageSize}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    );
  }
}

render(<Demo />);
