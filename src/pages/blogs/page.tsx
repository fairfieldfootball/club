import React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouterActions } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import connectors from '../../connectors';
import { blogsActions, usersActions } from '../../store';
import { Blog, User } from '../../types';

import Router from './router';

interface StateProps {
  blogs?: { [key: string]: Blog };
  users?: { [key: string]: User };
  userEmail?: string;
}

interface DispatchProps {
  listBlogs: (query: object) => Promise<any>;
  listUsers: (query: object) => Promise<any>;
  goto: (url: string) => void;
  removeBlog: (blogId: BSON.ObjectId) => Promise<any>;
  saveBlog: (blog: Blog) => Promise<any>;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class BlogPage extends React.Component<Props> {
  componentDidMount() {
    const { listBlogs, listUsers } = this.props;

    // pageContext.setPageInfo({ menu: [{ type: 'link', key: urls.blogView('new'), display: 'New Post' }] });

    Promise.all([listBlogs({}), listUsers({})]);
  }

  // componentWillUnmount() {
  //   this.props.pageContext.setPageInfo();
  // }

  render() {
    const { blogs, userEmail, users = {}, ...rest } = this.props;
    if (!userEmail || !blogs || !users) {
      return 'loading...';
    }

    const user = Object.values(users).find(({ email }) => email === userEmail);

    if (!user) {
      return 'error locating user information.  please try again';
    }

    return <Router {...rest} blogs={blogs} user={user} />;
  }
}

export default connectors.withDispatchObject(
  ({ auth, blog, users }) => ({
    blogs: blog.db,
    users: users.db,
    userEmail: auth.userEmail,
  }),
  {
    listBlogs: blogsActions.listBlogs.creator.worker,
    listUsers: usersActions.listUsers.creator.worker,
    goto: RouterActions.goto.creator.worker,
    removeBlog: blogsActions.removeBlog.creator.worker,
    saveBlog: blogsActions.saveBlog.creator.worker,
  }
)(BlogPage);
