import { useGetProductsQuery, useRemoveProductMutation } from '@/api/product';
import { Table, Button, Alert, Popconfirm } from 'antd';
import { Link } from "react-router-dom"
import React from 'react'

const Adminproduct = () => {
  const { data: productData } = useGetProductsQuery();
  console.log(productData);
  const [removeProduct, { isSuccess: isRemoveSuccess }] =
    useRemoveProductMutation();

  const confirm = (id: number) => {
    removeProduct(id).unwrap().then(() => {
      useGetProductsQuery()
    });
  };
  const dataSource = productData?.map((product: any) => ({
    key: product.id,
    name: product.name,
    price: product.price,
    desc: product.desc,
    quantity: product.quantity
  }))

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'desc',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'quantity',
      render: ({ key: id }: any) => {
        return (
          <div className='flex space-x-2'>
            <Popconfirm
              title="BẠn muốn Xóa chứ"
              onConfirm={() => confirm(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button className='bg-red-500' >
                Xóa
              </Button>
            </Popconfirm>
            <Link to={"/admin/products/" + id}><button className='bg-green-500 font-bold rounded-lg px-3 text-white'>Sửa</button></Link>
          </div>
        )
      }
    },
  ];

  return (
    <div>
      <h2 className='font-bold text-[30px]'>Quản lí sản phẩm</h2>
      <Link to={"/admin/products/add"}>   <button className=' bg-green-500 p-2 text-white rounded-lg '>Thêm sản phẩm</button> </Link>

      {isRemoveSuccess && <Alert message="Success" type="success" />}
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Adminproduct