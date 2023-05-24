import { observer } from "mobx-react-lite";
import { useStore } from "../../Containers/Store";
import { useForm, useWatch } from "antd/es/form/Form";
import { useEffect } from "react";
import { Button, Col, Form, Input, Row, Table } from "antd";
import { beerTable } from "../../beerTable";
import { TBeerFragment } from "../../Scheme/BeerScheme";

export const BeersPage = observer(() => {
  const { BeerService } = useStore();
  const [form] = useForm();
  const watchId = useWatch("id", form);

  useEffect(() => {
    (async () => {
      await BeerService.fetchAll();
    })();
  }, []);

  const handleFinishForm = async (values: any) => {
    if (!values?.uid) return;
    const newBeer: Partial<TBeerFragment> = {
      ...BeerService.beerCollection[values?.uid],
      ...values
    };
    await BeerService.update({ ...newBeer });
  };

  const handleClickRow = (record: TBeerFragment) => {
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
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="brand" name="brand">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Update beer ID: {watchId}</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={24}>
        <Table
          dataSource={Object.values(BeerService.beerCollection) ?? []}
          columns={beerTable}
          onRow={(record) => {
            return {
              onClick: () => {
                handleClickRow(record);
              }
            };
          }}
          rowKey={(record) => record?.uid ?? ""}
          loading={!BeerService.beerCollection} />
      </Col>
    </Row>
  );
});
