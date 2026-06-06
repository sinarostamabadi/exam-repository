import React, { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Breadcrumb,
  Drawer,
} from "antd";

import {
  DashboardOutlined,
  AppstoreOutlined,
  BellOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  WalletOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { MdMenuOpen } from "react-icons/md";

import RequestBoard from "./pages/main";
import "../src/assets/fonts/yekan-font.css";

const { Header, Content, Sider } = Layout;

const menuItems = [
  { key: "1", icon: <DashboardOutlined />, label: "داشبورد" },
  { key: "2", icon: <FileTextOutlined />, label: "درخواست‌ها" },
  { key: "3", icon: <AppstoreOutlined />, label: "گزارشات" },
];

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Layout dir="rtl" className="h-screen bg-slate-100 overflow-hidden">

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="right"
        width={260}
        className="md:hidden"
        bodyStyle={{ padding: 0 }}
      >
        <div className="h-20 flex items-center justify-center border-b border-slate-200">
          <div className="text-xl font-bold text-blue-600">
            پنل آزمون
          </div>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={menuItems}
          style={{ border: "none", marginTop: 12 }}
        />
      </Drawer>

      <Sider
        width={260}
        theme="light"
        breakpoint="md"
        collapsedWidth={0}
        className="hidden md:block border-l border-slate-200"
      >
        <div className="h-20 flex items-center justify-center border-b border-slate-200">
          <div className="text-xl font-bold text-blue-600">
            پنل آزمون
          </div>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={menuItems}
          style={{ border: "none", marginTop: 12 }}
        />
      </Sider>

      <Layout>

        <Header className="bg-white! border-b border-slate-200 px-2! sm:px-10! h-18">
          <div className="h-full flex items-center justify-between">
            <div className="flex items-center gap-3">

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center bg-white cursor-pointer"
              >
                <MdMenuOpen />
              </button>

              <div>
                <h1 className="text-sm sm:text-lg font-bold text-slate-800">
                  مدیریت درخواست‌ها
                </h1>
                <p className="text-xs text-slate-400 mt-1 hidden sm:block">
                  مدیریت فرآیند بررسی و پرداخت تسهیلات
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">

              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center justify-center">
                <BellOutlined />
              </button>

              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center justify-center">
                <SettingOutlined />
              </button>

              <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />

              <div className="hidden sm:flex items-center gap-3">
                <Avatar size={38} className="bg-sky-500" icon={<UserOutlined />} />
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    مدیر سیستم
                  </div>
                  <div className="text-xs text-slate-400">
                    Administrator
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Header>

        <Content className="h-full overflow-y-auto px-3 sm:px-6 lg:px-8 py-6">

          <Breadcrumb
            items={[
              { title: "داشبورد" },
              { title: "درخواست‌ها" },
            ]}
            className="mb-5"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 mt-6">


  <div
    className="
    relative
    overflow-hidden
    rounded-3xl
    bg-white
    p-5
    border
    border-slate-200
    shadow-sm
    hover:shadow-md
    transition-all
    "
  >
    <div className="absolute top-0 left-0 w-24 h-24 bg-blue-50 rounded-full -translate-x-10 -translate-y-10" />

    <div className="relative z-10">
      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm text-slate-500">
            کل درخواست‌ها
          </p>

          <h2 className="text-4xl font-black mt-3 text-slate-800">
            124
          </h2>
        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-blue-100
          flex
          items-center
          justify-center
          "
        >
          <FileTextOutlined className="text-2xl text-blue-600" />
        </div>
      </div>

      <div className="mt-5 text-xs text-emerald-600 font-medium">
        +12% نسبت به ماه گذشته
      </div>
    </div>
  </div>

  <div
    className="
    relative
    overflow-hidden
    rounded-3xl
    bg-white
    p-5
    border
    border-slate-200
    shadow-sm
    hover:shadow-md
    transition-all
    "
  >
    <div className="absolute top-0 left-0 w-24 h-24 bg-amber-50 rounded-full -translate-x-10 -translate-y-10" />

    <div className="relative z-10">

      <div className="flex justify-between">

        <div>
          <p className="text-sm text-slate-500">
            بررسی اولیه
          </p>

          <h2 className="text-4xl font-black mt-3 text-slate-800">
            23
          </h2>
        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-amber-100
          flex
          items-center
          justify-center
          "
        >
          <ClockCircleOutlined className="text-2xl text-amber-600" />
        </div>
      </div>

      <div className="mt-5 text-xs text-slate-500">
        نیازمند بررسی کارشناسان
      </div>

    </div>
  </div>

  <div
    className="
    relative
    overflow-hidden
    rounded-3xl
    bg-white
    p-5
    border
    border-slate-200
    shadow-sm
    hover:shadow-md
    transition-all
    "
  >
    <div className="absolute top-0 left-0 w-24 h-24 bg-violet-50 rounded-full -translate-x-10 -translate-y-10" />

    <div className="relative z-10">

      <div className="flex justify-between">

        <div>
          <p className="text-sm text-slate-500">
            کمیته تسهیلات
          </p>

          <h2 className="text-4xl font-black mt-3 text-slate-800">
            41
          </h2>
        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-violet-100
          flex
          items-center
          justify-center
          "
        >
          <WalletOutlined className="text-2xl text-violet-600" />
        </div>
      </div>

      <div className="mt-5 text-xs text-slate-500">
        آماده طرح در کمیته
      </div>

    </div>
  </div>


  <div
    className="
    relative
    overflow-hidden
    rounded-3xl
    bg-white
    p-5
    border
    border-slate-200
    shadow-sm
    hover:shadow-md
    transition-all
    "
  >
    <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-50 rounded-full -translate-x-10 -translate-y-10" />

    <div className="relative z-10">

      <div className="flex justify-between">

        <div>
          <p className="text-sm text-slate-500">
            آماده پرداخت
          </p>

          <h2 className="text-4xl font-black mt-3 text-slate-800">
            60
          </h2>
        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-emerald-100
          flex
          items-center
          justify-center
          "
        >
          <CheckCircleOutlined className="text-2xl text-emerald-600" />
        </div>
      </div>

      <div className="mt-5 text-xs text-slate-500">
        تأیید شده برای پرداخت
      </div>

    </div>
  </div>

          </div>

          <div
            style={{
              borderRadius: 20,
              padding: "20px 0px",
              minHeight: "75vh",
            }}
          >
            <RequestBoard />
          </div>

        </Content>
      </Layout>
    </Layout>
  );
};

export default App;