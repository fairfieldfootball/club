import React from 'react';
import { styled, styles, Button, StackedPageContext, Text } from '@makes-apps/lib';

import urls from '../urls';

interface Props {
  pageContext: StackedPageContext;
}

const PillContainer = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    })
  )
);

const StyledPill = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      width: '400px',
      margin: theme.spacers.rems.base,
      padding: theme.spacers.rems.base,
      display: 'flex',
      alignItems: 'center',
      border: `${theme.spacers.pixels.yocto} solid ${theme.colors.secondary[5]}`,
      a: {
        width: '100px',
        textAlign: 'center',
        margin: theme.spacers.rems.micro,
      },
    })
  )
);

interface PillProps {
  action: string;
  description: string;
  to: string;
}

const Pill = ({ action, description, to }: PillProps) => (
  <StyledPill>
    <Button as="a" href={to} rel="noreferrer" variant="text" padding="s">
      {action}
    </Button>
    <Text color="secondary" noMargin>
      {description}
    </Text>
  </StyledPill>
);

const PageHeading = () => (
  <Text size="hecto" noMargin>
    a{' '}
    <Button
      as="a"
      variant="text"
      padding="none"
      size="hecto"
      href="https://football.fantasysports.yahoo.com/league/myfg"
      target="_blank"
      rel="noreferrer"
    >
      fantasy football league
    </Button>{' '}
    since 2013.
  </Text>
);

export default ({ pageContext }: Props) => {
  React.useEffect(() => {
    pageContext.setPageInfo({ byline: <PageHeading /> });
    return () => pageContext.setPageInfo();
  });

  return (
    <PillContainer>
      <Pill
        action="View the Archive"
        description="Look at past season's results, records, and stuff."
        to={urls.archive.home}
      />
      <Pill
        action="Browse the Blog"
        description="Find things that have been written about the league."
        to={urls.blog}
      />
      <Pill
        action="Open the Constitution"
        description="Read about the structure and rules of the league."
        to={urls.constitution}
      />
      <Pill
        action="View the League"
        description="Look at the current seasons results, matchups, and stuff."
        to={urls.home}
      />
    </PillContainer>
  );
};
