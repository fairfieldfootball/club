import React from 'react';
import {
  emailValidator,
  styled,
  styles,
  stringValidator,
  Button,
  ButtonGroup,
  DataTable,
  Form,
  FormControl,
  FormGroup,
  FormInput,
  FormLabel,
} from '@makes-apps/lib';

import { Manager } from '../../types';

interface Props {
  managers: { [key: string]: Manager };
  deleteManager: (managerId: any) => Promise<any>;
  saveManager: (manager: Manager) => Promise<any>;
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

const initialForm = (managers: { [key: string]: Manager }, id: any): Manager => {
  if (id === 'new') {
    return {
      _id: '',
      email: '',
      first_name: '',
      last_name: '',
    };
  }
  return managers[id.toHexString()];
};

const inputStatus = (error?: string) => {
  if (!error) {
    return;
  }
  return { type: 'danger' as 'danger', hint: error };
};

export default ({ deleteManager, managers, saveManager }: Props) => {
  const [id, setId] = React.useState();
  return (
    <Layout>
      <Panel>
        <DataTable
          columns={[
            { header: 'id', accessor: ({ _id }) => _id.toHexString() },
            { header: 'email' },
            { header: 'first name', accessor: 'first_name' },
            { header: 'last name', accessor: 'last_name' },
          ]}
          data={Object.values(managers).filter(m => !!m)}
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
            {id && id !== 'new' && managers[id.toHexString()] && (
              <Button
                as="button"
                variant="text"
                color="danger"
                onClick={() => deleteManager(id).then(() => setId(undefined))}
              >
                delete
              </Button>
            )}
          </ButtonGroup>
        </PanelHeader>
        {id && (
          <Form
            key={id}
            initialForm={initialForm(managers, id)}
            onSubmit={({ data }) =>
              saveManager(data).then(res => {
                if (id === 'new') {
                  setId(res.insertedId);
                }
              })
            }
            validation={{
              email: { isValid: emailValidator() },
              first_name: { isValid: stringValidator({}) },
              last_name: { isValid: stringValidator({}) },
            }}
            footer={{ primary: {} }}
          >
            {({ data, errors, setFormField, validate }) => (
              <>
                <FormControl>
                  <FormLabel>id</FormLabel>
                  <FormInput disabled value={data._id} />
                </FormControl>
                <FormGroup inline>
                  <FormControl>
                    <FormLabel>first name</FormLabel>
                    <FormInput
                      value={data.first_name}
                      onChange={e => setFormField('first_name', e.target.value)}
                      onBlur={() => validate('first_name')}
                      status={inputStatus(errors.first_name)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>last name</FormLabel>
                    <FormInput
                      value={data.last_name}
                      onChange={e => setFormField('last_name', e.target.value)}
                      onBlur={() => validate('last_name')}
                      status={inputStatus(errors.last_name)}
                    />
                  </FormControl>
                </FormGroup>
                <FormControl>
                  <FormLabel>email</FormLabel>
                  <FormInput
                    value={data.email}
                    onChange={e => setFormField('email', e.target.value)}
                    onBlur={() => validate('email')}
                    status={inputStatus(errors.email)}
                  />
                </FormControl>
              </>
            )}
          </Form>
        )}
      </Panel>
    </Layout>
  );
};
