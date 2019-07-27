import React from 'react';
import {
  styled,
  styles,
  Button,
  ButtonGroup,
  DataTable,
  Form,
  FormControl,
  FormDatePicker,
  FormGroup,
  FormInput,
  FormLabel,
} from '@makes-apps/lib';

import { Season } from '../../types';

interface Props {
  seasons: { [key: string]: Season };
  deleteSeason: (seasonId: any) => Promise<any>;
  saveSeason: (season: Season) => Promise<any>;
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
  year: string;
  start_date: Date;
  end_date: Date;
  recent_week: string;
  commissioner: any;
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

const initialForm = (seasons: { [key: string]: Season }, id: any): FormData => {
  if (id === 'new') {
    return {
      _id: '',
      year: '',
      start_date: new Date(),
      end_date: new Date(),
      recent_week: '',
      commissioner: '',
    };
  }
  const { _id, year, start_date, end_date, recent_week, commissioner } = seasons[id.toHexString()];
  return {
    _id,
    year: numberToString(year),
    start_date,
    end_date,
    recent_week: numberToString(recent_week),
    commissioner,
  };
};

const formToSeason = (data: FormData): Season => ({
  _id: data._id,
  year: tryParseInt(data.year),
  start_date: data.start_date,
  end_date: data.end_date,
  recent_week: tryParseInt(data.recent_week),
  commissioner: data.commissioner,
  managers: [],
  settings: {
    scoring: { type: '', fraction_points: false, negative_points: false },
    draft: { type: '', auction: false, pick_time: 0 },
    waivers: { type: '', rule: '', time: 0, faab: false },
    trade: { deadline: new Date(), ratify_type: '', reject_time: 0, draft_picks: false },
    players: { pool: '', cant_cut_list: '', post_draft: '' },
    playoffs: { start_week: 0, size: 0, consolation_size: 0, reseed: false, lock_eliminated_teams: false },
  },
  scoring: [],
  rosters: [],
  divisions: [],
  schedule: [],
  playoffs: [],
  yahoo_data: {
    key: '',
    id: '',
    url: '',
  },
});

export default ({ deleteSeason, seasons, saveSeason }: Props) => {
  const [id, setId] = React.useState();
  return (
    <Layout>
      <Panel>
        <DataTable
          columns={[
            { header: 'id', accessor: ({ _id }) => _id.toHexString() },
            { header: 'year' },
            { header: 'recent week', accessor: 'recent_week' },
            { header: 'start date', accessor: ({ start_date }) => start_date.toLocaleString() },
            { header: 'end date', accessor: ({ end_date }) => end_date.toLocaleString() },
            { header: 'commissioner', accessor: ({ commissioner }) => commissioner.toHexString() },
          ]}
          data={Object.values(seasons).filter(m => !!m)}
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
            {id && id !== 'new' && seasons[id.toHexString()] && (
              <Button
                as="button"
                variant="text"
                color="danger"
                onClick={() => deleteSeason(id).then(() => setId(undefined))}
              >
                delete
              </Button>
            )}
          </ButtonGroup>
        </PanelHeader>
        {id && (
          <Form
            key={id}
            initialForm={initialForm(seasons, id)}
            onSubmit={({ data }) =>
              saveSeason(formToSeason(data)).then(res => {
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
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>year</FormLabel>
                    <FormInput value={data.year} onChange={e => setFormField('year', e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>recent week</FormLabel>
                    <FormInput value={data.recent_week} onChange={e => setFormField('recent_week', e.target.value)} />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>start date</FormLabel>
                    <FormDatePicker value={data.start_date} onChange={e => setFormField('start_date', e[0])} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>end date</FormLabel>
                    <FormDatePicker value={data.end_date} onChange={e => setFormField('end_date', e[0])} />
                  </FormControl>
                </FormGroup>
                <FormControl>
                  <FormLabel>commissioner</FormLabel>
                  <FormInput value={data.commissioner} onChange={e => setFormField('commissioner', e.target.value)} />
                </FormControl>
              </>
            )}
          </Form>
        )}
      </Panel>
    </Layout>
  );
};
