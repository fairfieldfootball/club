import React from 'react';
import { styled, styles, Heading, Subheading } from '@makes-apps/lib';

const Banner = styled.div<{}>(styles(css => () => css({})));

export default () => (
  <Banner>
    <Heading color="primary" font="logo" align="center" noMargin>
      Fairfield&nbsp;Football&nbsp;Club: A&nbsp;League&nbsp;Constitution
    </Heading>
    <Subheading as="h6" color="secondary" font="logo" align="center" noMargin>
      Created on Thursday, the Twenty-Fifth of July in God's Year of Two Thousand and Thirteen
    </Subheading>
  </Banner>
);
