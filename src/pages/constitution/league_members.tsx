import React from 'react';
import { Heading, List, Subheading, Text } from '@makes-apps/lib';

export default () => (
  <>
    <Heading as="h2" align="center">League Members</Heading>
    <Text>
      As this is the inaugural season for this league's formalities, the Commish has took it upon himself to initially
      elect the members of the SB based upon past exemplified enthusiasm for the Sport:
    </Text>
    <List>
      <Text noMargin>Adam "White Paul Pierce" Barlow</Text>
      <Text noMargin>Chris "Red Shorts" Banten</Text>
      <Text noMargin>Eric "President Big Bush" D'Elia</Text>
      <Text noMargin>Mark "Daddy's Boy" Rodgers</Text>
    </List>
    <Text>
      Should any of the aforementioned active league managers decide they do not wish to sit on the inaugural SB, the
      reamining SB members will decide upon a replacement manager.
    </Text>
    <Text>There will be 14 league managers per season, no more and no less</Text>
    <Text>
      Should a different number of managers be required for any season, this addition/subtraction must occur in twos.
    </Text>
    <Text>
      All returning managers retain the right for "first dibs" on procuring a team for the next season provided they
      have not been banned by the SB.
    </Text>
    <Text>
      Any active league manager may propose a new potential manager should the League require spots to be filled. This
      potential new manager must first be accepted by the SB via a majority vote before he/she can be considered a new
      active league manager for the League.
    </Text>
    <Subheading as="h3" color="secondary" font="logo">
      Bannings
    </Subheading>
    <Text>
      Bannings will be instituted by the SB based on a majority vote and must be upheld for a minimum of One Season and
      a maximum of a Lifetime Sentence.
    </Text>
    <Text>
      Bannings will be issued as a result of franchise negligence, failure to pay league fees in a timely manner and/or
      for reasons currently beyond the comprehension but for which, at said time, the SB deems banning appropriate
      through majority vote.
    </Text>
    <Text>
      An active league manager that becomes banned will have his (or her) franchise locked for whatever remainder of the
      season exists. This will prevent any roster updates, free agent moves, trades, and any other form of intentional
      degradation of the League.
    </Text>
    <Text>
      The SB, in conjuction with the Commish, will be responsible for setting the weekly lineup for any and all banned
      franchises during mid-season to ensure fair matchups for all managers throughout the season. A banned franchise
      will not be allowed to pick up free agents via the waiver wire and will have to wait until the waiver period has
      ended before picking up any necessary position players to field a full roster.
    </Text>
  </>
);
