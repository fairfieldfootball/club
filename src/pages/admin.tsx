import React from 'react';

import connectors from '../connectors';
import { Drafts, Managers, Matchups, Seasons, Standings as StandingsView } from '../components';
import { draftsActions, managersActions, matchupsActions, seasonsActions, standingsActions } from '../store';
import { Draft, Manager, Matchup, Season, Standings } from '../types';

interface StateProps {
  activeMenuKey: string;
  drafts?: { [key: string]: Draft };
  managers?: { [key: string]: Manager };
  matchups?: { [key: string]: Matchup };
  seasons?: { [key: string]: Season };
  standings?: { [key: string]: Standings };
}

interface DispatchProps {
  deleteDraft: (_id: any) => Promise<any>;
  deleteManager: (_id: any) => Promise<any>;
  deleteMatchup: (_id: any) => Promise<any>;
  deleteSeason: (_id: any) => Promise<any>;
  deleteStandings: (_id: any) => Promise<any>;
  fetchDrafts: (query: object) => Promise<any>;
  fetchManagers: (query: object) => Promise<any>;
  fetchMatchups: (query: object) => Promise<any>;
  fetchSeasons: (query: object) => Promise<any>;
  fetchStandings: (query: object) => Promise<any>;
  saveDraft: (draft: Draft) => Promise<any>;
  saveManager: (manager: Manager) => Promise<any>;
  saveMatchup: (matchup: Matchup) => Promise<any>;
  saveSeason: (season: Season) => Promise<any>;
  saveStandings: (standings: Standings) => Promise<any>;
}

type Props = StateProps & DispatchProps;

class AdminPage extends React.Component<Props> {
  componentDidMount() {
    const { fetchDrafts, fetchManagers, /*fetchMatchups,*/ fetchSeasons, fetchStandings } = this.props;

    // pageContext.setPageInfo({
    //   menu: [
    //     { type: 'view', key: 'managers' },
    //     { type: 'view', key: 'matchups' },
    //     { type: 'view', key: 'seasons' },
    //     { type: 'view', key: 'standings' },
    //     { type: 'view', key: 'drafts' },
    //   ],
    //   activeMenuKey: 'seasons',
    // });

    Promise.all([
      fetchManagers({}),
      // fetchMatchups({}),
      fetchDrafts({}),
      fetchSeasons({}),
      fetchStandings({}),
    ]).catch(err => this.setState(() => ({ error: err })));
  }

  // componentWillUnmount() {
  //   this.props.pageContext.setPageInfo();
  // }

  render() {
    const {
      activeMenuKey,
      deleteDraft,
      deleteManager,
      deleteMatchup,
      deleteSeason,
      deleteStandings,
      drafts,
      managers,
      matchups = {},
      seasons,
      standings,
      saveDraft,
      saveManager,
      saveMatchup,
      saveSeason,
      saveStandings,
    } = this.props;

    if (!managers || !matchups || !seasons || !standings || !drafts) {
      return 'loading...';
    }

    return (
      <>
        {activeMenuKey === 'managers' && (
          <Managers managers={managers} deleteManager={deleteManager} saveManager={saveManager} />
        )}
        {activeMenuKey === 'matchups' && (
          <Matchups matchups={matchups} deleteMatchup={deleteMatchup} saveMatchup={saveMatchup} />
        )}
        {activeMenuKey === 'seasons' && (
          <Seasons seasons={seasons} deleteSeason={deleteSeason} saveSeason={saveSeason} />
        )}
        {activeMenuKey === 'standings' && (
          <StandingsView standings={standings} deleteStandings={deleteStandings} saveStandings={saveStandings} />
        )}
        {activeMenuKey === 'drafts' && <Drafts drafts={drafts} deleteDraft={deleteDraft} saveDraft={saveDraft} />}
      </>
    );
  }
}

export default connectors.withDispatchObject(
  ({ drafts, managers, matchups, seasons, standings }) => ({
    activeMenuKey: '',
    drafts: drafts.db,
    managers: managers.db,
    matchups: matchups.db,
    seasons: seasons.db,
    standings: standings.db,
  }),
  {
    deleteDraft: draftsActions.removeDraft.creator.worker,
    deleteManager: managersActions.removeManager.creator.worker,
    deleteMatchup: matchupsActions.removeMatchup.creator.worker,
    deleteSeason: seasonsActions.removeSeason.creator.worker,
    deleteStandings: standingsActions.removeStandings.creator.worker,

    fetchDrafts: draftsActions.listDrafts.creator.worker,
    fetchManagers: managersActions.listManagers.creator.worker,
    fetchMatchups: matchupsActions.listMatchups.creator.worker,
    fetchSeasons: seasonsActions.listSeasons.creator.worker,
    fetchStandings: standingsActions.listStandings.creator.worker,

    saveDraft: draftsActions.saveDraft.creator.worker,
    saveManager: managersActions.saveManager.creator.worker,
    saveMatchup: matchupsActions.saveMatchup.creator.worker,
    saveSeason: seasonsActions.saveSeason.creator.worker,
    saveStandings: standingsActions.saveStandings.creator.worker,
  }
)(AdminPage);
