import React, {
  TableHTMLAttributes
} from 'react';

import {
  StyledTable
} from './styles';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  id?: string;
  name?: string;
}

const Table: React.FC<TableProps> = ({ children, ...rest }) => (
  <StyledTable {...rest}>{children}</StyledTable>
);

export default Table;