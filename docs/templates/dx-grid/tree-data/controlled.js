/*
import React from 'react';
import {
  TreeDataState,
  CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from 'dx-react-grid-grommet';

import {
  generateRows,
  defaultColumnValues,
} from '../../../data/dx-grid-data/generator';
*/

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

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
      tableColumnExtensions: [
        { columnName: 'name', width: 300 },
      ],
      expandedRowIds: [0, 1],
      data: generateRows({
        columnValues: {
          id: ({ index }) => index,
          parentId: ({ index, random }) => (index > 0 ? Math.trunc((random() * index) / 2) : null),
          ...defaultColumnValues,
        },
        length: 20,
      }),
    };

    this.changeExpandedRowIds = this.changeExpandedRowIds.bind(this);
  }

  changeExpandedRowIds(expandedRowIds) {
    this.setState({ expandedRowIds });
  }

  render() {
    const {
      data, columns, tableColumnExtensions, expandedRowIds,
    } = this.state;

    return (
      <Grid
        rows={data}
        columns={columns}
      >
        <TreeDataState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={this.changeExpandedRowIds}
        />
        <CustomTreeData
          getChildRows={getChildRows}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableTreeColumn
          for="name"
        />
      </Grid>
    );
  }
}

render(<Demo />);