import React, { useState } from 'react'
import { AiOutlineMail, AiOutlinePhone, AiOutlineLogout } from "react-icons/ai";
import { BsPersonCircle, BsTruck } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import book from "../assets/book.png"
import logobanner from "../assets/one-piece-logo.png"
import logo from "../assets/logo.png"
const LayoutHomepage = () => {
  const navigate = useNavigate()
  const [dropDown, setDropDown] = useState(false)

  const Logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/")
  }

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  // console.log(user);


  const handleClick = () => {
    setDropDown(!dropDown)
  }

  return (
    <div className="bg-white">
      <header>
        <div className='w-full flex justify-between px-5 py-3 z-30 fixed bg-white'>
          <Link to={"/"}>
            <div className="logo flex items-center space-x-3">
              <img className='w-[50px]' src={logo} alt="" />
              <h3 className='uppercase font-semibold text-red-300'>book store</h3>
            </div>
          </Link>
          <div className='flex items-center space-x-6'>
            <nav >
              <ul className='flex space-x-10 text-lg '>
                <li> <a href="/" className='flex items-center hover:text-gray-300 px'>Home page</a></li>
                <li><a href="#" className=' hover:text-gray-300'>About us </a></li>
                <li><a href="#" className=' hover:text-gray-300'>Trademark</a></li>
                <li><a href="/cart" className=' flex items-center hover:text-gray-300'>Oder</a></li>
              </ul>
            </nav>
            {!user && (
              <><button className='px-10 dropdown relative hover:text-blue-500 outline-none' onClick={handleClick}><BsPersonCircle size={35} /></button>
                {dropDown ?
                  <ul className="dropdown-content absolute translate-y-[4.8rem] translate-x-[25.4rem] text-center bg-white w-[120px] border-2 border-t-0">
                    <li> <a href="/signin" className='block py-1 font-bold border-b-2 hover:bg-red-300 hover:text-white'>Signin</a></li>
                    <li><a href="/signup" className='block py-1 font-bold hover:bg-red-300  hover:text-white'>Signup</a></li>
                  </ul>
                  : ""
                }
              </>
            )}
            {user && (
              <>
                <button className='px-10 dropdown relative outline-none' onClick={handleClick}>
                  {user.avatar ? (
                    <img src={user.avatar} alt="" className="w-[40px] border-2 border-black rounded-full" />
                  ) : (
                    <BsPersonCircle size={35} className="hover:text-blue-500" />
                  )}
                </button>
                {dropDown ?
                  <ul className="dropdown-content absolute translate-y-[4.8rem] translate-x-[25.6rem] bg-white w-[120px] text-center border-2 border-t-0">
                    <li> <a href="" className='block py-2 font-bold border-b-2 hover:bg-red-300 hover:text-white'>Order status</a></li>
                    <li><a href="" className="flex items-center justify-center py-2 font-bold hover:bg-red-300 hover:text-white" onClick={() => Logout()}>Logout <AiOutlineLogout size={20} /></a></li>
                  </ul>
                  : ""
                }
              </>
            )}
          </div>
        </div>

        <div className="banner w-full h-[750px] bg-fixed bg-no-repeat bg-cover">
          <div className="w-full h-[750px] grid grid-cols-2">
            <img src={book} alt="" className='w-[670px] pt-[7.5rem] pl-24' />
            <div className="text mt-[12rem] mr-24">
              <img src={logobanner} alt="" className='w-[200px] mx-auto' />
              <h2 className='text-white text-3xl text-center mb-5'>One Piece - Tập 99: “Luffy Mũ Rơm”</h2>
              <p className='text-white text-center'>One Piece, từng được xuất bản tại Việt Nam dưới tên gọi Đảo Hải Tặc là bộ manga dành cho lứa tuổi thiếu niên của tác giả Oda Eiichiro</p>
              <button className='mt-10 block mx-auto bg-yellow-500 shadow-lg shadow-yellow-500 rounded-full px-8 py-3 text-white text-2xl transition-all delay-75 hover:bg-blue-300 hover:shadow-blue-300'>
                See more
              </button>
            </div>
          </div>
          {/* <img className='w-full h-[650px] bg-fixed' src={background} alt="" /> */}
        </div>
      </header>


      <main className=''>
        <Outlet />
      </main>


      <footer className="grid grid-cols-3 justify-items-center bg-gray-100 py-5">

        <div className='space-y-1'>
          <img className='w-[100px] mx-auto' src={logo} alt="" />
          <span className='block text-2xl font-bold text-red-300 uppercase'>Book store</span>
          <span className='block hover:text-red-500 cursor-pointer'>Tuyển dụng</span>
          <span className='block hover:text-red-500 cursor-pointer'>Khuyến mãi</span>
        </div>
        <div className='space-y-2'>
          <span className='block text-xl font-bold  '>Chính sách</span>
          <span className='block hover:text-red-500 cursor-pointer '>Chính sách giao hàng</span>
          <span className='block hover:text-red-500 cursor-pointer'>Chính sách thanh toán</span>
          <span className='block hover:text-red-500 cursor-pointer'>Chính sách đổi trả</span>
          <span className='block hover:text-red-500 cursor-pointer'>Chính sách kiểm hàng</span>
          <span className='block hover:text-red-500 cursor-pointer'>Chính sách bảo mật thông tin </span>
        </div>
        <div className='space-y-2'>
          <span className='block text-xl font-bold  '>Liên hệ</span>
          <span className='flex items-center hover:text-red-500 cursor-pointer'><AiOutlineMail />: datplt2003qm@gmail.com</span>
          <span className='flex items-center hover:text-red-500 cursor-pointer'><AiOutlinePhone />:0364649978</span>
          <span className='block hover:text-red-500 cursor-pointer'>zalo:0364649978</span>
        </div>
      </footer>
    </div>
  );
}

export default LayoutHomepage