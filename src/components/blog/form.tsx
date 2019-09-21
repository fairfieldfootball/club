import React from 'react';
import {
  styled,
  styles,
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormDatePicker,
  FormGroup,
  FormInput,
  FormLabel,
  FormSelect,
} from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { Blog, BlogType, User } from '../../types';
import urls from '../../urls';

interface Props {
  blog?: Blog;
  gotoList: () => void;
  removeBlog: (blogId: BSON.ObjectId) => Promise<any>;
  saveBlog: (blog: Blog) => Promise<any>;
  user: User;
}

interface FormData extends Blog {}

const initialForm = ({ blog, user }: Props): FormData =>
  blog ? { ...blog } : { date: new Date(), author: user.email, type: '' as BlogType, title: '', content: '' };

const Layout = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      padding: `${theme.spacers.rems.femto} ${theme.spacers.rems.milli}`,
      alignSelf: 'stretch',
      display: 'flex',
      justifyContent: 'space-between',
    })
  )
);

const LayoutBookend = styled.div<{}>(
  styles(css => () =>
    css({
      flex: '0 1 200px',
    })
  )
);

const FormContainer = styled.div<{}>(
  styles(css => () =>
    css({
      flex: '1',
    })
  )
);

const isEditable = (user: User, author: string) => user.type === 'me' || author === user.email;

const BlogForm = (props: Props) => (
  <Layout>
    <LayoutBookend>
      <ButtonGroup align="left">
        <Button
          as="Link"
          color="font"
          variant="text"
          padding="none"
          to={props.blog ? urls.blogView(props.blog._id.toHexString()) : urls.blog}
        >
          Back
        </Button>
      </ButtonGroup>
    </LayoutBookend>
    <FormContainer>
      <Form
        initialForm={initialForm(props)}
        footer={{ primary: { label: props.blog ? 'Update' : 'Create' } }}
        onSubmit={({ data }) =>
          props.saveBlog(data).then(res => urls.blogView((props.blog ? props.blog._id : res).toHexString()))
        }
        validation={{
          type: {
            isValid: (value?: BlogType) => {
              if (!value) {
                return { type: 'danger' as 'danger', message: 'must specify a blog type' };
              }
              return;
            },
          },
          title: {
            isValid: (value?: string) => {
              if (!value) {
                return { type: 'danger' as 'danger', message: 'must include a blog title' };
              }
              return;
            },
          },
          content: {
            isValid: (value?: string) => {
              if (!value) {
                return { type: 'danger' as 'danger', message: 'must include blog content' };
              }
              return;
            },
          },
        }}
      >
        {({ data, setFormField }: any) => (
          <>
            <FormGroup inline>
              <FormControl>
                <FormLabel>id</FormLabel>
                <FormInput disabled value={data._id} />
              </FormControl>
              <FormControl>
                <FormLabel>author</FormLabel>
                <FormInput
                  disabled={props.user.type !== 'me'}
                  value={data.author}
                  onChange={e => setFormField('author', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>date</FormLabel>
                <FormDatePicker
                  disabled={!isEditable(props.user, data.author)}
                  defaultValue=""
                  enableTime
                  value={data.date}
                  onChange={([value]) => setFormField('date', value)}
                />
              </FormControl>
            </FormGroup>
            <FormGroup inline>
              <FormControl size="l">
                <FormLabel>type</FormLabel>
                <FormSelect
                  disabled={!isEditable(props.user, data.author)}
                  name="type"
                  options={[{ label: 'rant', value: 'rant' }, { label: 'recap', value: 'recap' }]}
                  placeholder="Select a Type"
                  value={data.type}
                  onChange={e => setFormField('type', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>title</FormLabel>
                <FormInput
                  disabled={!isEditable(props.user, data.author)}
                  value={data.title}
                  onChange={e => setFormField('title', e.target.value)}
                />
              </FormControl>
            </FormGroup>
            <FormControl>
              <FormLabel>content</FormLabel>
              <FormInput
                as="textarea"
                rows="20"
                disabled={!isEditable(props.user, data.author)}
                value={data.content}
                onChange={e => setFormField('content', e.target.value)}
              />
            </FormControl>
          </>
        )}
      </Form>
    </FormContainer>
    <LayoutBookend>
      <ButtonGroup align="right">
        {props.user.type === 'me' && props.blog && (
          <Button
            as="button"
            color="danger"
            variant="text"
            padding="none"
            onClick={() => {
              props.removeBlog(props.blog!._id); // not sure why this ! is needed
              props.gotoList();
            }}
          >
            Delete
          </Button>
        )}
      </ButtonGroup>
    </LayoutBookend>
  </Layout>
);

export default BlogForm;
