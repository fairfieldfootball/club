import React from 'react';
import { Button, StackedPageContext, Text } from '@makes-apps/lib';

import connectors from '../connectors';
import { InSeason, PostSeason, PreSeason } from '../components';
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
  pageContext: StackedPageContext;
  year: string | number;
}

interface StateProps {
  drafts?: { [key: string]: Draft };
  managers?: { [key: string]: Manager };
  matchups?: { [key: string]: Matchup };
  seasons?: { [key: string]: Season };
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

type Props = OwnProps & StateProps & DispatchProps;

const normalizeYear = (year: string | number) => (typeof year === 'string' ? parseInt(year) : year);

const PageHeading = () => (
  <Text size="hecto" noMargin>
    a{' '}
    <Button
      as="a"
      variant="text"
      padding="none"
      size="hecto"
      href="https://football.fantasysports.yahoo.com/league/myfg"
      target="_blank"
      rel="noreferrer"
    >
      fantasy football league
    </Button>{' '}
    since 2013.
  </Text>
);

class HomePage extends React.Component<Props> {
  componentDidMount() {
    const { fetchDraft, fetchManagers, fetchMatchups, fetchSeason, fetchStandings, pageContext } = this.props;

    pageContext.setPageInfo({
      byline: <PageHeading />,
      menu: [
        { type: 'view', key: 'pre_season', display: 'pre-season' },
        { type: 'view', key: 'in_season', display: 'season' },
        { type: 'view', key: 'post_season', display: 'post-season' },
      ],
      activeMenuKey: 'pre_season',
    });

    Promise.all([fetchManagers(), fetchMatchups(), fetchDraft(), fetchSeason(), fetchStandings()]).catch(err =>
      console.error(err, 'failed to fetch league data')
    );
  }

  componentWillUnmount() {
    this.props.pageContext.setPageInfo();
  }

  render() {
    const {
      managers,
      matchups,
      pageContext: { activeMenuKey },
      seasons,
      standings,
      drafts,
      user,
      year,
    } = this.props;

    if (!managers || !matchups || !seasons || !standings || !drafts || !user) {
      return 'loading...';
    }

    const normalizedYear = normalizeYear(year);
    const season = Object.values(seasons).find(season => season.year === normalizedYear);

    if (!season) {
      return `failed to load season for year ${year}`;
    }

    const seasonManagerIds: { [key: string]: true } = season.managers.reduce(
      (acc, { manager_id }) => ({ ...acc, [manager_id.toHexString()]: true }),
      {}
    );
    const seasonManagers = Object.values(managers).filter(({ _id }) => seasonManagerIds[_id.toHexString()]);

    const seasonMatchups = Object.values(matchups).filter(
      matchup => matchup.season_id.toHexString() === season._id.toHexString()
    );

    return (
      <>
        {activeMenuKey === 'pre_season' && (
          <PreSeason season={season} managers={seasonManagers} matchups={seasonMatchups} />
        )}
        {activeMenuKey === 'in_season' && (
          <InSeason season={season} managers={seasonManagers} matchups={seasonMatchups} />
        )}
        {activeMenuKey === 'post_season' && (
          <PostSeason season={season} managers={seasonManagers} matchups={seasonMatchups} />
        )}
      </>
    );
  }
}

export default connectors.withMerge(
  ({ auth, drafts, managers, matchups, seasons, standings }) => ({
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
  (stateProps, { fetchDrafts, fetchMatchups, fetchSeasons, fetchStandings, ...dispatchProps }, ownProps: OwnProps) => {
    const yearQuery = { year: normalizeYear(ownProps.year) };
    return {
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      fetchDraft: () => fetchDrafts(yearQuery),
      fetchMatchups: () => fetchMatchups(yearQuery),
      fetchSeason: () => fetchSeasons(yearQuery),
      fetchStandings: () => fetchStandings(yearQuery),
    };
  }
)(HomePage);
