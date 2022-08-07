import React from 'react';
import { Badge, DataTable } from '@makes-apps/lib';

import { Blog } from '../../types';

interface Props {
  blogs: Blog[];
  viewBlog: (blog: any) => void;
}

const List = ({ blogs, viewBlog }: Props) => (
  <DataTable
    columns={[
      { header: 'type', align: 'center', width: 10, render: ({ value }) => <Badge>{value}</Badge> },
      { header: 'date', render: ({ value }) => value.toLocaleString(), width: 20 },
      { header: 'author', width: 20 },
      { header: 'title' },
    ]}
    data={blogs}
    onRowClick={viewBlog}
  />
);

export default List;
