import { RootContext } from './root';
import { Blog, Draft, Franchise, Manager, Matchup, Season, Standings, User } from './types';

export default (stitch: RootContext) => {
  return {
    app: () => {
      const db = stitch.clients().db('ffc', 'app');
      return {
        drafts: () => db.collection<Draft>('drafts'),
        franchises: () => db.collection<Franchise>('franchises'),
        managers: () => db.collection<Manager>('managers'),
        matchups: () => db.collection<Matchup>('matchups'),
        seasons: () => db.collection<Season>('seasons'),
        standings: () => db.collection<Standings>('standings'),
      };
    },
    auth: () => {
      const db = stitch.clients().db('ffc', 'auth');
      return {
        users: () => db.collection<User>('users'),
      };
    },
    blog: () => {
      const db = stitch.clients().db('ffc', 'blog');
      return {
        posts: () => db.collection<Blog>('posts'),
      };
    },
  };
};
