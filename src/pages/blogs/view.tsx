import React from 'react';
import {
  styled,
  styles,
  useHeadline,
  useToolbar,
  Button,
  ButtonGroup,
  Heading,
  Flex,
  List,
  Markdown,
  Text,
  Wrapping,
} from '@makes-apps/lib';
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

  const { setHeadline } = useHeadline();
  const { setToolbar } = useToolbar();

  React.useEffect(() => {
    setHeadline(
      <Heading color="primary" font="logo" align="center" noMargin>
        {blog.title}
      </Heading>
    );
    setToolbar(
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexGrow="1"
        padding={theme => `0 ${theme.spacers.rems.micro}`}
      >
        <Flex flexBasis="250px" alignItems="center">
          <Text as="span" noMargin>
            View as:&nbsp;
          </Text>
          <Button as="button" color="font" variant="text" padding="none" onClick={() => setViewAsRaw(!viewAsRaw)}>
            {viewAsRaw ? 'markdown' : 'raw'}
          </Button>
        </Flex>
        <Flex direction="column" alignItems="center" flexGrow="1">
          <Text noMargin>{blog.author}</Text>
          <Text noMargin>{blog.date.toLocaleString()}</Text>
        </Flex>
        <Flex flexBasis="250px">
          <ButtonGroup align="right">
            <Button
              as="Link"
              color="secondary"
              variant="text"
              padding="none"
              to={urls.blogs.edit(blog._id.toHexString())}
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
        </Flex>
      </Flex>
    );
    return () => {
      setHeadline();
      setToolbar(null); // TODO: make element optional
    };
  }, [viewAsRaw]);

  return (
    <Post limit={75}>
      {viewAsRaw && <Text whiteSpace="pre-line">{blog.content}</Text>}
      {!viewAsRaw && <Markdown overrides={renderers}>{blog.content}</Markdown>}
    </Post>
  );
};

export default BlogPost;
