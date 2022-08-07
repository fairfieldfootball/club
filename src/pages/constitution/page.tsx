import React from 'react';
import { useHeadline, Flex } from '@makes-apps/lib';

import Banner from './banner';
import Preamble from './preamble';
import FoundingManagers from './founding_managers';
import GoverningBody from './governing_body';
import LeagueMembers from './league_members';
import LeagueSetup from './league_setup';
import DraftProcess from './draft_process';
import RosterMoves from './roster_moves';
import RegularSeason from './regular_season';
import Playoffs from './playoffs';
import Payouts from './payouts';
import DisgracefulPunishment from './disgraceful_punishment';
import Amendments from './amendments';

interface Props {}

export default ({  }: Props) => {
  const { setHeadline } = useHeadline();

  React.useEffect(() => {
    setHeadline(<Banner />);
    return () => setHeadline();
  }, []);

  return (
    <Flex alignSelf="center" direction="column" maxWidth="75%">
      <Preamble />
      <FoundingManagers />
      <GoverningBody />
      <LeagueMembers />
      <LeagueSetup />
      <DraftProcess />
      <RosterMoves />
      <RegularSeason />
      <Playoffs />
      <Payouts />
      <DisgracefulPunishment />
      <Amendments />
    </Flex>
  );
};
