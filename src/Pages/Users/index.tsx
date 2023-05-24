import { observer } from "mobx-react-lite";
import { Button, Col, Form, Input, Row, Table } from "antd";
import { useEffect } from "react";
import { userTable } from "../../userTable";
import { useStore } from "../../Containers/Store";
import { TUserFragment } from "../../Scheme/UserScheme";
import { useForm, useWatch } from "antd/es/form/Form";

export const UserPage = observer(() => {
  const { UserService } = useStore();
  const [form] = useForm();
  const watchId = useWatch("id", form);

  useEffect(() => {
    (async () => {
      await UserService.fetchAll();
    })();
  }, []);

  const handleFinishForm = async (values: any) => {
    if (!values?.uid) return;
    const newLogin: Partial<TUserFragment> = {
      ...UserService.userCollection[values?.uid],
      ...values
    };
    await UserService.update({ ...newLogin });
  };

  const handleClickRow = (record: TUserFragment) => {
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
          <Form.Item label="username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Update user ID: {watchId}</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={24}>
        <Table
          dataSource={Object.values(UserService.userCollection) ?? []}
          columns={userTable}
          onRow={(record) => {
            return {
              onClick: () => {
                handleClickRow(record);
              }
            };
          }}
          rowKey={(record) => record?.uid ?? ""}
          loading={!UserService.userCollection} />
      </Col>
    </Row>
  );
});
