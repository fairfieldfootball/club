import React from 'react';
import { Heading, Text } from '@makes-apps/lib';

export default () => (
  <>
    <Heading as="h2" align="center">Playoffs</Heading>
    <Text>The three-round playoffs will take place during Week 14 through Week 16</Text>
    <Text>The team that wins its respective division will be awarded a first round by in the playoffs via a 1 or 2 seeding, determined by the relative records and Yahoo! Fantasy Football default tiebreakers between these two teams</Text>
    <Text>The four remaining wild card playoff spots will be determined irrespective of divisions. Simply the four best remaining records (with Yahoo! Fantasy Football default tiebreakers included) garner seeds 3 through 6 for the playoffs</Text>
    <Text>Teams eliminated from the postseason will be locked from making any roster moves</Text>
  </>
);
