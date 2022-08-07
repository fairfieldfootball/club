import React from 'react';
import { useHeadline } from '@makes-apps/lib';

interface Props {}

export default ({  }: Props) => {
  const { setHeadline } = useHeadline();

  React.useEffect(() => {
    setHeadline('user profile');
    return setHeadline();
  }, []);

  return <>profile page</>;
};
