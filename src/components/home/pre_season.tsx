import React from 'react';
import { styled, styles, Button, ButtonGroup, Card, Heading, Text } from '@makes-apps/lib';

import { Manager, Matchup, Season, SeasonManager } from '../../types';

interface Props {
  season: Season;
  managers: Manager[];
  matchups: Matchup[];
}

const Layout = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    })
  )
);

const StyledCard = styled(Card)<{}>(
  styles(css => ({ theme }) =>
    css(
      {
        margin: theme.spacers.rems.micro,
        height: 'fit-content',
      },
      theme.mediaQueries.atLeastGiga({
        minWidth: '540px',
        width: '540px',
        maxWidth: '540px',
      }),
      theme.mediaQueries.atMostGiga({
        minWidth: '360px',
        width: '360px',
        maxWidth: '360px',
      })
    )
  )
);

const StyledCardHeader = styled.div<{}>(
  styles(css => ({ theme }) =>
    css(
      {
        marginBottom: theme.spacers.rems.base,
        display: 'flex',
      },
      theme.mediaQueries.atMostGiga({
        flexDirection: 'column',
      }),
      theme.mediaQueries.atLeastGiga({
        justifyContent: 'space-between',
      })
    )
  )
);

const SeasonInfoLayout = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      flexDirection: 'column',
    })
  )
);

const SeasonInfoRow = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    })
  )
);

const SeasonInfoCell = styled.div<{ center?: boolean; wrap?: boolean; vertical?: boolean }>(
  styles(css => ({ center, wrap, vertical }) =>
    css({
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      alignItems: center ? 'center' : 'flex-start',
      flexWrap: wrap ? 'wrap' : 'nowrap',
    })
  )
);

const StyledButtons = styled(ButtonGroup)<{}>(
  styles(css => ({ theme }) =>
    css(
      {
        width: 'fit-content',
      },
      theme.mediaQueries.atMostGiga({
        justifyContent: 'flex-start',
      }),
      theme.mediaQueries.atLeastGiga({
        justifyContent: 'flex-end',
      })
    )
  )
);

const StyledKeyValue = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <SeasonInfoCell vertical>
    <Text noMargin>{label}:&nbsp;</Text>
    <Text color="secondary" noMargin>
      {typeof value === 'number' ? `${value || 0}` : typeof value === 'boolean' ? JSON.stringify(value) : value}
    </Text>
  </SeasonInfoCell>
);

export default ({ managers, season }: Props) => {
  const hasDivisions = !!(season.divisions || []).length;
  const managersById: { [key: string]: Manager } = managers.reduce(
    (acc, mgr) => ({ ...acc, [mgr._id.toHexString()]: mgr }),
    {}
  );
  const managersByIndex: { [key: number]: SeasonManager } = season.managers.reduce(
    (acc, mgr) => ({ ...acc, [mgr.index]: mgr }),
    {}
  );
  return (
    <Layout>
      <StyledCard
        header={
          <StyledCardHeader>
            <Heading size="giga" color="primary" font="logo" noMargin>{`${season.year} Season`}</Heading>
            <StyledButtons>
              <Button as="a" href={season.yahoo_data.url} target="_blank" rel="noreferrer" variant="ghost" padding="s">
                Yahoo!
              </Button>
            </StyledButtons>
          </StyledCardHeader>
        }
      >
        <SeasonInfoLayout>
          <SeasonInfoRow>
            <SeasonInfoCell vertical>
              <SeasonInfoCell>
                <Text as="span" color="secondary" noMargin>
                  status:&nbsp;
                </Text>
                <Text color="orange" noMargin>
                  PRE-SEASON
                </Text>
              </SeasonInfoCell>
              <SeasonInfoCell>
                <Text as="span" color="secondary" noMargin>
                  drafts:&nbsp;
                </Text>
                <Text noMargin>{season.draft_date.toLocaleString()}</Text>
              </SeasonInfoCell>
            </SeasonInfoCell>
            <SeasonInfoCell vertical>
              <SeasonInfoCell>
                <Text as="span" color="secondary" noMargin>
                  starts:&nbsp;
                </Text>
                <Text noMargin>{season.start_date.toLocaleString()}</Text>
              </SeasonInfoCell>
              <SeasonInfoCell>
                <Text as="span" color="secondary" noMargin>
                  ends:&nbsp;
                </Text>
                <Text noMargin>{season.end_date.toLocaleString()}</Text>
              </SeasonInfoCell>
            </SeasonInfoCell>
          </SeasonInfoRow>
        </SeasonInfoLayout>
      </StyledCard>
      <StyledCard
        header={
          <StyledCardHeader>
            <Heading size="giga" color="primary" font="logo" noMargin>
              {hasDivisions ? 'Divisions' : 'Managers'}
            </Heading>
          </StyledCardHeader>
        }
      >
        <SeasonInfoLayout>
          {hasDivisions && (
            <SeasonInfoRow>
              {season.divisions.map(({ index, name, manager_indexes }) => (
                <SeasonInfoCell key={`${name}_${index}`} vertical>
                  <Text color="primary" weight="bold" size="deca" noMargin>
                    {name}
                  </Text>
                  {manager_indexes.map(mgrIdx => {
                    const { index, manager_id, team_name } = managersByIndex[mgrIdx];
                    const { first_name } = managersById[manager_id.toHexString()];
                    return (
                      <SeasonInfoCell key={`${team_name}_${index}`}>
                        <Text as="span" color="secondary" noMargin>
                          {index}.&nbsp;
                        </Text>
                        <Text noMargin>{`${team_name} (${first_name})`}</Text>
                      </SeasonInfoCell>
                    );
                  })}
                </SeasonInfoCell>
              ))}
            </SeasonInfoRow>
          )}
          {!hasDivisions && (
            <SeasonInfoRow>
              <SeasonInfoCell>
                {season.managers.map(({ index, manager_id, team_name }) => {
                  const { first_name } = managersById[manager_id.toHexString()];
                  return (
                    <SeasonInfoCell key={`${team_name}_${index}`}>
                      <Text as="span" color="secondary" noMargin>
                        {index}.&nbsp;
                      </Text>
                      <Text noMargin>{`${team_name} (${first_name})`}&nbsp;</Text>
                    </SeasonInfoCell>
                  );
                })}
              </SeasonInfoCell>
            </SeasonInfoRow>
          )}
        </SeasonInfoLayout>
      </StyledCard>
      <StyledCard
        header={
          <StyledCardHeader>
            <Heading size="giga" color="primary" font="logo" noMargin>
              Settings
            </Heading>
          </StyledCardHeader>
        }
      >
        <SeasonInfoLayout>
          <SeasonInfoRow>
            <StyledKeyValue label="type" value={season.settings.scoring.type} />
            <StyledKeyValue label="use negative points" value={season.settings.scoring.negative_points} />
            <StyledKeyValue label="use fractional points" value={season.settings.scoring.fraction_points} />
          </SeasonInfoRow>
          <SeasonInfoRow>
            <Text color="primary" weight="bold" size="deca" noMargin>
              Rosters
            </Text>
          </SeasonInfoRow>
          <SeasonInfoRow>
            {season.rosters.map(({ count, position }) => (
              <StyledKeyValue label={position} value={`${count}`} />
            ))}
          </SeasonInfoRow>
          <SeasonInfoRow>
            <Text color="primary" weight="bold" size="deca" noMargin>
              Scoring
            </Text>
          </SeasonInfoRow>
          <SeasonInfoRow>
            {season.scoring.map(({ name, value }) => (
              <StyledKeyValue label={name} value={`${value || 0}`} />
            ))}
          </SeasonInfoRow>
        </SeasonInfoLayout>
      </StyledCard>
    </Layout>
  );
};
