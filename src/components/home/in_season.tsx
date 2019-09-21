import React from 'react';
import { Flex } from '@makes-apps/lib';

interface Props {
  season: any;
  managers: any[];
  matchups: any[];
}

export default ({  }: Props) => (
  <Flex direction="column" alignItems="stretch" spacing={theme => `${theme.spacers.rems.micro}`}>
    <Flex justifyContent="space-between" spacing={theme => `${theme.spacers.rems.micro}`}>
      <Flex direction="column" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex>one</Flex>
        <Flex>two</Flex>
        <Flex>three</Flex>
      </Flex>
      <Flex direction="column" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex>one</Flex>
        <Flex>two</Flex>
        <Flex>three</Flex>
      </Flex>
      <Flex direction="column" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex>one</Flex>
        <Flex>two</Flex>
        <Flex>three</Flex>
      </Flex>
      <Flex direction="column" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex>one</Flex>
        <Flex>two</Flex>
        <Flex>three</Flex>
      </Flex>
      <Flex direction="column" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex>one</Flex>
        <Flex>two</Flex>
        <Flex>three</Flex>
      </Flex>
    </Flex>
    <Flex direction="column" alignItems="stretch" spacing={theme => `${theme.spacers.rems.micro}`}>
      <Flex justifyContent="space-between">
        <Flex>one</Flex>
        <Flex>one</Flex>
        <Flex>one</Flex>
        <Flex>one</Flex>
        <Flex>one</Flex>
      </Flex>
      <Flex justifyContent="space-between">
        <Flex>two</Flex>
        <Flex>two</Flex>
        <Flex>two</Flex>
        <Flex>two</Flex>
        <Flex>two</Flex>
      </Flex>
      <Flex justifyContent="space-between">
        <Flex>three</Flex>
        <Flex>three</Flex>
        <Flex>three</Flex>
        <Flex>three</Flex>
        <Flex>three</Flex>
      </Flex>
    </Flex>
  </Flex>
);
