import { useGetProductByIdQuery } from '@/api/product';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DefaultValues, useForm } from 'react-hook-form';
import { useAddOrderMutation } from '@/api/order';
import { message } from 'antd';

interface FormData {
    email: string,
    paymentMethod: "Payment on delivery",
    shippingPrice: 20,
    itemsPrice: number
    fullName: string
    address: string
    city: string
    user: string
    phone: number
}

const OrderPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: productDetails } = useGetProductByIdQuery(id || "");
    const [AddOrder, { data }] = useAddOrderMutation()
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const [numProduct, setNumProduct] = useState(1)

    const { register, handleSubmit } = useForm<FormData>();
    const userId = user._id
    const onChange = (value: any) => {
        setNumProduct(Number(value))
        // console.log(value.target.value, "â");

    }
    const onFinish = async (values: FormData) => {
        console.log(values);
        const Order = {
            "orderItem": [
                {
                    product: productDetails?.data._id,
                    name: productDetails?.data.name,
                    amount: numProduct,
                    image: productDetails?.data.avatar.base_url,
                    price: productDetails?.data.price,
                    original_price: productDetails?.data.original_price,
                }
            ],
            fullName: values.fullName,
            address: values.address,
            city: values.city,
            phone: values.phone,
            user: user._id,
            paymentMethod: "Payment on delivery",
            shippingPrice: 20,
            itemsPrice: productDetails?.data.price

        }
        console.log(Order);
        
        AddOrder(Order)
        message.success(data?.message)
        // await signup(signupData);
    };
    const handleChangeCount = (type: any, limited: any) => {
        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1)
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }
    return (
        <div className="continer max-w-[84rem] mx-auto borber border-2 rounded-md my-10" key={productDetails?.data._id} >
            <h2 className='title   font-bold text-3xl mb-5 text-center my-5'>Chi tiết sản phẩm</h2>
            <div className='book-detail  p-5 grid grid-cols-2 gap-3 justify-items-center items-center space-x-5'>
                <div className='book-detail-img'>
                    <img src={productDetails?.data.images[0].base_url} alt="" className='w-[500px]' />
                </div>

                <div>
                    {/* <h2 className='book-name font-medium text-xl'>{productDetails?.data.name}</h2> */}
                    <span>số lượng</span>
                    <div className="number border w-[170px] rounded space-x-5">
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: "10px" }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                        <input type="text" onChange={onChange} min={1} className='w-12 mx-5 text-center' value={numProduct} disabled />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: "10px" }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.data.quantity)}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </div>
                    <div className=" my-auto space-y-5">
                        <h2 className='font-semibold text-2xl'>Order</h2>
                        <form onSubmit={handleSubmit(onFinish)}>
                            <div className="user-box">
                                <input type="email" {...register("email", { required: true })} />
                                <label className='overlay'>Email</label>
                            </div>
                            <div className="user-box">
                                <input type="text" {...register("address", { required: true })} />
                                <label className='overlay'>address</label>
                            </div>
                            <div className="user-box">
                                <input type="text" {...register("fullName", { required: true })} />
                                <label className='overlay'>Full name</label>
                            </div>
                            <div className="user-box">
                                <input type="number"  {...register("phone", { required: true })} />
                                <label className='overlay'>Phone</label>
                            </div>
                            {/* <div className="user-box">
              <input type="number"  {...register("itemsPrice", { required: true })} />
              <label>itemsPrice</label>
            </div> */}
                            <div className="user-box">
                                <input type="text" {...register("city", { required: true })} />
                                <label className='overlay'>city</label>
                            </div>
                            <button className='mt-6 border py-3 w-full bg-red-600 text-white font-medium hover:bg-red-500 rounded-md'  >đặt hàng</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage