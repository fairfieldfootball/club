import React from 'react';
import { useHeadline } from '@makes-apps/lib';

interface Props {}

export default ({  }: Props) => {
  const { setHeadline } = useHeadline();

  React.useEffect(() => {
    setHeadline('only i get to see this');
    return setHeadline();
  }, []);

  return <>me page</>;
};
