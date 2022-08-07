import React from 'react';
import { styled, styles, Button, Text } from '@makes-apps/lib';

const StyledPill = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      width: '400px',
      margin: theme.spacers.rems.base,
      padding: theme.spacers.rems.base,
      display: 'flex',
      alignItems: 'center',
      border: `${theme.spacers.pixels.yocto} solid ${
        theme.colors.secondary[theme.mode === 'light' ? 'dark' : 'light'][5]
      }`,
      a: {
        width: '100px',
        textAlign: 'center',
        margin: theme.spacers.rems.micro,
      },
    })
  )
);

interface Props {
  action: string;
  description: string;
  to: string;
}

const Pill = ({ action, description, to }: Props) => (
  <StyledPill>
    <Button as="a" href={to} rel="noreferrer" variant="text" padding="s">
      {action}
    </Button>
    <Text color="secondary" noMargin>
      {description}
    </Text>
  </StyledPill>
);

export default Pill;
