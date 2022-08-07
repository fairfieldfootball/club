import React from 'react';

import connectors from '../../connectors';
import {
  draftsActions,
  managersActions,
  matchupsActions,
  seasonsActions,
  standingsActions,
  usersActions,
} from '../../store';
import { Draft, Manager, Matchup, Season, Standings, User } from '../../types';

import Router from './router';
import { View } from './types';

const normalizeYear = (year: string | number) => (typeof year === 'string' ? parseInt(year) : year);

interface OwnProps {
  year: string | number;
}

interface StateProps {
  drafts?: { [key: string]: Draft };
  managers?: { [key: string]: Manager };
  matchups?: { [key: string]: Matchup };
  seasons?: { [key: string]: Season };
  standings?: { [key: string]: Standings };
  userEmail?: string;
  users?: { [key: string]: User };
}

interface DispatchProps {
  fetchDrafts: (query: object) => Promise<any>;
  fetchManagers: (query: object) => Promise<any>;
  fetchMatchups: (query: object) => Promise<any>;
  fetchSeasons: (query: object) => Promise<any>;
  fetchStandings: (query: object) => Promise<any>;
  fetchUsers: (query: object) => Promise<any>;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
  view?: View;
}

class HomePage extends React.Component<Props, State> {
  readonly state: State = {};

  setView = (view?: View) => this.setState(() => ({ view }));

  componentDidMount() {
    const { fetchSeasons, fetchManagers, fetchDrafts, fetchMatchups, fetchStandings } = this.props;

    const year = normalizeYear(this.props.year);

    fetchSeasons({ year }).then(([season]) =>
      Promise.all([
        fetchManagers({ season_id: season._id }),
        fetchDrafts({ year }),
        fetchMatchups({ year }),
        fetchStandings({ year }),
      ])
    );
  }

  render() {
    const { managers, matchups, seasons, standings, drafts, userEmail, users } = this.props;
    const { view } = this.state;

    if (!managers || !matchups || !seasons || !standings || !drafts || !userEmail || !users) {
      return 'loading...';
    }

    // const user = Object.values(users).find(({ email }) => email === userEmail);

    const year = normalizeYear(this.props.year);
    return (
      <Router
        setView={this.setView}
        view={view}
        year={year}
        drafts={drafts}
        managers={managers}
        matchups={matchups}
        seasons={seasons}
        standings={standings}
      />
    );
  }
}

export default connectors.withDispatchFunction(
  ({ auth, drafts, managers, matchups, seasons, standings, users }) => ({
    activeMenuKey: '',
    drafts: drafts.db,
    managers: managers.db,
    matchups: matchups.db,
    seasons: seasons.db,
    standings: standings.db,
    userEmail: auth.userEmail,
    users: users.db,
  }),
  dispatch => ({
    fetchUsers: (query: object) => dispatch<any>(usersActions.listUsers.creator.worker(query)),
    fetchDrafts: (query: object) => dispatch<any>(draftsActions.listDrafts.creator.worker(query)),
    fetchManagers: (query: object) => dispatch<any>(managersActions.listManagers.creator.worker(query)),
    fetchMatchups: (query: object) => dispatch<any>(matchupsActions.listMatchups.creator.worker(query)),
    fetchSeasons: (query: object) => dispatch<any>(seasonsActions.listSeasons.creator.worker(query)),
    fetchStandings: (query: object) => dispatch<any>(standingsActions.listStandings.creator.worker(query)),
  })
)(HomePage);
