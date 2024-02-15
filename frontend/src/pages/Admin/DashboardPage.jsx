import { Card, Col, Row, Statistic, message } from "antd";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardPage = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataOrderTotal, setDataOrderTotal] = useState(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  const data = [
    {
      name: "January",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "February",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "March",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "April",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, orderResponse] = await Promise.all([
          fetch(`${apiUrl}/api/users`),
          fetch(` https://api.stripe.com/v1/payment_intents`, {
            method: "GET",
            headers: { Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}` },
          }),
        ]);
        if (!userResponse.ok || !orderResponse.ok) {
          message.error("data failed");
        }

        const [userResponseData, orderResponseData] = await Promise.all([
          userResponse.json(),
          orderResponse.json(),
        ]);

        setDataUser(userResponseData);
        setDataOrder(orderResponseData.data);

        const ordersTotal = orderResponseData.data.map((a) => a.amount);
        const totalAmount = ordersTotal.reduce((a, b) => a + b, 0);
        setDataOrderTotal(totalAmount);
      } catch (error) {
        console.log(error);
        message.error("Data fetching failed");
      }
    };
    fetchData();
  }, [apiUrl, MY_STRIPE_SECRET_KEY]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="total product sales" value={dataOrder.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="total number of customers"
              value={dataUser.length}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="total income"
              value={"$ " + dataOrderTotal / 100}
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} style={{ marginTop: "20px" }}>
        <h2>Product sales increase chart in recent months</h2>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Card>
      <Card bordered={false} style={{ marginTop: "20px" }}>
        <h2>Customer increase in recent months</h2>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
    </div>
  );
};

export default DashboardPage;
