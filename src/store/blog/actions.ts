import appActions from '../../actions';
import { RootContext } from '../../root';
import { Blog, BlogsState } from '../../types';

const factory = appActions.app().forNamespace<BlogsState>(BlogsState.NAMESPACE);

export const {
  list: listBlogs,
  get: getBlog,
  create: createBlog,
  createBatch: createBlogs,
  update: updateBlog,
  clear: clearBlogs,
  remove: removeBlog,
} = appActions.crud<BlogsState, Blog>(factory)(dbs => dbs.blog().posts());

const blogPosts = (stitch: RootContext) =>
  stitch
    .clients()
    .db('ffc', 'blog')
    .collection<Blog>('posts');

export const saveBlog = factory
  .withType('save')
  .asThunk((blog: Blog) => (_dispatch, _getState, stitch) =>
    blog._id
      ? blogPosts(stitch)
          .findOneAndUpdate({ _id: blog._id }, blog)
          .then(res => (res ? res._id : ''))
      : blogPosts(stitch)
          .insertOne(blog)
          .then(res => res.insertedId)
  )
  .withReducer((state, action) => {
    switch (action.status) {
      case 'success':
        return {
          ...state,
          db: {
            ...state.db,
            [action.payload.toHexString()]: { _id: action.payload, ...action.meta.args[0] },
          },
        };
    }
    return state;
  });
