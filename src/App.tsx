import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment/moment";
import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";

const percent = 0.3 / 12;
let m = 150000;
const r = 100000;

type TMonth = {
  month: string | number,
  sum: number,
  percent: number | undefined,
  add: number;
  startDate?: boolean
}

const calculateInv = (monthCount: number, sum: number, startDate: Moment, refinancing = false, sumAdd = 0, sumPeriod: "perMonth" | "perQuarter" | "" = "") => {
  let result: TMonth[] = [];

  const getPeriodSum = (period: "perMonth" | "perQuarter" | "", date: Moment, sum: number, c: number) => {
    switch (period) {
      case "perMonth":
        return sum;

      case "perQuarter":
        return c % moment(date).startOf("quarter").month() === 0 ? sum : 0;

      default:
        return 0;
    }
  };
  let c = 1;
  for (; c <= monthCount; c++) {
    const date = startDate.add(c, "months");
    result.push({
      month: date.format("DD.MM.YYYY"),
      sum: sum,
      percent: Math.round(sum * percent),
      add: getPeriodSum(sumPeriod, date, sumAdd, c)
    });
  }

  if (refinancing) {
    result = result.reduce((prev, next) => {
      if (prev[prev.length - 1] === undefined) {
        prev.push({
          ...next,
          sum: Math.round(next.sum * percent + next.sum)
        });
      } else {
        prev.push({
          ...next,
          sum: Math.round((prev[prev.length - 1].sum * percent) + prev[prev.length - 1].sum),
          percent: Math.round(prev[prev.length - 1].sum * percent)
        });
      }

      return prev;
    }, [] as TMonth[]);
  }

  if (sumAdd && !!sumPeriod.length) {
    result = result.reduce((prev, next) => {
      if (prev[prev.length - 1] === undefined) {
        prev.push({
          ...next,
          sum: !refinancing ? next.sum + next.add : Math.round((next.sum * percent) + next.sum + next.add)
        });
      } else {
        prev.push({
          ...next,
          sum: !refinancing ?
            prev[prev.length - 1].sum + next.add :
            Math.round((prev[prev.length - 1].sum * percent) + prev[prev.length - 1].sum + next.add),
          percent: !refinancing ?
            Math.round((prev[prev.length - 1].sum) * percent) :
            Math.round((prev[prev.length - 1].sum + next.add) * percent)
        });
      }

      return prev;
    }, [] as TMonth[]);
  }

  return result;
};

const App = observer(() => {
  const [form] = Form.useForm();
  const startDate: Moment | undefined = Form.useWatch("startDate", form);
  const startSum: number | undefined = Form.useWatch("startSum", form);
  const termNumber: number | undefined = Form.useWatch("termNumber", form);
  const refinancing: boolean = Form.useWatch("refinancing", form);
  const sumAdd: number | undefined = Form.useWatch("sumAdd", form);
  const termAdd: "perMonth" | "perQuarter" | "" | undefined = Form.useWatch("termAdd", form);
  const [tableData, setTableData] = useState<TMonth[]>([]);

  useEffect(() => {
    if (startDate && startSum) {
      setTableData([{
        month: `Начало ${startDate?.format("DD.MM.YYYY")}`,
        sum: startSum,
        percent: undefined,
        add: 0,
        startDate: true
      }]);
    }

    if (termNumber && startSum && startDate) {
      setTableData(prevState => [...prevState, ...calculateInv(termNumber, startSum, startDate, refinancing, sumAdd, termAdd)]);
    }
  }, [startDate, startSum, termNumber, refinancing, sumAdd, termAdd]);

  return (
    <div style={{
      padding: 16
    }}>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Form form={form}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="startDate" label="Дата вложения">
                  <DatePicker placeholder="Выберите дату" format={"DD.MM.YYYY"} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="startSum" label="Начальная сумма">
                  <InputNumber style={{ width: 200 }} placeholder="Начальная сумма" min={100000} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="termNumber" label="Срок инвестиций">
                  <InputNumber min={1} addonAfter="Месяц(-ев)" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="refinancing" valuePropName="checked">
                  <Checkbox value={false}>Реинвестирования</Checkbox>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Дополнительные вложения">
                  <Form.Item name="sumAdd" label="Сумма">
                    <InputNumber style={{ width: 200 }} min={1} />
                  </Form.Item>
                  <Form.Item name="termAdd" label="Период">
                    <Select style={{ width: 200 }}>
                      <Select.Option value="perMonth">Раз в месяц</Select.Option>
                      <Select.Option value="perQuarter">Раз в квартал</Select.Option>
                    </Select>
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Table
            dataSource={tableData}
            loading={!tableData.length}
            pagination={false}
            summary={(pageData) => {
              let summPercent = 0;
              let summAdd = 0;

              pageData.forEach(({ percent, add }) => {
                if (percent) summPercent += percent;
                if (add) summAdd += add;
              });
              if (!pageData.length) return null;
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>Итого</Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>Сумма с
                    процентами {pageData[pageData.length - 1].sum + summPercent}</Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>Довложения {summAdd}</Table.Summary.Cell>
                  <Table.Summary.Cell index={3} colSpan={2}>Процентов {summPercent}</Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          >
            <Table.Column key={1} dataIndex="month" title="Месяц" render={(value, record: TMonth) => {
              return {
                props: {
                  style: {
                    backgroundColor: record?.startDate ? "#ccd5ae" : "transparent"
                  }
                },
                children: value
              };
            }} />
            <Table.Column key={2} dataIndex="sum" title="Сумма" />
            <Table.Column key={3} dataIndex="add" title="Вложения" />
            <Table.Column key={4} dataIndex="percent" title="Проценты" />
          </Table>
        </Col>

      </Row>
    </div>

  );
});

export default App;
