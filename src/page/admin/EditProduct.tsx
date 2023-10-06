import React, { useEffect } from 'react'
import { Form, Button, Input } from 'antd'
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

type FieldType = {
    name: string,
    price: number,
    quantity: number,
    desc: string
}
const EditProduct = () => {
    const [UpdateProduct] = useUpdateProductMutation()
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData } = useGetProductByIdQuery(idProduct || "");  
    const navigate = useNavigate()
    console.log(productData);
    
    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue({
            name: productData?.name,
            price: productData?.price,
            quantity:productData?.quantity,
            desc: productData?.desc
        });
    }, [productData]);
    const onFinish = (values: any) => {
        UpdateProduct({ ...values, id: idProduct })
        .unwrap()
        .then(() => navigate("/admin/products"));
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);

    };
    return (
        <div className='h-[600px] h-scren'>
            <Form
            form={form}
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
                        thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default EditProduct