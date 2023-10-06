import { useGetProductByIdQuery } from '@/api/product';
import { Link, useNavigate, useParams } from "react-router-dom";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { useState } from 'react';

import { Rate, message } from 'antd';
import CurrencyFormat from 'react-currency-format';
import { useAddCartMutation } from '@/api/cart';


const ProductDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { data: productDetails } = useGetProductByIdQuery(id || "");
  const [AddCart, { data }] = useAddCartMutation()
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const [numProduct, setNumProduct] = useState(1)
  const onChange = (value: any) => {
    setNumProduct(Number(value))
  }
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
       const orderItem = {
        userId: user?._id,
        productId: productDetails?.data._id,
        name: productDetails?.data.name,
        amount: numProduct,
        image: productDetails?.data.avatar.base_url,
        price: productDetails?.data.price,
        original_price: productDetails?.data.original_price,
      }
  const handleAddOrderProduct = () => {
    if (user?._id) {
      AddCart(orderItem)
        .then(() => {
          message.success(data?.message);
        })
        .catch((error) => {
          message.error(error?.message || "An error occurred while adding the product to the cart.");
        });

    } else {
      message.error("bạn cần đăng nhập")
      navigate("/signin")
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
          <h2 className='book-name font-medium text-xl'>{productDetails?.data.name}</h2>

          <div className="book-infomation   flex justify-between mr-16 mt-10 mb-3 space-x-5">
            <p>Nhà cung cấp: <span className='font-semibold'>{productDetails?.data.supplier}</span></p>
            <p>thể loại: <span className='font-semibold'>{productDetails?.data.categoryId}</span></p>
            <p>Tác giả: <span className='font-semibold'>{productDetails?.data.author}</span></p>
          </div>
          <div className="tt-2">
            <p>Nhà xuất bản: <span className='font-semibold'>{productDetails?.data.publishing}</span></p>
          </div>
          <Rate className='mb-1' disabled allowHalf defaultValue={productDetails?.data.rate} />
          <div className="book-price  grid grid-cols-5 items-center mb-14">
            <span className='text-red-500 text-3xl font-semibold col-span-2'><CurrencyFormat value={productDetails?.data.original_price} thousandSeparator={true}
              suffix={'VNĐ'} disabled /></span>
            <span className='col-span-3 '><CurrencyFormat value={productDetails?.data.price} thousandSeparator={true}
              suffix={'VNĐ'} className='line-through' disabled /></span>
          </div>

          <div className='book-quantity  flex items-center'>
            <p className=' mr-10'>Số lượng:</p>
            <div className="number border w-[170px] rounded space-x-5">
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: "10px" }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
              <input type="text" onChange={onChange} min={1} className='w-12 mx-5 text-center' value={numProduct} disabled />
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: "10px" }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.data.quantity)}>
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
            </div>
          </div>
          <button className='btn-add  mt-6 border py-3 w-full bg-red-600 text-white font-medium hover:bg-red-500 rounded-md' onClick={() => handleAddOrderProduct()} >Thêm sản phẩm</button>
          <Link to={"/order/"+productDetails?.data._id}><button className='mt-6 border py-3 w-full bg-red-600 text-white font-medium hover:bg-red-500 rounded-md'  >đặt hàng</button></Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
