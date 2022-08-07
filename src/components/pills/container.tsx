import React from 'react';

import { Flex } from '@makes-apps/lib';

interface Props {
  children?: React.ReactNode;
}

const Pill = ({ children }: Props) => (
  <Flex wrap="wrap" justifyContent="center">
    {children}
  </Flex>
);

export default Pill;
