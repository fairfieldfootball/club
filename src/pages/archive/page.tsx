import React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouterActions } from '@makes-apps/lib';

import connectors from '../../connectors';
import { draftsActions, managersActions, seasonsActions, usersActions } from '../../store';
import { Draft, Manager, Season, User } from '../../types';

import Router from './router';

interface StateProps {
  drafts?: { [key: string]: Draft };
  managers?: { [key: string]: Manager };
  seasons?: { [key: string]: Season };
  users?: { [key: string]: User };
}

interface DispatchProps {
  goto: (url: string) => void;
  listDrafts: (query: object) => Promise<any>;
  removeDraft: (draftId: any) => Promise<any>;
  saveDraft: (draft: Draft) => Promise<any>;
  listManagers: (query: object) => Promise<any>;
  removeManager: (managerId: any) => Promise<any>;
  saveManager: (manager: Manager) => Promise<any>;
  listSeasons: (query: object) => Promise<any>;
  removeSeason: (seasonId: any) => Promise<any>;
  saveSeason: (season: Season) => Promise<any>;
  listUsers: (query: object) => Promise<any>;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class ArchivePage extends React.Component<Props> {
  componentDidMount() {
    const { listDrafts, listManagers, listSeasons, listUsers } = this.props;
    Promise.all([listDrafts({}), listManagers({}), listSeasons({}), listUsers({})]);
  }

  render() {
    const { drafts, managers, seasons, users, ...rest } = this.props;

    if (!drafts || !managers || !seasons || !users) {
      return <>loading...</>;
    }

    return <Router {...rest} drafts={drafts} managers={managers} seasons={seasons} users={users} />;
  }
}

export default connectors.withDispatchObject(
  ({ drafts, managers, seasons, users }) => ({
    drafts: drafts.db,
    managers: managers.db,
    seasons: seasons.db,
    users: users.db,
  }),
  {
    goto: RouterActions.goto.creator.worker,
    listDrafts: draftsActions.listDrafts.creator.worker,
    removeDraft: draftsActions.removeDraft.creator.worker,
    saveDraft: draftsActions.saveDraft.creator.worker,
    listManagers: managersActions.listManagers.creator.worker,
    removeManager: managersActions.removeManager.creator.worker,
    saveManager: managersActions.saveManager.creator.worker,
    listSeasons: seasonsActions.listSeasons.creator.worker,
    removeSeason: seasonsActions.removeSeason.creator.worker,
    saveSeason: seasonsActions.saveSeason.creator.worker,
    listUsers: usersActions.listUsers.creator.worker,
  }
)(ArchivePage);
