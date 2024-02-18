import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SliderPage = () => {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc[0]} alt="Image" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={()=>navigate(`/admin/coupons/update/${record._id}`)}>Update</Button>
          <Popconfirm
            title="Delete Category"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`);

      if (response.ok) {
        const data = await response.json();
        setDatasource(data);
      } else {
        message.error("Coupon failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Coupon deleted");
        fetchCoupons();
      } else {
        message.error("Delete coupon failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default SliderPage;
