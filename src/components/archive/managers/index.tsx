import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { Manager } from '../../../types';

import List from './list';
import View from './view';

interface Props extends RouteComponentProps {
  gotoManagerView: (managerId: string) => void;
  managers: { [key: string]: Manager };
  onComponentDidMount: () => any;
}

const Router = ({ gotoManagerView, managers, match }: Props) => (
  <Switch>
    <Route
      exact
      path={`${match.url}`}
      component={() => <List gotoManagerView={gotoManagerView} managers={managers} />}
    />
    <Route
      path={`${match.url}/:managerId`}
      render={props => {
        const { managerId } = props.match.params;
        return <View manager={managers[managerId]} />;
      }}
    />
  </Switch>
);

export default Router;
