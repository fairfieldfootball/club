import React from 'react';
import { styled, styles, Button, ButtonGroup, Heading, Hr, List, Markdown, Text, Wrapping } from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { Blog, User } from '../../types';
import urls from '../../urls';

interface Props {
  blog: Blog;
  gotoList: () => void;
  removeBlog: (blogId: BSON.ObjectId) => Promise<any>;
  saveBlog: (blog: Blog) => Promise<any>;
  user: User;
}

const Banner = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      padding: `${theme.spacers.rems.femto} ${theme.spacers.rems.milli}`,
      alignSelf: 'stretch',
      display: 'flex',
      justifyContent: 'space-between',
    })
  )
);

const BannerBookend = styled.div<{}>(
  styles(css => () =>
    css({
      flex: '0 1 200px',
    })
  )
);

const BannerHeadline = styled.div<{}>(
  styles(css => () =>
    css({
      flex: '1',
    })
  )
);

const Post = styled(Wrapping)<{}>(
  styles(css => () =>
    css({
      margin: '0 auto',
    })
  )
);

const renderers = {
  h1: (props: any) => <Heading {...props} color="primary" align="center" />,
  h2: (props: any) => <Heading {...props} as="h2" align="center" />,
  h3: (props: any) => <Heading {...props} as="h3" color="secondary" font="logo" noMargin />,
  h4: (props: any) => <Heading {...props} as="h4" font="logo" noMargin />,
  h5: (props: any) => <Heading {...props} as="h5" font="logo" noMargin />,
  h6: (props: any) => <Heading {...props} as="h6" font="logo" noMargin />,
  ol: List,
  ul: List,
  li: Text,
  p: Text,
};

const BlogPost = ({ blog, gotoList, removeBlog, user }: Props) => {
  const [viewAsRaw, setViewAsRaw] = React.useState(false);
  return (
    <>
      <Banner>
        <BannerBookend>
          <Text as="span">View as:&nbsp;</Text>
          <Button as="button" color="natural" variant="text" padding="none" onClick={() => setViewAsRaw(!viewAsRaw)}>
            {viewAsRaw ? 'markdown' : 'raw'}
          </Button>
        </BannerBookend>
        <BannerHeadline>
          <Heading color="primary" align="center" font="logo" noMargin>
            {blog.title}
          </Heading>
          <Text align="center" noMargin>
            {blog.author}
          </Text>
          <Text align="center" noMargin>
            {blog.date.toLocaleString()}
          </Text>
        </BannerHeadline>
        <BannerBookend>
          <ButtonGroup align="right">
            <Button
              as="Link"
              color="secondary"
              variant="text"
              padding="none"
              to={urls.blogEdit(blog._id.toHexString())}
            >
              Edit
            </Button>
            {user.type === 'me' && (
              <Button
                as="button"
                color="danger"
                variant="text"
                padding="none"
                onClick={() => {
                  removeBlog(blog._id);
                  gotoList();
                }}
              >
                Delete
              </Button>
            )}
          </ButtonGroup>
        </BannerBookend>
      </Banner>
      <Hr />
      <Post limit={75}>
        {viewAsRaw && <Text whiteSpace="pre-line">{blog.content}</Text>}
        {!viewAsRaw && <Markdown overrides={renderers}>{blog.content}</Markdown>}
        {/*!viewAsRaw && <ReactMarkdown source={blog.content} renderers={renderers} />*/}
      </Post>
    </>
  );
};

export default BlogPost;
