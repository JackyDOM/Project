import React from 'react';

function Contact() {
  return (
    <div className='contact'>
      <div className='pl-5 mb-8'>
        <p className='font-bold text-2xl mb-2 underline text-blue-600'>Contact us</p>
        <p className='font-bold text-lg text-gray-500'>
          Let us know what you need, and we will get back to you as soon as possible.
        </p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <label htmlFor='username' className='font-bold text-lg cursor-pointer mb-1'>
          Username
        </label>
        <input
          type='text'
          id='username'
          placeholder='Username'
          className='border rounded-lg border-gray-500 pl-3 w-full max-w-[400px] h-[40px] mb-3 shadow-lg'
        />
        <label htmlFor='email' className='font-bold text-lg cursor-pointer mb-1'>
          Email
        </label>
        <input
          type='text'
          id='email'
          placeholder='Email'
          className='border rounded-lg border-gray-500 pl-3 w-full max-w-[400px] h-[40px] mb-3 shadow-lg'
        />
        <label htmlFor='subject' className='font-bold text-lg cursor-pointer mb-1'>
          Subject
        </label>
        <input
          type='text'
          id='subject'
          placeholder='Subject'
          className='border rounded-lg border-gray-500 pl-3 w-full max-w-[400px] h-[40px] mb-3 shadow-lg'
        />
        <label htmlFor='message' className='font-bold text-lg cursor-pointer mb-1'>
          Message
        </label>
        <textarea
          id='message'
          placeholder='Message'
          className='border rounded-lg border-gray-500 pl-3 w-full max-w-[400px] h-[100px] mb-6 shadow-lg pt-2'
        />
        <button className='bg-blue-700 border border-black text-white rounded-lg w-full max-w-[200px] h-[40px] mb-2 shadow-lg cursor-pointer'>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Contact;
