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
  FormToggle,
} from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { Matchup } from '../../types';

interface Props {
  matchups: { [key: string]: Matchup };
  deleteMatchup: (matchupId: any) => Promise<any>;
  saveMatchup: (matchup: Matchup) => Promise<any>;
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
  season_id: string;
  week: string;
  index: string;
  start_date: Date;
  end_date: Date;
  playoffs: boolean;
  consolation: boolean;
  away_team_manager_id: string;
  away_team_key: string;
  away_team_name: string;
  away_team_wins: string;
  away_team_losses: string;
  away_team_ties: string;
  away_team_initial_win_probability: string;
  away_team_initial_projected_score: string;
  away_team_final_score: string;
  away_team_active_players: object[];
  away_team_bench_players: object[];
  home_team_manager_id: string;
  home_team_key: string;
  home_team_name: string;
  home_team_wins: string;
  home_team_losses: string;
  home_team_ties: string;
  home_team_initial_win_probability: string;
  home_team_initial_projected_score: string;
  home_team_final_score: string;
  home_team_active_players: object[];
  home_team_bench_players: object[];
  recap_url: string;
  recap_title: string;
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

const tryParseFloat = (value: string) => {
  if (!value) {
    return 0;
  }
  try {
    return parseFloat(value);
  } catch (e) {
    return 0;
  }
};

const initialForm = (matchups: { [key: string]: Matchup }, id: any): FormData => {
  if (id !== 'new') {
    const {
      _id,
      season_id,
      week,
      index,
      start_date,
      end_date,
      playoffs,
      consolation,
      away_team,
      home_team,
      recap,
    } = matchups[id.toHexString()];
    return {
      _id,
      season_id: season_id ? season_id.toHexString() : '',
      week: numberToString(week),
      index: numberToString(index),
      start_date,
      end_date,
      playoffs,
      consolation,
      away_team_manager_id: away_team.manager_id ? away_team.manager_id.toHexString() : '',
      away_team_key: away_team.team_key,
      away_team_name: away_team.name,
      away_team_wins: numberToString(away_team.wins),
      away_team_losses: numberToString(away_team.losses),
      away_team_ties: numberToString(away_team.ties),
      away_team_initial_win_probability: numberToString(away_team.initial_win_probability),
      away_team_initial_projected_score: numberToString(away_team.initial_projected_score),
      away_team_final_score: numberToString(away_team.final_score),
      away_team_active_players: [],
      away_team_bench_players: [],
      home_team_manager_id: home_team.manager_id ? home_team.manager_id.toHexString() : '',
      home_team_key: home_team.team_key,
      home_team_name: home_team.name,
      home_team_wins: numberToString(home_team.wins),
      home_team_losses: numberToString(home_team.losses),
      home_team_ties: numberToString(home_team.ties),
      home_team_initial_win_probability: numberToString(home_team.initial_win_probability),
      home_team_initial_projected_score: numberToString(home_team.initial_projected_score),
      home_team_final_score: numberToString(home_team.final_score),
      home_team_active_players: [],
      home_team_bench_players: [],
      recap_url: (recap && recap.url) || '',
      recap_title: (recap && recap.title) || '',
    };
  }
  return {
    _id: '',
    season_id: '',
    week: '',
    index: '',
    start_date: new Date(),
    end_date: new Date(),
    playoffs: false,
    consolation: false,
    away_team_manager_id: '',
    away_team_key: '',
    away_team_name: '',
    away_team_wins: '',
    away_team_losses: '',
    away_team_ties: '',
    away_team_initial_win_probability: '',
    away_team_initial_projected_score: '',
    away_team_final_score: '',
    away_team_active_players: [],
    away_team_bench_players: [],
    home_team_manager_id: '',
    home_team_key: '',
    home_team_name: '',
    home_team_wins: '',
    home_team_losses: '',
    home_team_ties: '',
    home_team_initial_win_probability: '',
    home_team_initial_projected_score: '',
    home_team_final_score: '',
    home_team_active_players: [],
    home_team_bench_players: [],
    recap_url: '',
    recap_title: '',
  };
};

const formToMatchup = (data: FormData): Matchup => {
  const away_final_score = tryParseFloat(data.away_team_final_score);
  const home_final_score = tryParseFloat(data.home_team_final_score);
  return {
    _id: data._id,
    season_id: new BSON.ObjectId(data.season_id),
    week: tryParseInt(data.week),
    index: tryParseInt(data.index),
    start_date: data.start_date,
    end_date: data.end_date,
    playoffs: data.playoffs,
    consolation: data.consolation,
    home_team_wins: home_final_score > away_final_score,
    tied: home_final_score === away_final_score,
    away_team: {
      manager_id: new BSON.ObjectId(data.away_team_manager_id),
      team_key: data.away_team_key,
      name: data.away_team_name,
      wins: tryParseInt(data.away_team_wins),
      losses: tryParseInt(data.away_team_losses),
      ties: tryParseInt(data.away_team_ties),
      initial_win_probability: tryParseFloat(data.away_team_initial_win_probability),
      initial_projected_score: tryParseFloat(data.away_team_initial_projected_score),
      final_score: away_final_score,
      active_players: [],
      bench_players: [],
    },
    home_team: {
      manager_id: new BSON.ObjectId(data.home_team_manager_id),
      team_key: data.home_team_key,
      name: data.home_team_name,
      wins: tryParseInt(data.home_team_wins),
      losses: tryParseInt(data.home_team_losses),
      ties: tryParseInt(data.home_team_ties),
      initial_win_probability: tryParseFloat(data.home_team_initial_win_probability),
      initial_projected_score: tryParseFloat(data.home_team_initial_projected_score),
      final_score: home_final_score,
      active_players: [],
      bench_players: [],
    },
    recap: {
      url: data.recap_url,
      title: data.recap_title,
    },
  };
};

export default ({ deleteMatchup, matchups, saveMatchup }: Props) => {
  const [id, setId] = React.useState();
  return (
    <Layout>
      <Panel>
        <DataTable
          columns={[
            { header: 'id', accessor: ({ _id }) => _id.toHexString() },
            { header: 'season id', accessor: ({ season_id }) => season_id.toHexString() },
            { header: 'week' },
            { header: 'index' },
            { header: 'start date', accessor: ({ start_date }) => start_date.toLocaleString() },
            { header: 'end date', accessor: ({ end_date }) => end_date.toLocaleString() },
            { header: 'playoffs', accessor: ({ playoffs }) => JSON.stringify(playoffs) },
            { header: 'consolation', accessor: ({ consolation }) => JSON.stringify(consolation) },
            {
              header: 'away team manager id',
              accessor: ({ away_team: { manager_id } }) =>
                !manager_id || typeof manager_id === 'string' ? manager_id : manager_id.toHexString(),
            },
            { header: 'away team key', accessor: 'away_team_team_key' },
            { header: 'away team name', accessor: 'away_team_name' },
            { header: 'away team wins', accessor: ({ away_team: { wins } }) => JSON.stringify(wins) },
            { header: 'away team losses', accessor: ({ away_team: { losses } }) => JSON.stringify(losses) },
            { header: 'away team final score', accessor: 'away_team_final_score' },
            {
              header: 'home team manager id',
              accessor: ({ home_team: { manager_id } }) =>
                !manager_id || typeof manager_id === 'string' ? manager_id : manager_id.toHexString(),
            },
            { header: 'home team key', accessor: 'home_team_team_key' },
            { header: 'home team name', accessor: 'home_team_name' },
            { header: 'home team wins', accessor: ({ home_team: { wins } }) => JSON.stringify(wins) },
            { header: 'home team losses', accessor: ({ home_team: { losses } }) => JSON.stringify(losses) },
            { header: 'home team final score', accessor: 'home_team_final_score' },
            { header: 'home team victory', accessor: ({ home_team_wins }) => JSON.stringify(home_team_wins) },
            { header: 'tied', accessor: ({ tied }) => JSON.stringify(tied) },
          ]}
          data={Object.values(matchups).filter(m => {
            if (m && (!m.away_team || !m.home_team)) {
              console.log(m);
            }
            return !!m;
          })}
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
            {id && id !== 'new' && matchups[id.toHexString()] && (
              <Button
                as="button"
                variant="text"
                color="danger"
                onClick={() => deleteMatchup(id).then(() => setId(undefined))}
              >
                delete
              </Button>
            )}
          </ButtonGroup>
        </PanelHeader>
        {id && (
          <Form
            key={id}
            initialForm={initialForm(matchups, id)}
            onSubmit={({ data }) =>
              saveMatchup(formToMatchup(data)).then(res => {
                if (id === 'new') {
                  setId(res.insertedId);
                }
              })
            }
            validation={{}}
            footer={{ primary: {} }}
          >
            {({ data, setFormField }) => (
              <>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>id</FormLabel>
                    <FormInput disabled value={data._id} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>season id</FormLabel>
                    <FormInput value={data.season_id} onChange={e => setFormField('season_id', e.target.value)} />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>week</FormLabel>
                    <FormInput value={data.week} onChange={e => setFormField('week', e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>last name</FormLabel>
                    <FormInput value={data.index} onChange={e => setFormField('index', e.target.value)} />
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
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>playoffs</FormLabel>
                    <FormToggle on={data.playoffs} onToggle={() => setFormField('playoffs', !data.playoffs)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>consolation</FormLabel>
                    <FormToggle on={data.consolation} onToggle={() => setFormField('consolation', !data.playoffs)} />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away manager id</FormLabel>
                    <FormInput
                      value={data.away_team_manager_id}
                      onChange={e => setFormField('away_team_manager_id', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home manager id</FormLabel>
                    <FormInput
                      value={data.home_team_manager_id}
                      onChange={e => setFormField('home_team_manager_id', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team key</FormLabel>
                    <FormInput
                      value={data.away_team_key}
                      onChange={e => setFormField('away_team_key', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team key</FormLabel>
                    <FormInput
                      value={data.home_team_key}
                      onChange={e => setFormField('home_team_key', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team name</FormLabel>
                    <FormInput
                      value={data.away_team_name}
                      onChange={e => setFormField('away_team_name', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team name</FormLabel>
                    <FormInput
                      value={data.home_team_name}
                      onChange={e => setFormField('home_team_name', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team wins</FormLabel>
                    <FormInput
                      value={data.away_team_wins}
                      onChange={e => setFormField('away_team_wins', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team wins</FormLabel>
                    <FormInput
                      value={data.home_team_wins}
                      onChange={e => setFormField('home_team_wins', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team losses</FormLabel>
                    <FormInput
                      value={data.away_team_losses}
                      onChange={e => setFormField('away_team_losses', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team losses</FormLabel>
                    <FormInput
                      value={data.home_team_losses}
                      onChange={e => setFormField('home_team_losses', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team ties</FormLabel>
                    <FormInput
                      value={data.away_team_ties}
                      onChange={e => setFormField('away_team_ties', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team ties</FormLabel>
                    <FormInput
                      value={data.home_team_ties}
                      onChange={e => setFormField('home_team_ties', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team initial win probability</FormLabel>
                    <FormInput
                      value={data.away_team_initial_win_probability}
                      onChange={e => setFormField('away_team_initial_win_probability', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team initial win probability</FormLabel>
                    <FormInput
                      value={data.home_team_initial_win_probability}
                      onChange={e => setFormField('home_team_initial_win_probability', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team initial projected score</FormLabel>
                    <FormInput
                      value={data.away_team_initial_projected_score}
                      onChange={e => setFormField('away_team_initial_projected_score', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team initial projected score</FormLabel>
                    <FormInput
                      value={data.home_team_initial_projected_score}
                      onChange={e => setFormField('home_team_initial_projected_score', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>away team final score</FormLabel>
                    <FormInput
                      value={data.away_team_final_score}
                      onChange={e => setFormField('away_team_final_score', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>home team final score</FormLabel>
                    <FormInput
                      value={data.home_team_final_score}
                      onChange={e => setFormField('home_team_final_score', e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>recap url</FormLabel>
                    <FormInput value={data.recap_url} onChange={e => setFormField('recap_url', e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>recap title</FormLabel>
                    <FormInput value={data.recap_title} onChange={e => setFormField('recap_title', e.target.value)} />
                  </FormControl>
                </FormGroup>
              </>
            )}
          </Form>
        )}
      </Panel>
    </Layout>
  );
};
