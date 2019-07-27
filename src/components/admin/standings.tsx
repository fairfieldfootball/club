import React from 'react';
import {
  styled,
  styles,
  Button,
  ButtonGroup,
  DataTable,
  Form,
  FormControl,
  FormInput,
  FormLabel,
} from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { Standings } from '../../types';

interface Props {
  standings: { [key: string]: Standings };
  deleteStandings: (seasonId: any) => Promise<any>;
  saveStandings: (season: Standings) => Promise<any>;
}

const Layout = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      width: '100%',
    })
  )
);

const Panel = styled.div<{ padding?: boolean }>(
  styles(css => ({ theme, padding }) =>
    css(
      {
        flex: '1',
        overflow: 'auto',
      },
      padding && { paddingRight: theme.spacers.rems.base }
    )
  )
);

const PanelHeader = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
    })
  )
);

interface FormData {
  _id: any;
  season_id: any;
  week: string;
}

const numberToString = (value: number) => `${value}`;

const tryParseInt = (value: string) => {
  if (!value) {
    return 0;
  }
  try {
    return parseInt(value);
  } catch (e) {
    return 0;
  }
};

const initialForm = (standings: { [key: string]: Standings }, id: any): FormData => {
  if (id === 'new') {
    return {
      _id: '',
      season_id: '',
      week: '',
    };
  }
  const { _id, season_id, week } = standings[id.toHexString()];
  return {
    _id,
    season_id,
    week: numberToString(week),
  };
};

const formToStandings = (data: FormData): Standings => ({
  _id: data._id,
  season_id: new BSON.ObjectId(data.season_id),
  week: tryParseInt(data.week),
  teams: [],
});

export default ({ deleteStandings, standings, saveStandings }: Props) => {
  const [id, setId] = React.useState();
  return (
    <Layout>
      <Panel>
        <DataTable
          columns={[
            { header: 'id', accessor: ({ _id }) => _id.toHexString() },
            { header: 'season id', accessor: ({ season_id }) => season_id.toHexString() },
            { header: 'week' },
          ]}
          data={Object.values(standings).filter(m => !!m)}
          onRowClick={({ _id }) => setId(_id)}
          size="base"
          fluid
        />
      </Panel>
      <Panel padding>
        <PanelHeader>
          <ButtonGroup align="left">
            <Button as="button" variant="text" color="primary" onClick={() => setId('new')}>
              new
            </Button>
            {id && (
              <Button as="button" variant="text" color="secondary" onClick={() => setId(undefined)}>
                clear
              </Button>
            )}
          </ButtonGroup>
          <ButtonGroup>
            {id && id !== 'new' && standings[id.toHexString()] && (
              <Button
                as="button"
                variant="text"
                color="danger"
                onClick={() => deleteStandings(id).then(() => setId(undefined))}
              >
                delete
              </Button>
            )}
          </ButtonGroup>
        </PanelHeader>
        {id && (
          <Form
            key={id}
            initialForm={initialForm(standings, id)}
            onSubmit={({ data }) =>
              saveStandings(formToStandings(data)).then(res => {
                if (id === 'new') {
                  setId(res.insertedId);
                }
              })
            }
            footer={{ primary: {} }}
          >
            {({ data, setFormField }) => (
              <>
                <FormControl>
                  <FormLabel>id</FormLabel>
                  <FormInput disabled value={data._id} />
                </FormControl>
                <FormControl>
                  <FormLabel>week</FormLabel>
                  <FormInput value={data.week} onChange={e => setFormField('week', e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>season id</FormLabel>
                  <FormInput value={data.season_id} onChange={e => setFormField('season_id', e.target.value)} />
                </FormControl>
              </>
            )}
          </Form>
        )}
      </Panel>
    </Layout>
  );
};
