import { useGetProductsQuery } from '@/api/product';
import React, { useCallback, useState } from 'react';
import logobanner from "../../assets/one-piece-logo.png";
import { Rate, message } from 'antd';
import { Link } from "react-router-dom";
import Fuse from 'fuse.js';
import CurrencyFormat from 'react-currency-format';

const Home = () => {
  const { data: productData } = useGetProductsQuery();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputSearchValue, setInputSearchValue] = useState('');

  const fuseOptions = {
    keys: [
      'name',
      'author'
    ],
  };

  const dataProduct = productData?.data;
  const fuse = new Fuse(dataProduct, fuseOptions);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchValue(e.target.value);
  };

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = fuse.search(inputSearchValue);
    const matchedProducts = results?.map((result) => result.item);
    if (matchedProducts.length === 0 && inputSearchValue !== '') {
      message.error('Không có sản phẩm phù hợp');
    }
    setSearchResults(matchedProducts);
    setInputSearchValue('');
  }, [fuse, inputSearchValue]);

  const displayProducts = searchResults.length > 0 ? searchResults : dataProduct;

  return (
    <div className='book-store  max-w-[84rem] mx-auto my-16'>
      <img src={logobanner} alt="" className='w-[200px] mx-auto ' />
      <div className=" bg-gray-100">
        <div className="searchInput  border-2 border-gray-300 inline-block rounded-l-3xl ml-[56.5rem] my-5">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder='Write in here'
              value={inputSearchValue}
              onChange={onHandleChange}
              className='text-center rounded-l-3xl px-16 py-2 outline-none'
            />
            <button type="submit" className='text-center text-white font-bold px-5 py-2 bg-gray-500'>Search</button>
          </form>
        </div>
        <div className="grid grid-cols-4 gap-5 p-5">
          {displayProducts?.map((item: any) => (
            <Link to={"/detail/" + item._id} key={item._id}>
              <div className='text-center bg-white p-5'>
                <img className='w-full h-[300px] mix-blend-multiply contrast-100' src={item.avatar.base_url} alt="" />
                <p className='font-semibold line-clamp-2 mt-5'> {item.name}</p>
                <Rate className='mb-1' disabled allowHalf defaultValue={item?.rate} />
                <div className="flex my-2">
                  <p className='text-red-600 font-semibold text-lg w-[120px]'>
                    <CurrencyFormat value={item.original_price} thousandSeparator={true} suffix={'VNĐ'} disabled />
                  </p>
                  <p>
                    <CurrencyFormat value={item.price} thousandSeparator={true} suffix={'VNĐ'} className='line-through' disabled />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;