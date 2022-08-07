import React from 'react';

import { Pill, PillsContainer } from '../../components';
import urls from '../../urls';

interface Props {}

export default ({  }: Props) => (
  <PillsContainer>
    <Pill
      action="View the Archive"
      description="Look at past season's results, records, and stuff."
      to={urls.archive.home}
    />
    <Pill
      action="Browse the Blog"
      description="Find things that have been written about the league."
      to={urls.blogs.list}
    />
    <Pill
      action="Open the Constitution"
      description="Read about the structure and rules of the league."
      to={urls.constitution}
    />
    <Pill
      action="View the League"
      description="Look at the current seasons results, matchups, and stuff."
      to={urls.home}
    />
  </PillsContainer>
);
