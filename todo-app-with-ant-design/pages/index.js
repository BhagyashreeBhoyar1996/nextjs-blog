import React, { useState } from "react";
import { Layout, Menu, Input, Button, Modal, Table } from "antd";
import {
  PlusCircleOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export async function getStaticProps() {
  const url = `https://jsonplaceholder.typicode.com/todos`;
  const result = await fetch(url);
  return {
    props: {
      allTask: await result.json(),
    },
  };
}

export default function Home({ allTask }) {
  const [collapsed, setCollapsed] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [updateItem, setupdatedItem] = useState({});
  const [addConfirmLoading, setAddConfirmLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updateConfirmLoading, setupdateConfirmLoading] = useState(false);
  const [deleteConfirmLoading, setdeleteConfirmLoading] = useState(false);
  const [todoList, setTodoList] = useState(
    allTask.map((task) => {
      return { key: task.id, description: task.title };
    })
  );

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const success = (content) => {
    Modal.success({
      content: content,
    });
  };

  async function refreshTask() {
    const url = `https://jsonplaceholder.typicode.com/todos`;
    const result = await fetch(url);
    const resultJson = await result.json();
    const freshTasks = resultJson.map((task) => {
      return { key: task.id, description: task.title };
    });
    setTodoList(freshTasks);
  }

  async function addTask() {
    if (userInput) {
      setAddConfirmLoading(true);
      const result = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: userInput,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setAddConfirmLoading(false);
      setUserInput("");
      await refreshTask();
      success("Task added successfully");
    }
  }

  const onValuesChange = (e) => {
    setUserInput(e.target.value);
  };

  const showDeleteModal = (record) => {
    setupdatedItem(record);
    setIsDeleteModalVisible(true);
  };

  async function handleDeleteOk() {
    setdeleteConfirmLoading(true);
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${updateItem.key}`,
      {
        method: "DELETE",
      }
    );
    await refreshTask();
    setupdatedItem({});
    setdeleteConfirmLoading(false);
    setIsDeleteModalVisible(false);
    success("Task deleted successfully");
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const showUpdateModal = (record) => {
    setupdatedItem(record);
    setIsUpdateModalVisible(true);
  };

  const onUpdateValueChange = (e) => {
    setupdatedItem({ ...updateItem, description: e.target.value });
  };

  async function handleUpdateOk() {
    setupdateConfirmLoading(true);
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${updateItem.key}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: 1,
          id: updateItem.key,
          title: updateItem.description,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    await refreshTask();
    setupdatedItem({});
    setupdateConfirmLoading(false);
    setIsUpdateModalVisible(false);
    success("Task updated successfully");
  }

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      width: 300,
      render: (record) => (
        <Menu mode="horizontal" style={{ borderBottom: 0 }}>
          <SubMenu title={<MoreOutlined />}>
            <Menu.Item
              onClick={() => {
                showDeleteModal(record);
              }}
            >
              Delete Task
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                showUpdateModal(record);
              }}
            >
              Update Task
            </Menu.Item>
          </SubMenu>
        </Menu>
      ),
    },
  ];
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="4"
            onClick={() => toggle()}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          >
            Expand
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: "#3c6fa7" }}
        >
          <Input
            disabled={addConfirmLoading}
            value={userInput}
            placeholder="Enter task"
            onChange={(e) => {
              onValuesChange(e);
            }}
            onPressEnter={addTask}
            style={{
              maxWidth: 360,
              minWidth: 360,
              marginLeft: 16,
            }}
          />
          <Button
            loading={addConfirmLoading}
            type="primary"
            htmlType="submit"
            disabled={userInput ? false : true}
            style={{ marginLeft: 0 }}
            onClick={addTask}
          >
            <PlusCircleOutlined />
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 475,
            maxHeight: 475,
            overflowY: "scroll",
            background: "#fff",
          }}
        >
          <Table
            bordered
            dataSource={todoList}
            columns={columns}
            size="middle"
          />

          <Modal
            visible={isDeleteModalVisible}
            confirmLoading={deleteConfirmLoading}
            onOk={handleDeleteOk}
            onCancel={handleDeleteCancel}
          >
            <QuestionCircleOutlined style={{ color: "red" }} />
            {"    "}
            Are you sure？
          </Modal>
          <Modal
            title="Update Task"
            visible={isUpdateModalVisible}
            confirmLoading={updateConfirmLoading}
            onOk={handleUpdateOk}
            onCancel={handleUpdateCancel}
          >
            <Input
              disabled={updateConfirmLoading}
              value={updateItem.description}
              onChange={(e) => {
                onUpdateValueChange(e);
              }}
            />
          </Modal>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by XYZ...</Footer>
      </Layout>
    </Layout>
  );
}
