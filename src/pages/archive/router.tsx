import React from 'react';
import { RouteComponentProps } from 'react-router';

import { Draft, Manager, Season, User } from '../../types';

interface Props extends RouteComponentProps {
  drafts: { [key: string]: Draft };
  managers: { [key: string]: Manager };
  seasons: { [key: string]: Season };
  users: { [key: string]: User };
}

const Router = ({  }: Props) => {
  return <>archive page</>;
};

export default Router;
