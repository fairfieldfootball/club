import React from 'react';

import connectors from '../connectors';

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps;

class ProfilePage extends React.Component<Props> {
  render() {
    return 'profile page';
  }
}

export default connectors.withDispatchObject(() => ({}), {})(ProfilePage);
