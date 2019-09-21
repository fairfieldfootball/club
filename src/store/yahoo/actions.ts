import { BSON } from 'mongodb-stitch-browser-sdk';

import appActions from '../../actions';
import dbs from '../../dbs';
import { RootContext, RootState } from '../../root';
import { LeagueScoreboard, YahooState } from '../../types';

const LEAGUE_KEYS: { [key: number]: string } = {
  2019: '390.l.529959',
};

const yahooLeagueUrl = (year: number) =>
  `https://fantasysports.yahooapis.com/fantasy/v2/league/${LEAGUE_KEYS[year]};out=settings,standings`;

const factory = appActions.app().forNamespace<YahooState>(YahooState.NAMESPACE);

export const getYahooAccessToken = factory
  .withType('get yahoo access token')
  .asThunk((code: string) => (_dispatch, getState, stitch) => {
    const user = getState().auth.user;
    return stitch.stitch.callFunction('getYahooAccessToken', [
      user ? user.email : 'no_user@email.com',
      code,
      process.env.YAHOO_REDIRECT_URI,
    ]);
  });

export const fetchLeagueData = factory
  .withType('fetch league data')
  .asThunk(
    (year: number) => (_dispatch, getState, stitch) =>
      makeYahooRequests(getState(), stitch, [yahooLeagueUrl(year)], true),
    ({ payload: [{ fantasy_content }] }) => ({
      message: `pulled yahoo league data in ${fantasy_content.time}`,
    })
  )
  .withReducer((state, action) => {
    switch (action.status) {
      case 'starting':
        const newState = { ...state };

        delete newState.meta;
        delete newState.settings;
        delete newState.standings;
        delete newState.duration;
        delete newState.error;

        return newState;
      case 'success':
        const [{ fantasy_content }] = action.payload;

        const { league, time: duration } = fantasy_content;

        const [meta, settings, standings] = league;

        return { ...state, meta, settings, standings, duration };
      case 'error':
        return { ...state, error: action.payload.message };
    }

    return state;
  });

export const fetchLeagueScoreboard = factory
  .withType('fetch league scoreboard')
  .asThunk<[], LeagueScoreboard>(() => (_dispatch, _getState, { stitch }) =>
    stitch.callFunction('parseLeagueScoreboard', [])
  )
  .withReducer((state, action) => {
    switch (action.status) {
      case 'starting':
        const newState = { ...state };
        delete newState.scoreboard;
        return newState;
      case 'success':
        return { ...state, scoreboard: action.payload };
      case 'error':
        return { ...state, error: action.payload.message };
    }
    return state;
  });

export const seedWeeklyMatchups = factory
  .withType('seed weekly matchups')
  .asThunk((season_id: BSON.ObjectId) => (_dispatch, getState, stitch) => {
    const {
      yahoo: { scoreboard },
    } = getState();
    return dbs(stitch)
      .app()
      .matchups()
      .insertMany(
        scoreboard.matchups.map((matchup: any, index: any) => ({
          season_id,
          year: 2019, // TODO
          week: scoreboard.week,
          index,
          start_date: new Date(), // TODO
          end_date: new Date(),  // TODO
          playoffs: matchup.is_playoffs,
          consolation: matchup.is_consolation,
          away_team: null, // TODO
          home_team: null, // TODO
        }))
      );
  });

const newYahooError = (description?: string | null) =>
  new Error(description || 'an unexpected eror occurred when executing Yahoo! api request');

const makeYahooRequests = (
  { auth }: RootState,
  { stitch }: RootContext,
  urls: string[],
  json?: boolean
): Promise<any[]> =>
  stitch
    .callFunction('makeYahooRequests', [
      auth.user ? auth.user.email : '',
      json ? urls.map(url => `${url}?format=json`) : urls,
      process.env.YAHOO_REDIRECT_URI,
    ])
    .then((responses: any[]) =>
      responses.map(res => {
        if (json) {
          const root = JSON.parse(res);

          if (root.error) {
            throw newYahooError(root.error.description);
          }

          return root;
        }

        const root = new DOMParser().parseFromString(res, 'application/xml');

        const error = root.getElementsByTagName('yahoo:description').item(0);
        if (error) {
          throw newYahooError(error.textContent);
        }

        return root;
      })
    );
