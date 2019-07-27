import appActions from '../../actions';
import { RootContext, RootState } from '../../root';
import { YahooState } from '../../types';

const LEAGUE_KEYS: { [key: number]: string } = {
  2019: '390.l.529959',
};

const yahooLeagueUrl = (year: number) =>
  `https://fantasysports.yahooapis.com/fantasy/v2/league/${LEAGUE_KEYS[year]};out=settings,standings,scoreboard`;

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
        delete newState.scoreboard;
        delete newState.duration;
        delete newState.error;

        return newState;
      case 'success':
        const [{ fantasy_content }] = action.payload;

        const { league, time: duration } = fantasy_content;

        const [meta, settings, standings, scoreboard] = league;

        return { ...state, meta, settings, standings, scoreboard, duration };
      case 'error':
        const { message: error } = action.payload;

        return { ...state, error };
    }

    return state;
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
