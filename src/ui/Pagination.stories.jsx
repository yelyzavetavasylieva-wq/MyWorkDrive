import React, { useState } from 'react';
import Pagination from './Pagination.jsx';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    page: { control: { type: 'number', min: 1, max: 10 } },
    rows: { control: { type: 'select' }, options: [10, 25, 50, 100] },
    onPage: { action: 'page' },
    onRowsClick: { action: 'rowsClick' },
  },
  args: { rows: 10 },
};
export default meta;

function Controlled({ page: initial = 1, ...rest }) {
  const [page, setPage] = useState(initial);
  return <Pagination {...rest} page={page} onPage={setPage} />;
}

export const Default = {
  render: (args) => <Controlled {...args} />,
  args: { page: 1 },
};

export const MiddlePage = {
  render: (args) => <Controlled {...args} />,
  args: { page: 3 },
};

export const LastPage = {
  render: (args) => <Controlled {...args} />,
  args: { page: 10 },
};
