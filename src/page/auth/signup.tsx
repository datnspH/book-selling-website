import React from 'react'
import { Button, Form, Input } from 'antd';
import { useSignupMutation } from '@/api/Ath';
import { Link } from 'react-router-dom';

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Signup = () => {
  const [signup, { error }] = useSignupMutation();

  const onFinish = async (values: any) => {
    console.log(values);
    const { confirmPassword, ...signupData } = values
    await signup(signupData);
  };
  console.log(error);

  return (
    <div className="signup-box">
      <h2 className='font-semibold text-2xl text-white text-center mb-10'>Signup</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Confirm password is required" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error("Confirm password does not match")
                  );
                }
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <a className='mx-[75px]' href='/signin'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <button>submit</button>
          </a>
        </Form.Item>
      </Form>
    </div>
  );

}

export default Signup