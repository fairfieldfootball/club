import React from 'react';
import { Heading, Subheading, Text } from '@makes-apps/lib';

export default () => (
  <>
    <Heading as="h2" align="center">League Setup</Heading>
    <Subheading as="h3" color="secondary" font="logo">
      League Fees
    </Subheading>
    <Text>
      League fees will equal the entry fee for each manager. Currently there are no league setup fees due to the use of
      a paid 3rd party vendor.
    </Text>
    <Text as="span" decoration="line-through" noMargin>
      The entry fee, which constitues each manager's contributions to the League's prize pool, is $50.
    </Text>
    <Text color="neutral" weight="bold" noMargin>
      UPDATED: August 12, 2015
    </Text>
    <Text>The entry fee is now set at $125.</Text>
    <Text noMargin>
      League fees will be due by 11:59 PM on the Sunday prior to Week 1's first scheduled game. This means money must
      reach the Commish by this time either in person or via PayPal.{' '}
      <Text as="span" decoration="line-through" noMargin>
        The Commish has no interest in signing up for Venmo at this time.
      </Text>
    </Text>
    <Text color="neutral" weight="bold" noMargin>
      UPDATED: June 2014
    </Text>
    <Text>The Commish signed up for Venmo :eyeroll:</Text>
    <Text>
      As noted before, failure to pay league fees will result in deliberation of the SB to determine if banning is
      appropriate.
    </Text>
    <Subheading as="h3" color="secondary" font="logo">
      Rosters
    </Subheading>
    <Text noMargin>
      <Text as="span" decoration="line-through" noMargin>
        Each team roster will be comprised of 16 players.
      </Text>{' '}
      At a minimum, a team must field an active QB,{' '}
      <Text as="span" decoration="line-through" noMargin>
        2 RBs, 2 WRs, 1 TE, 1 Flex player
      </Text>{' '}
      (which is defined as a RB, WR, or a TE), 1 K, and 1 D/ST.
    </Text>
    <Text color="neutral" weight="bold" noMargin>
      UPDATED: August 13, 2015
    </Text>
    <Text noMargin>Bench sizes have decreased from 7 to 6 resulting in a roster size of 15 total players</Text>
    <Text color="neutral" weight="bold" noMargin>
      UPDATED: August 31, 2017
    </Text>
    <Text>Instead of 2 RBs, 2 WRs, 1 TE & 1 Flex player; the league mandates 1 RB, 1 WR, 1 TE & 3 Flex players</Text>
    <Text>
      Should a manager neglect these rules, the SB will deliberate whether or not these actions were inentional with
      premeditated malic towards blemishing the Integrity of the League.
    </Text>
    <Text>A banning may be a suitable punishment in this instance. You dick.</Text>
    <Subheading as="h3" color="secondary" font="logo">
      Scoring
    </Subheading>
    <Text>
      Specific points per football play are defined on the League's home page under the "Scoring and Settings" section
    </Text>
    <Text>Negative points and decimal points will be implemented</Text>
    <Text>This is not a points per reception league nor do encourage the use of bonus points</Text>
    <Text>
      The League will adhere to any and all stat corrections deemed appropriate by Yahoo! Fantasy Football, in addition
      to any of the matchup result repercussions that may occur afterwards
    </Text>
    <Text>
      The SB can also choose to implement stat corrections based on majority vote. The Commish will in turn edit the
      matchup results where appropriate based on the advice provided by the SB.
    </Text>
    <Subheading as="h3" color="secondary" font="logo">
      Divisions
    </Subheading>
    <Text>There will be two 7-team divisions: Cudderfeesh & Vaneera Paste</Text>
    <Text>
      Teams will be placed into divisions based on their draft order of the current season. All odd numbered draft picks
      in Round 1 will be placed in Cudderfeesh and all even numbered draft picks in Round 1 will be placed in Vaneera
      Paste.
    </Text>
    <Text>
      The teams that win their respective divisions will subsequently be guaranteed one of the top two seeds for the
      postseason
    </Text>
    <Text>
      The win-loss records, in addition to Yahoo! Fantasy Sports' default tiebreaking rules, will determine the rest of
      the relative seeding.
    </Text>
    <Text>
      The divisions become irrelevant when deciding the 4 additional wild card spots in the postseason. Simply the next
      4 best teams will be competing for the Championship.
    </Text>
  </>
);
