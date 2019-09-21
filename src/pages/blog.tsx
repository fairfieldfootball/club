import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { RouterActions } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import connectors from '../connectors';
import { BlogForm, BlogList, BlogView } from '../components';
import { blogsActions } from '../store';
import { Blog, User } from '../types';
import urls from '../urls';

interface StateProps {
  blogs?: { [key: string]: Blog };
  user?: User;
}

interface DispatchProps {
  listBlogs: (query: object) => Promise<any>;
  goto: (url: string) => void;
  removeBlog: (blogId: BSON.ObjectId) => Promise<any>;
  saveBlog: (blog: Blog) => Promise<any>;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class BlogPage extends React.Component<Props> {
  componentDidMount() {
    const { listBlogs } = this.props;

    // pageContext.setPageInfo({ menu: [{ type: 'link', key: urls.blogView('new'), display: 'New Post' }] });

    listBlogs({});
  }

  // componentWillUnmount() {
  //   this.props.pageContext.setPageInfo();
  // }

  render() {
    const { blogs, goto, match, removeBlog, saveBlog, user } = this.props;

    if (!user || !blogs) {
      return 'loading...';
    }

    return (
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          render={() => (
            <BlogList
              blogs={Object.values(blogs)}
              viewBlog={blog => goto(urls.blogView(blog._id ? blog._id.toHexString() : 'new'))}
            />
          )}
        />
        <Route
          exact
          path={`${match.url}/new`}
          render={() => (
            <BlogForm gotoList={() => goto(urls.blog)} removeBlog={removeBlog} saveBlog={saveBlog} user={user} />
          )}
        />
        <Route
          path={`${match.url}/:blogId`}
          render={props => (
            <BlogView
              {...props}
              blog={blogs[props.match.params.blogId]}
              gotoList={() => goto(urls.blog)}
              removeBlog={removeBlog}
              saveBlog={saveBlog}
              user={user}
            />
          )}
        />
      </Switch>
    );
  }
}

export default connectors.withDispatchObject(
  ({ auth, blog }) => ({
    blogs: blog.db,
    user: auth.user,
  }),
  {
    listBlogs: blogsActions.listBlogs.creator.worker,
    goto: RouterActions.goto.creator.worker,
    removeBlog: blogsActions.removeBlog.creator.worker,
    saveBlog: blogsActions.saveBlog.creator.worker,
  }
)(BlogPage);
