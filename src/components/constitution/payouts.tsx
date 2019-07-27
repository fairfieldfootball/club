import React from 'react';
import { Heading, List, Text } from '@makes-apps/lib';

export default () => (
  <>
    <Heading as="h2" align="center">Payouts</Heading>
    <Text>The payouts will be totaled in terms of Units</Text>
    <Text noMargin>
      1 Unit is the equivalent of 1 team's entry fee
      <List>
        <Text decoration="line-through" noMargin>
          Regular Season Points Champion - 1 Unit
        </Text>
        <Text decoration="line-through" noMargin>
          --
        </Text>
        <Text decoration="line-through" noMargin>
          1st Place in Postseason - 9 Units
        </Text>
        <Text decoration="line-through" noMargin>
          2nd Place in Postseason - 3 Units
        </Text>
        <Text decoration="line-through" noMargin>
          3rd Place in Postseason - 1 Units
        </Text>
      </List>
      <Text color="neutral" weight="bold" noMargin>
        UPDATED: August 23, 2016
      </Text>
      <List>
        <Text noMargin>Weekly Points Champion - 0.2 Units</Text>
        <Text noMargin>--</Text>
        <Text noMargin>1st Place in Postseason - 7.5 Units</Text>
        <Text noMargin>2nd Place in Postseason - 2.9 Units</Text>
        <Text noMargin>3rd Place in Postseason - 1 Units</Text>
      </List>
    </Text>
    <Text>
      In addition to payouts, the last place team upon the completion of the regular season is required to perform the
      Disgraceful Punishment for Sucking So Bad
    </Text>
  </>
);
