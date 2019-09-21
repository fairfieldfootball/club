import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, RouterActions, Text } from '@makes-apps/lib';
import queryString from 'querystring';

import connectors from '../connectors';
import { FfcErrorCode, LeagueCard } from '../components';
import {
  draftsActions,
  managersActions,
  matchupsActions,
  seasonsActions,
  standingsActions,
  yahooActions,
} from '../store';
import { Draft, Manager, Matchup, Season, Standings } from '../types';
import { LeagueScoreboard, YahooLeagueMeta, YahooLeagueSettings, YahooLeagueStandings } from '../types';
import urls from '../urls';
import { YAHOO_AUTH_URL } from '../yahoo';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  duration?: string;
  error?: string;
  season?: Season;
  managers?: { [key: string]: Manager };
  draft?: Draft;
  prevStandings?: Standings;
  standings?: Standings;
  prevMatchups?: Matchup[];
  matchups?: Matchup[];
  yahooMeta?: YahooLeagueMeta;
  scoreboard?: LeagueScoreboard;
  yahooSettings?: YahooLeagueSettings;
  yahooStandings?: YahooLeagueStandings;
  search: string;
}

interface DispatchProps {
  fetchLeagueData: (year: number) => Promise<any>;
  fetchLeagueScoreboard: () => Promise<any>;
  fetchDrafts: (query: object) => Promise<any>;
  fetchManagers: (query: object) => Promise<any>;
  fetchMatchups: (query: object) => Promise<any>;
  fetchSeasons: (query: object) => Promise<any>;
  fetchStandings: (query: object) => Promise<any>;
  fetchUsers: () => Promise<any>;
  getYahooAccessToken: (code: string) => Promise<void>;
  gotoRoot: () => void;
  gotoYahoo: () => void;
  saveSeason: (season: Season) => Promise<any>;
}

type Props = OwnProps & StateProps & DispatchProps;

class YahooPage extends React.Component<Props> {
  componentDidMount() {
    const {
      duration,
      error,
      fetchLeagueData,
      fetchLeagueScoreboard,
      fetchDrafts,
      fetchManagers,
      fetchMatchups,
      fetchSeasons,
      fetchStandings,
      getYahooAccessToken,
      gotoRoot,
      gotoYahoo,
      search,
    } = this.props;
    const year = 2019;

    const fetchData = () =>
      fetchLeagueData(year)
        .then(res => {
          const meta: YahooLeagueMeta = res[0].fantasy_content.league[0];

          const week = parseInt(meta.current_week);
          const prevWeek = week - 1;

          const yearQuery = { year };
          const weekQuery = { $or: [{ week: prevWeek }, { week }] };

          return Promise.all([
            fetchLeagueScoreboard(),
            fetchManagers({}),
            fetchSeasons(yearQuery),
            fetchDrafts(yearQuery),
            fetchStandings({ ...yearQuery, ...weekQuery }),
            fetchMatchups({ ...yearQuery, ...weekQuery }),
          ]);
        })
        .then(gotoRoot);

    if (search) {
      const { code } = queryString.parse(search);
      if (code && typeof code === 'string') {
        getYahooAccessToken(code).then(fetchData);
        return;
      }
    }

    if (error) {
      console.log(error);
      gotoYahoo();
      return;
    }

    if (!duration) {
      fetchData();
      return;
    }
  }

  render() {
    const {
      search,
      duration,
      managers,
      saveSeason,
      season,
      yahooMeta,
      yahooSettings,
      scoreboard,
      yahooStandings,
    } = this.props;
    const parsed = queryString.parse(search);
    if (parsed.error) {
      const { error, error_description } = parsed;
      return <FfcErrorCode type={error} description={error_description} />;
    }

    if (!duration || !managers || !season) {
      return <>loading...</>;
    }

    if (!yahooMeta || !yahooSettings || !yahooStandings || !scoreboard) {
      return <>unable to read yahoo data</>;
    }

    return (
      <>
        <Text>{`pulled yahoo league data in ${duration}`}</Text>
        <Button as="button">Seed Weekly Matchups</Button>
        <LeagueCard
          managers={managers}
          season={season}
          saveSeason={saveSeason}
          scoreboard={scoreboard}
          yahooMeta={yahooMeta}
          yahooSettings={yahooSettings}
          yahooStandings={yahooStandings}
        />
        <Text as="pre">{JSON.stringify([yahooMeta, yahooSettings, scoreboard, yahooStandings], null, 2)}</Text>
      </>
    );
  }
}

const parseMatchups = (recentWeek: number, db: { [key: string]: Matchup } = {}): [Matchup[], Matchup[]] => {
  const matchups = Object.values(db).reduce(
    (acc, matchup) => ({ ...acc, [matchup.week]: (acc[matchup.week] || []).concat(matchup) }),
    {} as { [key: number]: Matchup[] }
  );

  const prevMatchups = matchups[recentWeek] || [];
  const currMatchups = matchups[recentWeek + 1] || [];

  return [prevMatchups, currMatchups];
};

const parseStandings = (
  recentWeek: number,
  db: { [key: string]: Standings } = {}
): [Standings | undefined, Standings | undefined] => {
  const standings = Object.values(db).sort((s1, s2) => s1.week - s2.week);

  const prevStandings = standings.find(({ week }) => week === recentWeek);
  const currStandings = standings.find(({ week }) => week === recentWeek + 1);

  return [prevStandings, currStandings];
};

export default connectors.withDispatchFunction(
  ({ drafts, managers, matchups, seasons, standings, yahoo, router }) => {
    const season = Object.values(seasons.db || {}).find(season => !!season);
    const recentWeek = season ? season.recent_week : 0;

    const [prevStandings, currStandings] = parseStandings(recentWeek, standings.db);
    const [prevMatchups, currMatchups] = parseMatchups(recentWeek, matchups.db);

    return {
      search: (router.location || '').search.replace(/\?/, ''),
      season,
      draft: Object.values<any>(drafts.db || {}).find(draft => draft),
      managers: managers.db,
      prevStandings,
      standings: currStandings,
      prevMatchups,
      matchups: currMatchups,
      scoreboard: yahoo.scoreboard,
      yahooMeta: yahoo.meta,
      yahooSettings: yahoo.settings,
      yahooStandings: yahoo.standings,
      duration: yahoo.duration,
      error: yahoo.error,
    };
  },
  dispatch => ({
    fetchLeagueData: (year: number) => dispatch<any>(yahooActions.fetchLeagueData.creator.worker(year)),
    fetchLeagueScoreboard: () => dispatch<any>(yahooActions.fetchLeagueScoreboard.creator.worker()),
    fetchDrafts: (query: object) => dispatch<any>(draftsActions.listDrafts.creator.worker(query)),
    fetchManagers: (query: object) => dispatch<any>(managersActions.listManagers.creator.worker(query)),
    fetchMatchups: (query: object) => dispatch<any>(matchupsActions.listMatchups.creator.worker(query)),
    fetchSeasons: (query: object) => dispatch<any>(seasonsActions.listSeasons.creator.worker(query)),
    fetchStandings: (query: object) => dispatch<any>(standingsActions.listStandings.creator.worker(query)),
    getYahooAccessToken: (code: string) => dispatch<any>(yahooActions.getYahooAccessToken.creator.worker(code)),
    gotoRoot: () => dispatch<any>(RouterActions.goto.creator.worker(urls.me)),
    gotoYahoo: () => (window.location.href = YAHOO_AUTH_URL),
    saveSeason: (season: Season) => dispatch<any>(seasonsActions.saveSeason.creator.worker(season)),
  })
)(YahooPage);
