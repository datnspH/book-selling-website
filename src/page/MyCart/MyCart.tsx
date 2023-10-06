import { useGetCartsQuery, useRemoveCartMutation } from '@/api/cart';
import { message } from 'antd';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const Mycart = () => {
  const navigate = useNavigate()
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const id = user?._id
  const { data: dataCart } = useGetCartsQuery(id || "")
  const [RemoveCart, { data }] = useRemoveCartMutation()


  const onHandleReomveCart = (id: any) => {
    if (confirm("Are you sure you want to remove this")) {
      RemoveCart(id).unwrap().then(() =>  message.success(data?.message))
    }
  }
  if (!user) {
    return (
      <div className='max-w-7xl mx-auto my-5  border border-gray-300 border-3 p-5 text-center' >
        <span>Không có sản phẩn</span>
      </div>
    )
  }
  else {
    return (
      <div className='max-w-7xl mx-auto my-10 p-5 bg-gray-100'>
        <div className=' item-search flex justify-center bg-white my-5 py-5'>
          <input className=' border text-center rounded-3xl px-16 py-2 hover:outline-offset-2' placeholder='Search' type="text" />
        </div>

        <div className='grid grid-cols-7 bg-white px-7 py-3'>
          <h3 className='col-span-4 font-medium text-xl'> Sản phẩm</h3>
          <h3 className='font-medium text-xl text-center'> Số lượng</h3>
          <h3 className='font-medium text-xl text-center'> Thành tiền</h3>
          <h3></h3>
        </div>

        {dataCart?.data.map((item: any) => (
          <div key={item.id} className=' grid grid-cols-7 my-5 p-7 bg-white'>

            <div className="book col-span-4 grid grid-cols-3">
              <div className='img'>
                <img src={item.image} alt="" className='w-[200px] mx-auto' />
              </div>
              <div className='text col-span-2'>
                <p className='text-lg leading-8 mb-5'> {item?.name}</p>
                <p className='text-xl font-bold'> {item?.price} VNĐ</p>
              </div>
            </div>

            <div className='m-auto'>
              <p className='text-lg font-bold'>{item.amount}</p>
            </div>

            <div className='m-auto'>
              <p className='text-xl text-red-500 font-bold'>{item.amount * item.price}.000 VNĐ</p>
            </div>

            <div className="action m-auto">
              <AiTwotoneDelete className='text-4xl text-gray-500 hover:text-red-500 cursor-pointer' onClick={() => onHandleReomveCart(item._id)} />
            </div>
          </div>
        ))}
      </div>
    )
  }


}

export default Mycart