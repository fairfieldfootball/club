import React from 'react';
import { Text, Button } from '@makes-apps/lib';

const Mantra = () => (
  <Text size="deci" noMargin>
    a{' '}
    <Button
      as="a"
      color="blue"
      variant="text"
      padding="none"
      size="deci"
      href="https://football.fantasysports.yahoo.com/league/myfg"
      target="_blank"
      rel="noreferrer"
    >
      fantasy football league
    </Button>{' '}
    since 2013.
  </Text>
);

export default Mantra;
