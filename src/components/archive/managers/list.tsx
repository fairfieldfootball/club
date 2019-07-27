import React from 'react';
import { DataTable } from '@makes-apps/lib';

import { Manager } from '../../../types';

interface Props {
  gotoManagerView: (managerId: string) => void;
  managers: { [key: string]: Manager };
}

const List = ({ gotoManagerView, managers }: Props) => (
  <DataTable
    columns={[{ header: 'email' }, { header: 'first_name' }, { header: 'last_name' }]}
    data={Object.values(managers)}
    onRowClick={({ _id }) => gotoManagerView(_id.toHexString())}
  />
);

export default List;
