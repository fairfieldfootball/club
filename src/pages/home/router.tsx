import React from 'react';
import { useHeadline, useToolbar, Heading, LayoutStateMenu } from '@makes-apps/lib';

import { Draft, Manager, Matchup, Season, Standings } from '../../types';

import EmptyState from './empty';
import LeagueMatchups from './matchups';
import LeagueScoring from './scoring';
import LeagueStandings from './standings';
import { View } from './types';

interface Props {
  setView: (view?: View) => void;
  view?: View;
  year: number;
  drafts: { [key: string]: Draft };
  managers: { [key: string]: Manager };
  matchups: { [key: string]: Matchup };
  seasons: { [key: string]: Season };
  standings: { [key: string]: Standings };
}

const HomePage = ({ setView, view, year }: Props) => {
  const { setHeadline } = useHeadline();
  const { setToolbar } = useToolbar();

  React.useEffect(() => {
    setHeadline(<Heading noMargin>{`${year} Season: Week ${0}`}</Heading>);
    setToolbar(
      <LayoutStateMenu
        activeView={view}
        setView={setView}
        viewLabels={{ standings: 'standings', matchups: 'matchups', scoring: 'scoring' }}
      />
    );
    return () => {
      setHeadline(undefined);
      setToolbar(undefined);
    };
  }, [view]);

  if (!view) {
    return <EmptyState />;
  }

  return (
    <>
      {view === 'standings' && <LeagueStandings />}
      {view === 'matchups' && <LeagueMatchups />}
      {view === 'scoring' && <LeagueScoring />}
    </>
  );
};

export default HomePage;
