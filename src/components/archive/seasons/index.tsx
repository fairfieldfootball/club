import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { Season, Standings } from '../../../types';

import List from './list';
import View from './view';

interface Props extends RouteComponentProps {
  gotoSeasonView: (seasonId: string) => void;
  onComponentDidMount: () => any;
  seasons: { [key: string]: Season };
  standings: { [key: string]: Standings };
}

const Router = ({ gotoSeasonView, seasons, standings, match }: Props) => (
  <Switch>
    <Route
      exact
      path={`${match.url}`}
      component={() => <List gotoSeasonView={gotoSeasonView} seasons={seasons} standings={standings} />}
    />
    <Route
      path={`${match.url}/:seasonId`}
      render={props => {
        const { seasonId } = props.match.params;
        return (
          <View
            season={seasons[seasonId]}
            standings={Object.values(standings).find(standings => standings.season_id.toHexString() === seasonId)}
          />
        );
      }}
    />
  </Switch>
);

export default Router;
