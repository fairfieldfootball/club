import React from 'react';
import { Heading, Text, Wrapping } from '@makes-apps/lib';

interface Props {
  type: string | string[];
  description: string | string[];
}

export default ({ type, description }: Props) => (
  <Wrapping limit={62}>
    <Heading as="h2" color="danger" font="logo" noMargin>
      {(typeof type === 'string' ? type : type.join(' | ')).replace(/_/g, ' ')}
    </Heading>
    <Text as="pre">{typeof description === 'string' ? description : description.join('\n')}</Text>
  </Wrapping>
);
