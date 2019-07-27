import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { Blog, User } from '../../types';

import BlogForm from './form';
import BlogPost from './post';

interface Props extends RouteComponentProps {
  blog: Blog;
  gotoList: () => void;
  removeBlog: (blogId: BSON.ObjectId) => Promise<any>;
  saveBlog: (blog: Blog) => Promise<any>;
  user: User;
}

const BlogView = ({ blog, gotoList, match, removeBlog, saveBlog, user }: Props) => {
  return (
    <>
      <Switch>
        <Route
          exact
          path={match.url}
          render={() => (
            <BlogPost blog={blog} gotoList={gotoList} removeBlog={removeBlog} saveBlog={saveBlog} user={user} />
          )}
        />
        <Route
          exact
          path={`${match.url}/edit`}
          render={() => (
            <BlogForm blog={blog} gotoList={gotoList} removeBlog={removeBlog} saveBlog={saveBlog} user={user} />
          )}
        />
      </Switch>
    </>
  );
};

export default BlogView;
