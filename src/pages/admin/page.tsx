import React from 'react';
import { useHeadline } from '@makes-apps/lib';

interface Props {}

export default ({  }: Props) => {
  const { setHeadline } = useHeadline();

  React.useEffect(() => {
    setHeadline('only some people see this');
    return setHeadline();
  }, []);

  return <>admin page</>;
};
