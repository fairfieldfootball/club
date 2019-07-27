import React from 'react';
import { styled, styles, Wrapping } from '@makes-apps/lib';

import connectors from '../connectors';
import {
  ConstitutionBanner,
  ConstitutionPreamble,
  ConstitutionFoundingManagers,
  ConstitutionGoverningBody,
  ConstitutionLeagueMembers,
  ConstitutionLeagueSetup,
  ConstitutionDraftProcess,
  ConstitutionRosterMoves,
  ConstitutionRegularSeason,
  ConstitutionPlayoffs,
  ConstitutionPayouts,
  ConstitutionDisgracefulPunishment,
  ConstitutionAmendments,
} from '../components';

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps;

const Layout = styled(Wrapping)<{}>(
  styles(css => () =>
    css({
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
    })
  )
);

class ConstitutionPage extends React.Component<Props> {
  render() {
    return (
      <Layout limit={75}>
        <ConstitutionBanner />
        <ConstitutionPreamble />
        <ConstitutionFoundingManagers />
        <ConstitutionGoverningBody />
        <ConstitutionLeagueMembers />
        <ConstitutionLeagueSetup />
        <ConstitutionDraftProcess />
        <ConstitutionRosterMoves />
        <ConstitutionRegularSeason />
        <ConstitutionPlayoffs />
        <ConstitutionPayouts />
        <ConstitutionDisgracefulPunishment />
        <ConstitutionAmendments />
      </Layout>
    );
  }
}

export default connectors.withDispatchObject(() => ({}), {})(ConstitutionPage);
