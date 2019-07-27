import React from 'react';
import { DataTable, Subheading } from '@makes-apps/lib';

import { Season } from '../../types';

interface Props {
  onComponentDidMount: () => any;
  seasons: { [key: string]: Season };
}

export default ({ seasons }: Props) => (
  <>
    <Subheading color="secondary">all time standings</Subheading>
    <DataTable
      columns={[
        { header: 'year' },
        { header: 'start_date', render: ({ value }) => value.toLocaleString() },
        { header: 'end_date', render: ({ value }) => value.toLocaleString() },
      ]}
      data={Object.values(seasons)}
    />
  </>
);
