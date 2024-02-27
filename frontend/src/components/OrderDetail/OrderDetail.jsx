import { Card, Divider, Steps } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  DropboxOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import "./OrderDetail.css";

const OrderDetail = () => {
  return (
    <Card style={{ padding: "70px" }}>
      <Steps
        current={1}
        items={[
          {
            title: "Order created",
            icon: <EditOutlined />,
          },
          {
            title: "Order confirmed",
            icon: <CheckCircleOutlined />,
          },
          {
            title: "Order prepared",
            icon: <DropboxOutlined />,
          },
          {
            title: "Delivered to cargo",
            icon: <TruckOutlined />,
          },
        ]}
      />
      <Divider />
      <Steps
        current={1}
        direction="vertical"
        items={[
          {
            title: "Order created",
            description: "Your order is waiting for confirmation.",
          },
          {
            title: "Order confirmed",
            description: "Your order is preparing",
          },
          {
            title: "Order prepared",
            description: "Waiting for delivery to cargo",
          },
          {
            title: "Delivered to cargo",
            description: "Click for cargo tracking",
          },
          {
            title: "Order delivered",
            description: "Order completed",
          },
        ]}
      />
    </Card>
  );
};

export default OrderDetail;
