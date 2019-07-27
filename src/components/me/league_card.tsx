import React from 'react';
import { styled, styles, Button, Card, CardHeader, CardFooter, Heading, Subheading, Text } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import {
  Manager,
  Season,
  YahooLeagueMeta,
  YahooLeagueScoreboard,
  YahooLeagueSettings,
  YahooLeagueStandings,
} from '../../types';

import { newSeason } from './utils';

interface Props {
  managers?: { [key: string]: Manager };
  season?: Season;
  saveSeason: (season: Season) => Promise<any>;
  yahooMeta: YahooLeagueMeta;
  yahooScoreboard: YahooLeagueScoreboard;
  yahooSettings: YahooLeagueSettings;
  yahooStandings: YahooLeagueStandings;
}

const managerName = (managers: { [key: string]: Manager }, managerId: BSON.ObjectId) => {
  const manager = managers[managerId];
  return manager ? manager.first_name : managerId;
};

const header = ({ season }: Props) => (
  <CardHeader>
    <Heading as="h2" color="primary" noMargin>
      {season ? `${season.year} season` : `no season available`}
    </Heading>
  </CardHeader>
);

const ChildrenContainer = styled.div<{}>(
  styles(css => () =>
    css({
      maxHeight: '400px',
      maxWidth: '400px',
      overflow: 'auto',
    })
  )
);

const MismatchedText = styled(Text)<{ mismatched: boolean }>(
  styles(css => ({ theme, mismatched }) =>
    mismatched &&
    css({
      border: `${theme.spacers.pixels.yocto} solid ${theme.colors.danger[5]}`,
    })
  )
);

const ChildrenText = ({
  data,
  label,
  mismatcher = (o, y) => o !== y,
  noMargin,
}: {
  label: string;
  data: { own: any; yahoo: any };
  mismatcher?: (o: any, y: any) => boolean;
  noMargin?: boolean;
}) => {
  const mismatched = mismatcher(data.own, data.yahoo);
  return (
    <MismatchedText mismatched={mismatched} noMargin={noMargin}>
      {label}:&nbsp;{data.own}&nbsp;
      {mismatched && `(yahoo: ${data.yahoo})`}
    </MismatchedText>
  );
};

const children = ({ managers = {}, season, yahooMeta }: Props) => {
  if (!season) {
    return <Text as="pre">no season data available yet</Text>;
  }

  return (
    <ChildrenContainer>
      <Subheading as="h3" color="secondary" font="logo">
        yahoo data
      </Subheading>
      <ChildrenText label="id" data={{ own: season.yahoo_data.id, yahoo: yahooMeta.league_id }} noMargin />
      <ChildrenText label="key" data={{ own: season.yahoo_data.key, yahoo: yahooMeta.league_key }} noMargin />
      <ChildrenText label="url" data={{ own: season.yahoo_data.url, yahoo: yahooMeta.url }} />
      <Subheading as="h3" color="secondary" font="logo">
        league data
      </Subheading>
      <Text noMargin>{`id: ${season._id}`}</Text>
      <Text noMargin>{`commissioner: ${managerName(managers, season.commissioner)}`}</Text>
      <Text noMargin>{`start date: ${season.start_date.toLocaleString()}`}</Text>
      <Text noMargin>{`end date: ${season.end_date.toLocaleString()}`}</Text>
      <Text>{`recent week: ${season.recent_week}`}</Text>
      <Subheading as="h3" color="secondary" font="logo">
        divisions
      </Subheading>
      {season.divisions.map(division => (
        <>
          <Subheading as="h4">{division.name}</Subheading>
          {division.manager_indexes.map((managerIndex, i) => {
            const manager = season.managers.find(manager => manager.index === managerIndex);
            return (
              <Text noMargin={i !== division.manager_indexes.length - 1}>
                {`${managerIndex}. ${
                  manager ? `${manager.team_name} (${managers[manager.manager_id].first_name})` : 'not found'
                }`}
              </Text>
            );
          })}
        </>
      ))}
      <Subheading as="h3" color="secondary" font="logo">
        settings
      </Subheading>
      <Subheading as="h4">scoring</Subheading>
      <Text noMargin>{`type: ${season.settings.scoring.type}`}</Text>
      <Text noMargin>{`fraction points: ${season.settings.scoring.fraction_points}`}</Text>
      <Text>{`negative points: ${season.settings.scoring.negative_points}`}</Text>
      <Subheading as="h4">draft</Subheading>
      <Text noMargin>{`type: ${season.settings.draft.type}`}</Text>
      <Text noMargin>{`auction: ${season.settings.draft.auction}`}</Text>
      <Text>{`pick time: ${season.settings.draft.pick_time}`}</Text>
      <Subheading as="h4">waiver</Subheading>
      <Text noMargin>{`type: ${season.settings.waivers.type}`}</Text>
      <Text noMargin>{`rule: ${season.settings.waivers.rule}`}</Text>
      <Text noMargin>{`time: ${season.settings.waivers.time}`}</Text>
      <Text>{`faab: ${season.settings.waivers.faab}`}</Text>
      <Subheading as="h4">trade</Subheading>
      <Text noMargin>{`deadline: ${season.settings.trade.deadline.toLocaleString()}`}</Text>
      <Text noMargin>{`ratify type: ${season.settings.trade.ratify_type}`}</Text>
      <Text noMargin>{`reject time: ${season.settings.trade.reject_time}`}</Text>
      <Text>{`draft picks: ${season.settings.trade.draft_picks}`}</Text>
      <Subheading as="h4">players</Subheading>
      <Text noMargin>{`pool: ${season.settings.players.pool}`}</Text>
      <Text noMargin>{`cant cut list: ${season.settings.players.cant_cut_list}`}</Text>
      <Text>{`post-draft: ${season.settings.players.post_draft}`}</Text>
      <Subheading as="h4">playoffs</Subheading>
      <Text noMargin>{`start week: ${season.settings.playoffs.start_week}`}</Text>
      <Text noMargin>{`size: ${season.settings.playoffs.size}`}</Text>
      <Text noMargin>{`consolation size: ${season.settings.playoffs.consolation_size}`}</Text>
      <Text noMargin>{`reseed: ${season.settings.playoffs.reseed}`}</Text>
      <Text>{`lock eliminated teams: ${season.settings.playoffs.lock_eliminated_teams}`}</Text>
    </ChildrenContainer>
  );
};

const footer = ({ saveSeason, season, yahooMeta, yahooSettings, yahooStandings }: Props) => (
  <CardFooter align="right">
    {!season && (
      <Button as="button" onClick={() => saveSeason(newSeason(yahooMeta, yahooSettings, yahooStandings))}>
        save season
      </Button>
    )}
  </CardFooter>
);

export default (props: Props) => {
  return (
    <Card header={header(props)} footer={footer(props)}>
      {children(props)}
    </Card>
  );
};
