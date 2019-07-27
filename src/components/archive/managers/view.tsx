import React from 'react';

import { Manager } from '../../../types';

interface Props {
  manager?: Manager;
}

const View = ({ manager }: Props) => {
  if (!manager) {
    return <>manager not found</>;
  }
  return <>manager view component here</>;
};

export default View;
