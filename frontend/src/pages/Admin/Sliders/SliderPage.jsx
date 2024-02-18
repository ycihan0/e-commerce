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
        <img src={imgSrc} alt="Image" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={()=>navigate(`/admin/sliders/update/${record._id}`)}>Update</Button>
          <Popconfirm
            title="Delete Image"
            description="Are you sure to delete this image?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteSlider(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchSliders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/sliders`);

      if (response.ok) {
        const data = await response.json();
        setDatasource(data);
      } else {
        message.error("Slider failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteSlider = async (sliderId) => {
    try {
      const response = await fetch(`${apiUrl}/api/sliders/${sliderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Image deleted");
        fetchSliders();
      } else {
        message.error("Delete image failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);
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
