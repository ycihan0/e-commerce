import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={()=>navigate(`/admin/categories/update/${record._id}`)}>Update</Button>
          <Popconfirm
            title="Delete Category"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);

      if (response.ok) {
        const data = await response.json();
        setDatasource(data);
      } else {
        message.error("Categories failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Category deleted");
        fetchCategories();
      } else {
        message.error("Delete category failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CategoryPage;
