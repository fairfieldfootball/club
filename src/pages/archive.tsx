import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Button, ButtonGroup, Heading, RouterActions } from '@makes-apps/lib';

import connectors from '../connectors';
import { ArchiveAllTime, ArchiveManagers, ArchiveSeasons } from '../components';
import { managersActions, matchupsActions, seasonsActions, standingsActions } from '../store';
import { Manager, Matchup, Season, Standings, User } from '../types';
import urls from '../urls';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  users: User[];
  managers?: { [key: string]: Manager };
  matchups?: { [key: string]: Matchup };
  seasons?: { [key: string]: Season };
  standings?: { [key: string]: Standings };
}

interface DispatchProps {
  fetchManagers: (query: object) => Promise<any>;
  fetchMatchups: (query: object) => Promise<any>;
  fetchSeasons: (query: object) => Promise<any>;
  fetchStandings: (query: object) => Promise<any>;
  goto: (url: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

type View = 'all_time' | 'season' | 'manager';

interface State {
  activeView?: View;
}

class ArchivePage extends React.Component<Props, State> {
  readonly state: State = {};

  isLoading = () => {
    const { standings } = this.props;
    return !standings;
  };

  setActiveView = (activeView?: View) => this.setState(() => ({ activeView }));

  componentWillMount() {
    const { fetchStandings } = this.props;
    fetchStandings({ week: 16 });
  }

  render() {
    const { goto, managers, matchups, match, seasons, standings } = this.props;

    if (!managers || !matchups || !seasons || !standings) {
      return '...loading';
    }

    return (
      <>
        <ButtonGroup align="center">
          <Button as="button" onClick={() => {}}>
            season
          </Button>
          <Button as="button" onClick={() => {}}>
            all time
          </Button>
          <Button as="button" onClick={() => {}}>
            manager
          </Button>
        </ButtonGroup>
        <Heading color="primary">the archive</Heading>
        <Switch>
          <Route
            exact
            path={`${match.url}`}
            component={() => (
              <ArchiveAllTime onComponentDidMount={() => this.setActiveView('all_time')} seasons={seasons} />
            )}
          />
          <Route
            path={`${match.url}/managers`}
            render={props => (
              <ArchiveManagers
                {...props}
                gotoManagerView={id => goto(urls.archive.managers.view(id))}
                managers={managers}
                onComponentDidMount={() => this.setActiveView('manager')}
              />
            )}
          />
          <Route
            path={`${match.url}/seasons`}
            render={props => (
              <ArchiveSeasons
                {...props}
                gotoSeasonView={id => goto(urls.archive.seasons.view(id))}
                onComponentDidMount={() => this.setActiveView('season')}
                seasons={seasons}
                standings={standings}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default connectors.withDispatchObject(
  ({ managers, matchups, seasons, standings, users }) => ({
    users: Object.values(users.db || {}),
    managers: managers.db,
    matchups: matchups.db,
    seasons: seasons.db,
    standings: standings.db,
  }),
  {
    fetchManagers: managersActions.listManagers.creator.worker,
    fetchMatchups: matchupsActions.listMatchups.creator.worker,
    fetchSeasons: seasonsActions.listSeasons.creator.worker,
    fetchStandings: standingsActions.listStandings.creator.worker,
    goto: RouterActions.goto.creator.worker,
  }
)(ArchivePage);
