import React, { useState, useEffect } from "react";
import Home from "./dashboard/Home";
import UserProfile from "./dashboard/UserProfile";
import EmployeeProfile from "./dashboard/EmployeeProfile";
import axios from "axios";
import { debounce } from "lodash";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined, // Import the LogoutOutlined icon
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import loader from "../loader2.gif";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const DashboardLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [loading, setLoading] = useState(true);
  const [checkRole, setCheckRole] = useState("");

  useEffect(() => {
    const fetchData = debounce(async () => {
      try {
        setLoading(true);
        const accessToken = sessionStorage.getItem("accessToken");

        const response = await axios.get(
          `http://localhost:5000/api/v1/role/checkPermission`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const { data } = response;
        console.log(data);

        setCheckRole(data.role);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error.response.data.data.role);
        setCheckRole(error.response.data.data.role);
        console.log(typeof checkRole);
        setLoading(false);
      }
    }, 200);

    const debouncedFetchData = debounce(fetchData, 200);
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel();
    };
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("clientInfo");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  return (
    <>
      {loading ? (
        <div className="overlay" style={{ textAlign: "center", marginTop:"100px" }}>
                  <img src={loader} alt="" />
                  <p>Loading Dashboard...</p>
        </div>
      ) : (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              height: "100vh",
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedMenuItem]}
              onClick={handleMenuClick}
            >
              <Menu.Item key="1" icon={<UserOutlined />}>
                Home
              </Menu.Item>
              {checkRole !== "employee" && (
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  User Profile
                </Menu.Item>
              )}
              <Menu.Item key="3" icon={<UploadOutlined />}>
                Employee Profile
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {selectedMenuItem === "1" && <Home />}
              {selectedMenuItem === "2" && <UserProfile />}
              {selectedMenuItem === "3" && <EmployeeProfile />}
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};
export default DashboardLayout;
