import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  PicCenterOutlined,
  PicLeftOutlined,
  MailOutlined,
  PictureOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Categories",
      path: "/",
      children: [
        {
          key: "2.1",
          label: "Category List",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "2.2",
          label: "Add New Category",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "3",
      icon: <LaptopOutlined />,
      label: "Products",
      path: "/",
      children: [
        {
          key: "3.1",
          label: "Product List",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "3.2",
          label: "Add New Product",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "4",
      icon: <PicLeftOutlined />,
      label: "Blogs",
      path: "/",
      children: [
        {
          key: "4.1",
          label: "Blog List",
          path: "/admin/blogs",
          onClick: () => {
            navigate(`/admin/blogs`);
          },
        },
        {
          key: "4.2",
          label: "Add New Blog",
          path: "/admin/blogs/create",
          onClick: () => {
            navigate("/admin/blogs/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <BarcodeOutlined />,
      label: "Coupons",
      path: "/admin/coupons",
      children: [
        {
          key: "5.1",
          label: "Coupon List",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "5.2",
          label: "Add New Coupon",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
    },
    {
      key: "6",
      icon:<MailOutlined />,
      label: "Contacts",
      path: "/admin/contacts",
      onClick: () => {
        navigate(`/admin/contacts`);
      },
    },
    {
      key: "7",
      icon: <PicCenterOutlined />,
      label: "Hero",
      path: "/admin/sliders",
      children: [
        {
          key: "7.1",
          label: "Slider List",
          path: "/admin/sliders",
          onClick: () => {
            navigate(`/admin/sliders`);
          },
        },
        {
          key: "7.2",
          label: "Add New Slider",
          path: "/admin/sliders/create",
          onClick: () => {
            navigate("/admin/sliders/create");
          },
        },
      ],
    },

    {
      key: "8",
      icon: <PictureOutlined />,
      label: "Logo",
      path: "/admin/infos",
      onClick: () => {
        navigate(`/admin/infos`);
      },
    },
    
    {
      key: "9",
      icon: <UserOutlined />,
      label: "User List",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "10",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      path: "/admin/orders",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "11",
      icon: <RollbackOutlined />,
      label: "Go to Home Page",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];
  

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };

  const getPageTitle = () => {
    for(const item of menuItems){
      if(item.children){
        for(const child of item.children){
          if(child.path === window.location.pathname){
            return child.label;
          }
        }
      }else{
        if(item.path === window.location.pathname){
          return item.label;
        }
      }
    }
  };

  if (userRole === "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{
                height: "100%",
              }}
              items={menuItems}
              defaultSelectedKeys={[getActiveKey()]}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>{getPageTitle()}</h2>
                <h2>Admin Panel</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (window.location.href = "/");
  }
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};
