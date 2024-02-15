import { Card, Col, Row, Statistic, message } from "antd";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataOrderTotal, setDataOrderTotal] = useState(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

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

        const x=orderResponseData.data.map((a)=>a.amount);
        const y=x.reduce((a,b)=>a+b,0)
        console.log(y)
        setDataOrderTotal(y)
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
            <Statistic
              title="total product sales"
              value={dataOrder.length}
            />
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
              value={"$ "+ dataOrderTotal/100}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
