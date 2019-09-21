import React from 'react';

import { useHeadline, useToolbar, Heading, LayoutMenuItem } from '@makes-apps/lib';

interface Props {
  children?: React.ReactNode;
  week: number;
  year: number;
}

const HomePage = ({ children, week, year }: Props) => {
  const { setHeadline } = useHeadline();
  const { setToolbar } = useToolbar();
  React.useEffect(() => {
    setHeadline(<Heading size="mega" noMargin>{`${year} Season: Week ${week}`}</Heading>);
    setToolbar(
      <>
        <LayoutMenuItem to="/standings">standings</LayoutMenuItem>
        <LayoutMenuItem to="/matchups">matchups</LayoutMenuItem>
        <LayoutMenuItem to="/scoring">scoring</LayoutMenuItem>
      </>
    );
  }, []);
  return <>{children}</>;
};

export default HomePage;
