import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { Blog, User } from '../../types';
import urls from '../../urls';

import List from './list';
// import New from './new';
import View from './view';
// import Edit from './edit';
import Form from './form';

interface Props extends RouteComponentProps {
  blogs: { [key: string]: Blog };
  user: User;
  listBlogs: (query: object) => Promise<any>;
  goto: (url: string) => void;
  removeBlog: (blogId: BSON.ObjectId) => Promise<any>;
  saveBlog: (blog: Blog) => Promise<any>;
}

const Router = ({ blogs, goto, match, removeBlog, saveBlog, user }: Props) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => (
          <List
            blogs={Object.values(blogs)}
            viewBlog={blog => goto(urls.blogs.view(blog._id ? blog._id.toHexString() : 'new'))}
          />
        )}
      />
      <Route
        exact
        path={`${match.url}/new`}
        render={() => (
          <Form gotoList={() => goto(urls.blogs.list)} removeBlog={removeBlog} saveBlog={saveBlog} user={user} />
        )}
      />
      <Route
        exact
        path={`${match.url}/:blogId/edit`}
        render={props => (
          <Form
            blog={blogs[props.match.params.blogId]}
            gotoList={() => goto(urls.blogs.list)}
            removeBlog={removeBlog}
            saveBlog={saveBlog}
            user={user}
          />
        )}
      />
      <Route
        path={`${match.url}/:blogId`}
        render={props => (
          <View
            {...props}
            blog={blogs[props.match.params.blogId]}
            gotoList={() => goto(urls.blogs.list)}
            removeBlog={removeBlog}
            saveBlog={saveBlog}
            user={user}
          />
        )}
      />
    </Switch>
  );
};

export default Router;
