import React from 'react';

import { Season, Standings } from '../../../types';

interface Props {
  season?: Season;
  standings?: Standings;
}

const View = ({ season, standings }: Props) => {
  if (!season) {
    return <>season not found</>;
  }

  if (!standings) {
    return <>standings not found</>;
  }

  return <>season view component here</>;
};

export default View;
