import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPageList = () => {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      title: "Blog Category",
      dataIndex: "blogCategory",
      key: "blogCategory",
      render: (text) => <b>{text}</b>,
    },
      {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/blogs/update/${record._id}`)}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete Category"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
             onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteProduct = async (blogId) => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Blog deleted");
        setDatasource((prevProducts) => {
          return prevProducts.filter((blog) => blog._id !== blogId);
        });
      } else {
        message.error("Delete blog failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/blogs`);
  
        if (response.ok) {
          const data = await response.json();
          setDatasource(data);
        } else {
          message.error("Blog failed");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [apiUrl]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default BlogPageList;
