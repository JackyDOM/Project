import React, { useRef, useState } from 'react';
import user from './../assets/images/photo.jpg';

function Account() {
  const [open, setOpen] = useState(false);
  const Menus = ['Profile', 'Your age', 'Setting', 'Logout'];
  const menuRef = useRef();
  const imgRef = useRef();

  const handleImageClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  // Remove the window click event listener

  return (
    <div className='h-screen bg-gray-200 flex pt-12 justify-center'>
      <div className='relative'>
        <img
          ref={imgRef}
          onClick={handleImageClick}
          src={user}
          alt="user"
          className='h-14 w-18 object-cover border-4 border-gray-400 cursor-pointer rounded-full'
        />

        {open && (
          <div ref={menuRef} className='bg-white p-4 w-52 shadow-lg absolute -left-14 top-20'>
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
  );
}

export default Account;
