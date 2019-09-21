import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
// import { Button, Text } from '@makes-apps/lib';

import connectors from '../connectors';
import { HomePage as Page } from '../components';
import {
  draftsActions,
  managersActions,
  matchupsActions,
  seasonsActions,
  standingsActions,
  usersActions,
} from '../store';
import { Draft, Manager, Matchup, Season, Standings, User } from '../types';

interface OwnProps {
  year: string | number;
}

interface StateProps {
  activeMenuKey: string;
  drafts?: { [key: string]: Draft };
  managers?: { [key: string]: Manager };
  matchups?: { [key: string]: Matchup };
  season?: Season;
  standings?: { [key: string]: Standings };
  user?: User;
}

interface DispatchProps {
  fetchDraft: () => Promise<any>;
  fetchManagers: () => Promise<any>;
  fetchMatchups: () => Promise<any>;
  fetchSeason: () => Promise<any>;
  fetchStandings: () => Promise<any>;
  fetchUsers: () => Promise<any>;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

const renderChildren = ({ match, managers, matchups, season, standings, drafts, user }: Props) => {
  if (!managers || !matchups || !season || !standings || !drafts || !user) {
    return 'loading...';
  }

  console.log(season);

  return (
    <Switch>
      <Route path={`${match.url}/standings`} render={() => 'standings'} />
      <Route path={`${match.url}/matchups`} render={() => 'matchups'} />
      <Route path={`${match.url}/scoring`} render={() => 'scoring'} />
      <Route render={() => 'empty state'} />
    </Switch>
  );
};

class HomePage extends React.Component<Props> {
  componentDidMount() {
    const { fetchUsers, fetchSeason, fetchManagers, fetchDraft, fetchMatchups, fetchStandings } = this.props;

    fetchUsers()
      .then(fetchSeason)
      .then(() => Promise.all([fetchManagers(), fetchDraft(), fetchMatchups(), fetchStandings()]));
  }

  render() {
    const season = this.props.season || { year: 0, recent_week: 0 };

    // const normalizedYear = normalizeYear(year);
    // const season = Object.values(seasons || {}).find(season => season.year === normalizedYear) || { recent_week: 0 };

    return (
      <Page year={season.year} week={season.recent_week}>
        {renderChildren(this.props)}
      </Page>
    );
  }
}

const normalizeYear = (year: string | number) => (typeof year === 'string' ? parseInt(year) : year);

export default connectors.withMerge(
  ({ auth, drafts, managers, matchups, seasons, standings }) => ({
    activeMenuKey: '',
    drafts: drafts.db,
    managers: managers.db,
    matchups: matchups.db,
    seasons: seasons.db,
    standings: standings.db,
    user: auth.user,
  }),
  dispatch => ({
    fetchDrafts: (query: object) => dispatch<any>(draftsActions.listDrafts.creator.worker(query)),
    fetchManagers: () => dispatch<any>(managersActions.listManagers.creator.worker({})),
    fetchMatchups: (query: object) => dispatch<any>(matchupsActions.listMatchups.creator.worker(query)),
    fetchSeasons: (query: object) => dispatch<any>(seasonsActions.listSeasons.creator.worker(query)),
    fetchStandings: (query: object) => dispatch<any>(standingsActions.listStandings.creator.worker(query)),
    fetchUsers: () => dispatch<any>(usersActions.listUsers.creator.worker({})),
  }),
  (
    { seasons, ...stateProps },
    { fetchDrafts, fetchMatchups, fetchSeasons, fetchStandings, ...dispatchProps },
    ownProps: OwnProps
  ) => {
    const year = normalizeYear(ownProps.year);
    const yearQuery = { year };
    return {
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      season: Object.values(seasons || {}).find(season => season.year === year),
      fetchDraft: () => fetchDrafts(yearQuery),
      fetchMatchups: () => fetchMatchups(yearQuery),
      fetchSeason: () => fetchSeasons(yearQuery),
      fetchStandings: () => fetchStandings(yearQuery),
    };
  }
)(HomePage);
