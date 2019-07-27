import React from 'react';
import {
  styled,
  styles,
  Button,
  ButtonGroup,
  DataTable,
  Form,
  FormControl,
  FormInput,
  FormLabel,
} from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { Draft } from '../../types';

interface Props {
  drafts: { [key: string]: Draft };
  deleteDraft: (draftId: any) => Promise<any>;
  saveDraft: (draft: Draft) => Promise<any>;
}

const Layout = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      width: '100%',
    })
  )
);

const Panel = styled.div<{ padding?: boolean }>(
  styles(css => ({ theme, padding }) =>
    css(
      {
        flex: '1',
        overflow: 'auto',
      },
      padding && { paddingRight: theme.spacers.rems.base }
    )
  )
);

const PanelHeader = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
    })
  )
);

interface FormData {
  _id: any;
  season_id: any;
}

const initialForm = (drafts: { [key: string]: Draft }, id: any): FormData => {
  if (id === 'new') {
    return {
      _id: '',
      season_id: '',
    };
  }
  const draft = drafts[id.toHexString()];
  return {
    _id: draft._id,
    season_id: draft.season_id,
  };
};

const formToDraft = (data: FormData): Draft => ({
  _id: data._id,
  season_id: new BSON.ObjectId(data.season_id),
  picks: [],
});

export default ({ deleteDraft, drafts, saveDraft }: Props) => {
  const [id, setId] = React.useState();
  return (
    <Layout>
      <Panel>
        <DataTable
          columns={[
            { header: 'id', accessor: ({ _id }) => _id.toHexString() },
            { header: 'season id', accessor: ({ season_id }) => (season_id ? season_id.toHexString() : '') },
          ]}
          data={Object.values(drafts).filter(m => !!m)}
          onRowClick={({ _id }) => setId(_id)}
          size="base"
          fluid
        />
      </Panel>
      <Panel padding>
        <PanelHeader>
          <ButtonGroup align="left">
            <Button as="button" variant="text" color="primary" onClick={() => setId('new')}>
              new
            </Button>
            {id && (
              <Button as="button" variant="text" color="secondary" onClick={() => setId(undefined)}>
                clear
              </Button>
            )}
          </ButtonGroup>
          <ButtonGroup>
            {id && id !== 'new' && drafts[id.toHexString()] && (
              <Button
                as="button"
                variant="text"
                color="danger"
                onClick={() => deleteDraft(id).then(() => setId(undefined))}
              >
                delete
              </Button>
            )}
          </ButtonGroup>
        </PanelHeader>
        {id && (
          <Form
            key={id}
            initialForm={initialForm(drafts, id)}
            onSubmit={({ data }) =>
              saveDraft(formToDraft(data)).then(res => {
                if (id === 'new') {
                  setId(res.insertedId);
                }
              })
            }
            footer={{ primary: {} }}
          >
            {({ data, setFormField }) => (
              <>
                <FormControl>
                  <FormLabel>id</FormLabel>
                  <FormInput disabled value={data._id} />
                </FormControl>
                <FormControl>
                  <FormLabel>season id</FormLabel>
                  <FormInput value={data.season_id} onChange={e => setFormField('season_id', e.target.value)} />
                </FormControl>
              </>
            )}
          </Form>
        )}
      </Panel>
    </Layout>
  );
};
