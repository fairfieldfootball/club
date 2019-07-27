import React from 'react';
import { Text, Wrapping } from '@makes-apps/lib';

export default () => (
  <Wrapping limit={62}>
    <Text size="mega">
      You navigated to this page without a valid code present in the url. It may be missing or not formatted properly.
    </Text>
  </Wrapping>
);
