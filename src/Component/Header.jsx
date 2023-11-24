import React, { useState } from 'react';
import user from './../assets/images/photo.jpg';
import logo from './../assets/images/download.png';
import {
  AiOutlineSearch,
  AiFillHome,
  AiOutlineContacts,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
//import { MdOutlineAccountCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [open, setOpen] = useState(false);
  const Menus = ['Profile', 'Your age', 'Setting', 'Logout'];

  const handleImageClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  return (
    <div className='border-solid bg-amber-100 sticky top-0 z-20 shadow-md shadow-gray-500/40'>
      <div className='flex items-center p-2 space-x-5'>
        <img src={logo} alt='logoBook' className='w-[50px] object-cover' />
        <div className='bg-gray-200 rounded-full flex items-center px-2 w-[300px] md:w-[400px] lg:w-[550px] shadow-md'>
          <AiOutlineSearch size={20} />
          <input
            className='bg-transparent p-2 w-full focus:outline-none'
            type='text'
            placeholder='Search for your book'
          />
        </div>
        <div className='pl-5 md:pl-10'>
          <div className='flex items-center space-x-5'>
            {/* Menu Button for Small Screens */}
            <button className='md:hidden' onClick={toggleMenu}>
              ☰
            </button>
            {/* Sidebar Navigation for Small Screens */}
            <div
              className={`md:hidden fixed top-0 h-full w-3/4 bg-white transition-transform duration-300 transform ${
                menuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className='p-4'>
                <button
                  className='text-2xl font-bold cursor-pointer mb-4'
                  onClick={toggleMenu}
                >
                  ✕
                </button>
                <NavLink
                  to='/'
                  className='flex items-center mb-4'
                  onClick={toggleMenu}
                >
                  <AiFillHome size={20} />
                  <span className='pl-2 font-bold cursor-pointer hover:underline'>
                    Home
                  </span>
                </NavLink>
                <NavLink
                  to='/help'
                  className='flex items-center mb-4'
                  onClick={toggleMenu}
                >
                  <BiHelpCircle size={20} />
                  <span className='pl-2 font-bold cursor-pointer hover:underline'>
                    Help
                  </span>
                </NavLink>
                <NavLink
                  to='/contact'
                  className='flex items-center mb-4'
                  onClick={toggleMenu}
                >
                  <AiOutlineContacts size={20} />
                  <span className='pl-2 font-bold cursor-pointer hover:underline'>
                    Contact
                  </span>
                </NavLink>
                {/*<NavLink
                  to='/account'
                  className='flex items-center mb-4'
                  onClick={toggleMenu}
                >
                  <MdOutlineAccountCircle size={20} />
                  <span className='pl-2 font-bold cursor-pointer hover:underline'>
                    Account
                  </span>
            </NavLink>*/}
                <NavLink
                  to='/carts'
                  className='flex items-center'
                  onClick={toggleMenu}
                >
                  <AiOutlineShoppingCart size={20} />
                  <span className='pl-2 font-bold cursor-pointer hover:underline'>
                    Carts
                  </span>
                </NavLink>
                <div className='relative'>
                <img
                  onClick={handleImageClick}
                  src={user}
                  alt="user"
                  className='h-14 w-18 object-cover border-4 border-gray-400 cursor-pointer rounded-full'
                />

                {open && (
                  <div className='p-4 bg-gray-300 w-40 shadow-lg absolute -left-14 top-20'>
                    <ul>
                      {Menus.map((menu) => (
                        <li
                          key={menu}
                          onClick={handleMenuItemClick}
                          className='p-2 text-lg cursor-pointer rounded hover:bg-blue-100'
                        >
                          {menu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                </div>
              </div>
            </div>
            {/* Regular Navigation for Medium and Larger Screens */}
            <div
              className={`md:flex items-center space-x-5 hidden ${
                menuOpen ? 'hidden' : 'block'
              }`}
            >
              <NavLink to='/' className='flex items-center'>
                <AiFillHome size={20} />
                <span className='pl-2 font-bold cursor-pointer hover:underline'>
                  Home
                </span>
              </NavLink>
              <NavLink to='/help' className='flex items-center'>
                <BiHelpCircle size={20} />
                <span className='pl-2 font-bold cursor-pointer hover:underline'>
                  Help
                </span>
              </NavLink>
              <NavLink to='/contact' className='flex items-center'>
                <AiOutlineContacts size={20} />
                <span className='pl-2 font-bold cursor-pointer hover:underline'>
                  Contact
                </span>
              </NavLink>
              {/*<NavLink to='/account' className='flex items-center'>
                <MdOutlineAccountCircle size={20} />
                <span className='pl-2 font-bold cursor-pointer hover:underline'>
                  Account
                </span>
            </NavLink>*/}
              <NavLink to='/carts' className='flex items-center'>
                <AiOutlineShoppingCart size={20} />
                <span className='pl-2 font-bold cursor-pointer hover:underline'>
                  Carts
                </span>
              </NavLink>
              <div className='relative'>
              <img
                onClick={handleImageClick}
                src={user}
                alt="user"
                className='h-14 w-18 object-cover border-4 border-gray-400 cursor-pointer rounded-full'
              />

              {open && (
                <div className='bg-white p-4 w-40 shadow-lg absolute -left-14 top-20'>
                  <ul>
                    {Menus.map((menu) => (
                      <li
                        key={menu}
                        onClick={handleMenuItemClick}
                        className='p-2 text-lg cursor-pointer rounded hover:bg-blue-100'
                      >
                        {menu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
