import Head from "next/head";
import { useState } from "react";
import { Form, Input, Button, List, Typography } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "../styles/Home.module.css";

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setTodoList([userInput, ...todoList]);
    form.resetFields();
  };

  const getValueFromEvent = (values) => {
    setUserInput(values["Item"]);
  };

  const handleDelete = (todo) => {
    const updatedTodoList = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) != todoList.indexOf(todo)
    );
    setTodoList(updatedTodoList);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Next js Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title level={2}>Welcome to TODO APP</Title>
        <Form
          layout="inline"
          form={form}
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onValuesChange={getValueFromEvent}
        >
          <Form.Item
            label="Enter Item"
            name="Item"
            rules={[
              {
                required: true,
                message: "Please enter Item!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              <PlusCircleOutlined />
            </Button>
          </Form.Item>
        </Form>
        <List
          dataSource={todoList}
          renderItem={(item) => (
            <List.Item>
              {item}{" "}
              <Button
                danger
                type="primary"
                htmlType="button"
                onClick={() => {
                  handleDelete(item);
                }}
              >
                <DeleteOutlined />
              </Button>
            </List.Item>
          )}
        />
      </main>

      <footer className={styles.footer}>Thanks!</footer>
    </div>
  );
}
