import React from 'react';
import { Heading, Subheading, Text } from '@makes-apps/lib';

export default () => (
  <>
    <Heading as="h2" align="center">Roster Moves</Heading>
    <Subheading as="h3" color="secondary" font="logo">
      Add/Drop Players
    </Subheading>
    <Text>
      Any player dropped from a team will immediately be placed on Waivers in accordance with the League's settings
    </Text>
    <Text>
      The League will utilize Yahoo! Sport's proprietary "Can't Cut" list. Any player that remains on this list can be
      considered undroppable
    </Text>
    <Text>
      Any player may be added from the Free Agent/Waiver pool so long as this move does not put a team over the{' '}
      <Text as="span" decoration="line-through" noMargin>
        16
      </Text>{' '}
      15 player limit
    </Text>
    <Subheading as="h3" color="secondary" font="logo">
      Waivers
    </Subheading>
    <Text>The Waiver period will be from Game Time to Tuesday</Text>
    <Text>
      Game Time means that all unowned players will be placed on waivers at the scheduled start time of their game. In
      Game Time waivers, players on a bye week will be placed on waivers Monday night at 8:30pm EST
    </Text>
    <Text>Tuesday means that the claim period ends at 2:59 AM EST on Wednesday morning</Text>
    <Text decoration="line-through" noMargin>
      Once the claim period ends, every team's waiver claims will be executed on a priority basis. If two teams have a
      waiver claim on the same player, the team with a higher priority will receive said player
    </Text>
    <Text color="neutral" weight="bold" noMargin>
      UPDATED: August 16, 2016
    </Text>
    <Text>
      The League now utilizes a Free Agent Auction Budget system for waiver claims. Teams now place bids on Waiver
      eligible players and claims are processed to the team with the highest bid per player. Each team starts with $100
      in FAAB
    </Text>
    <Text noMargin>
      Waiver priority initially begins as the reverse of the draft order.{' '}
      <Text as="span" decoration="line-through" noMargin>
        Once a team has a waiver claim processed successfully
      </Text>
      , they immediately drop to the bottom of the waiver priority list
    </Text>
    <Text color="neutral" weight="bold" noMargin>
      UPDATED: August 16, 2016
    </Text>
    <Text>Once a team wins a waiver bid in an amount equal to another team's waiver bid on the same player</Text>
    <Subheading as="h3" color="secondary" font="logo">
      Trades
    </Subheading>
    <Text>Active league managers have 2 days to protest any pending league trades</Text>
    <Text>
      A minimum of 1/3 of the league needs to protest a trade for it to be vetoed (in a 14 team league, this means a
      minimum of 5 votes)
    </Text>
    <Text>
      Trades will never be pushed through if they are accepted with less than 2 days before a given week's games are
      scheduled to begin
    </Text>
    <Text>
      If a trade is overturned, the franchises involved in the trade have the right to request a roll call of who voted
      against the trade. Those franchises that voted against the trade will then be required to state the reasoning
      behind their vote within two days. The SB will then deliberate and vote on the final outcome of this trade
    </Text>
    <Text>
      This process also must be allowed two full days. The SB then must make a best effort to produce a ruling on the
      trade's outcome as quickly as possible to avoid any team receiving points from players that are not rightfully
      theirs
    </Text>
    <Text>
      Any incidental points received from illegally owned players must count as is until the SB is able to determine a
      more fair process
    </Text>
    <Subheading as="h3" color="secondary" font="logo">
      Trading Draft Picks
    </Subheading>
    <Text>Offseason trades invlving draft picks are allowed as long as they are considered "equal value"</Text>
    <Text>
      "Equal value" amongst draft picks invovles trading any number of pairs of draft picks between managers that does
      not result in a net gain for either side
    </Text>
    <Text>
      In a 14 team league, an "equal value" trade between managers with the first and last picks would be sending the
      1st and 28th overall draft selections for the 14th and 15th overall draft selections. In this case, the two draft
      picks sum up to the same number, so they are "equal value"
    </Text>
    <Text>
      The execution of this trade will proceed as follows. At the time of each manager's newly acquired pick, they must
      simply instruct the other manager whot to select out of the player pool. The palyers are then traded between the
      teams following the compmletion of the Draft but prior to the start of the first scheduled game in Week 1
    </Text>
    <Text>
      Once a deal is reached between the Managers, it must be announced to the Commish prior to the completion of the
      first of the draft picks involved for it to be official. Once official, the Commis retains the right to manually
      force the trade should either of the involved parties get "cold feet"
    </Text>
  </>
);
