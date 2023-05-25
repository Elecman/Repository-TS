import { observer } from 'mobx-react-lite';
import { useStore } from '../../Containers/Store';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useCallback, useEffect } from 'react';
import { TUserBeerFragment } from '../../Scheme/UserBeerScheme';
import { Button, Col, Form, Input, Row, Table } from 'antd';
import { userBeerTable } from '../../userBeerTable';
import { TUserFragment } from '../../Scheme/UserScheme';
import { TBeerFragment } from '../../Scheme/BeerScheme';

export const UserBeersPage = observer(() => {
  const { UserBeerService, UserService, BeerService } = useStore();
  const [form] = useForm();
  const watchId = useWatch('id', form);

  useEffect(() => {
    (async () => {
      await UserService.fetchAll();
      await BeerService.fetchAll();
    })();
  }, []);

  const dataHandler = useCallback(async () => {
    await UserBeerService.update({
      users: UserService.userCollection,
      beers: BeerService.beerCollection
    });
  }, [BeerService.beerCollection, UserService.userCollection]);
  console.log(UserService.userCollection, 'UserService.userCollection')

  useEffect(() => {
    (async () => {
      await dataHandler();
    })();
  }, [dataHandler]);

  const handleFinishForm = async (values: any) => {
    if (!values?.uid) return;

    const { beer, ...rest } = values;
    const newLogin: Partial<TUserFragment> = {
      ...UserService.userCollection[values?.uid],
      ...rest
    };
    const newBeer: Partial<TBeerFragment> = {
      ...BeerService.beerCollection[values?.beerUid],
      name: beer
    };
    await UserService.update(newLogin);
    await BeerService.update(newBeer);
    await dataHandler();
  };

  const handleClickRow = (record: TUserBeerFragment) => {
    form.setFieldsValue(record);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form form={form} onFinish={handleFinishForm}>
          <Form.Item label="id" name="id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="uid" name="uid">
            <Input disabled />
          </Form.Item>
          <Form.Item label="beerUid" name="beerUid">
            <Input disabled />
          </Form.Item>
          <Form.Item label="username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input />
          </Form.Item>
          <Form.Item label="beer" name="beer">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Update user ID: {watchId}</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={24}>
        <Table
          dataSource={Object.values(UserBeerService.userBeerCollection) ?? []}
          columns={userBeerTable}
          onRow={(record) => {
            return {
              onClick: () => {
                handleClickRow(record);
              }
            };
          }}
          rowKey={(record) => record?.uid ?? ''}
          loading={!UserBeerService.userBeerCollection} />
      </Col>
    </Row>
  );
});
