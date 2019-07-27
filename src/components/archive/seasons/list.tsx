import React from 'react';
import { DataTable } from '@makes-apps/lib';

import { Season, Standings } from '../../../types';

interface Props {
  gotoSeasonView: (seasonId: string) => void;
  seasons: { [key: string]: Season };
  standings: { [key: string]: Standings };
}

interface DataItem extends Season {
  _standings: Standings;
}

const List = ({ gotoSeasonView, seasons, standings }: Props) => {
  const data: DataItem[] = Object.values(seasons).map(season => ({
    ...season,
    _standings: standings[season._id.toHexString()],
  }));
  console.log(standings);
  console.log(data);
  return (
    <DataTable
      columns={[
        { header: 'id', render: ({ item }) => item._id.toHexString() },
        { header: 'year' },
        { header: 'start_date', render: ({ value }) => value.toLocaleString() },
        { header: 'end_date', render: ({ value }) => value.toLocaleString() },
      ]}
      data={data}
      onRowClick={({ _id }) => gotoSeasonView(_id.toHexString())}
    />
  );
};

export default List;
