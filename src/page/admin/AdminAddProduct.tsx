import React from 'react'   
import { Form, Button, Input } from 'antd'
import { useAddProductMutation } from '@/api/product'
import { AiFillFrown } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

type FieldType = {
    name: string,
    price: number,
    quantity: number,
    desc: string
}
const AdminAddProduct = () => {
    const [addproduct, { isLoading: isAddSuccess }] = useAddProductMutation()
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        addproduct(values).unwrap().then(() => {
            alert("thêm thành công")
        }).then(() => navigate("/admin/products"))
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);

    };
    return (
        <div className='h-[600px]'>
            <h2 className='font-bold mb-10 text-3xl'>Thêm sản phẩm</h2>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="desc"
                    name="desc"
                    rules={[{ required: true, message: 'Please input your desc!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input your quantity!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className='bg-green-500'>
                        {isAddSuccess ? (
                            <AiFillFrown className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AdminAddProduct