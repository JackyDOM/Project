import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import {collection, getDocs} from 'firebase/firestore'
import Marquee from 'react-fast-marquee';
import HomeCategory from './HomeCategory';

const list = [
  'All Genre', 'Comics', 'Science', 'Horror', 'Romantic', 'Novel', 'Mind Set', 'BacII', 'Free',
  'Selling', 'Sort By'
]

function HomePage1() {

  const [imageBanner, setImageBanner] = useState([]);
  const imagesCollectionRef = collection(db, `HomePage`);

  /*
  const [categories, setCategories] = useState([]);
  const headCategories = collection(db, `HeadCategory`);
  */

  useEffect(() => {
    const getImages = async () => {
      const data = await getDocs(imagesCollectionRef);
      setImageBanner(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getImages();
  }, [imagesCollectionRef]);


  /*
  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(headCategories);
      setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
  
    getCategories();
  }, [headCategories])
  */

  return (
    <div className=' bg-gray-100'>
    <Marquee className="relative z-10 overflow-hidden">
      <div className='whitespace-nowrap my-3'>
        {imageBanner.map((imageBanner) => (
          <img
            key={imageBanner.id}
            src={imageBanner.ImageBanner}
            alt="banner"
            className={`w-full md:w-[500px] lg:w-[1200px] object-cover
              cursor-pointer ${window.innerWidth > 768 ? 'hover:scale-105 ease-in-out' : ''} 
              duration-300 h-[200px] mx-2`}
          />
        ))}
      </div>
      </Marquee>



    <div className=''>
      <ul className='flex flex-row gap-8 overflow-y-auto'>
      {
        list.map((item)=>(
          <li className='px-9 py-2 cursor-pointer bg-gray-800 rounded-full
           text-white mt-2 whitespace-nowrap shadow-lg shadow-gray-600/50'>
            {item}
          </li>
        ))
      }
      </ul>
    </div>

    {/*<div>
      {categories.map((categories) => {
        return(
          <div>
            <link href={categories.Url} />
          </div>
        );
      })}
    </div>*/}
    <HomeCategory />
    </div>
  );
}

export default HomePage1