import React from 'react';
import { Flex } from '@makes-apps/lib';

interface Props {
  season: any;
  managers: any[];
  matchups: any[];
}

export default ({  }: Props) => (
  <Flex
    direction="column"
    alignItems="stretch"
    border="1px solid black"
    spacing={theme => `${theme.spacers.rems.micro}`}
  >
    <Flex justifyContent="space-between" border="1px solid green" spacing={theme => `${theme.spacers.rems.micro}`}>
      <Flex direction="column" border="1px solid blue" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">three</Flex>
      </Flex>
      <Flex direction="column" border="1px solid blue" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">three</Flex>
      </Flex>
      <Flex direction="column" border="1px solid blue" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">three</Flex>
      </Flex>
      <Flex direction="column" border="1px solid blue" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">three</Flex>
      </Flex>
      <Flex direction="column" border="1px solid blue" spacing={theme => `${theme.spacers.rems.micro}`}>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">three</Flex>
      </Flex>
    </Flex>
    <Flex
      direction="column"
      alignItems="stretch"
      border="1px solid green"
      spacing={theme => `${theme.spacers.rems.micro}`}
    >
      <Flex justifyContent="space-between" border="1px solid blue">
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">one</Flex>
        <Flex border="1px solid gray">one</Flex>
      </Flex>
      <Flex justifyContent="space-between" border="1px solid blue">
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">two</Flex>
        <Flex border="1px solid gray">two</Flex>
      </Flex>
      <Flex justifyContent="space-between" border="1px solid blue">
        <Flex border="1px solid gray">three</Flex>
        <Flex border="1px solid gray">three</Flex>
        <Flex border="1px solid gray">three</Flex>
        <Flex border="1px solid gray">three</Flex>
        <Flex border="1px solid gray">three</Flex>
      </Flex>
    </Flex>
  </Flex>
);
