import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function HomeCategory() {
  const [documents, setDocuments] = useState([]);
  const [openDescriptionIndex, setOpenDescriptionIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const containerRef = doc(db, 'PopularSection', 'Container');
      const bookPopularRef = collection(containerRef, 'BookPopular');

      try {
        const snapshot = await getDocs(bookPopularRef);
        const documentArray = [];

        snapshot.forEach((doc) => {
          const { ImageBook, title, price, decs } = doc.data();
          documentArray.push({ ImageBook, title, price, decs });
        });

        setDocuments(documentArray);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchData();
  }, []);

  const toggleDescription = (index) => {
    setOpenDescriptionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const addToCart = async (document) => {
    try {
      const cartsCollectionRef = collection(db, 'Carts');
      await addDoc(cartsCollectionRef, document);
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-semibold mb-4">Popular Books Section</h1>
      <div className="flex overflow-x-auto">
        {documents.map((document, index) => (
          <div key={index} className="flex-shrink-0 w-64 p-4 rounded shadow-md mr-4">
            <img
              className="cursor-pointer h-48 object-cover mb-4"
              src={document.ImageBook}
              alt="book"
            />
            <button
              className="text-blue-500 underline mb-2 focus:outline-none"
              onClick={() => toggleDescription(index)}
            >
              Description
            </button>
            {openDescriptionIndex === index && (
              <p className="text-gray-700 mb-2">Description: {document.decs}</p>
            )}
            <p className="font-semibold text-lg mb-2">Title: {document.title}</p>
            <p className="text-gray-600 mb-4">Price: {document.price}</p>
            <button
              onClick={() => addToCart(document)}
              className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold 
                py-2 px-4 rounded mt-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <p>Hello E-BOOKS</p>
    </div>
  );
}

export default HomeCategory;
