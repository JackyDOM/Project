import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Payment from './Payment';

const Carts = () => {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartsCollectionRef = collection(db, 'Carts');
        const snapshot = await getDocs(cartsCollectionRef);

        const cartItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCart(cartItems);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      const cartItemRef = doc(db, 'Carts', itemId);
      await deleteDoc(cartItemRef);
      alert('Item deleted from cart!');

      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const handleIncrementQuantity = async (itemId) => {
    try {
      const cartItemRef = doc(db, 'Carts', itemId);
      await updateDoc(cartItemRef, {
        quantity: (cart.find(item => item.id === itemId)?.quantity || 1) + 1,
      });

      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      );
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrementQuantity = async (itemId) => {
    try {
      const currentQuantity = cart.find(item => item.id === itemId)?.quantity || 1;

      if (currentQuantity > 1) {
        const cartItemRef = doc(db, 'Carts', itemId);
        await updateDoc(cartItemRef, {
          quantity: currentQuantity - 1,
        });

        setCart(prevCart =>
          prevCart.map(item =>
            item.id === itemId ? { ...item, quantity: currentQuantity - 1 } : item
          )
        );
      }
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const total = cart.reduce((acc, item) => acc + parseInt(item.price, 10) * (item.quantity || 1), 0);

  const handlePaymentDone = async () => {
    try {
      // Remove the items from the Firebase collection one by one
      for (const item of cart) {
        const cartItemRef = doc(db, 'Carts', item.id);
        await deleteDoc(cartItemRef);
        console.log(`Item with ID ${item.id} deleted from cart.`);
      }

      // Clear the cart and update any other state as needed
      setCart([]);
      setShowPayment(false);
      // Additional logic if needed after payment is done
    } catch (error) {
      console.error('Error deleting items from cart:', error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cart.map(item => (
          <div key={item.id} className="bg-gray-100 p-4 rounded-md shadow-md">
            <img
              src={item.ImageBook}
              alt="book"
              className="h-32 object-cover mb-4"
            />
            <p className="text-lg font-semibold mb-2">{item.title}</p>
            <p className="text-gray-600 mb-2">Price: {item.price} {'រៀល'}</p>
            <p className="text-gray-600 mb-2">Quantity: {item.quantity || 1}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleIncrementQuantity(item.id)}
                className="bg-green-500 hover:bg-green-700 active:bg-blue-800
                text-white font-bold py-2 px-4 rounded"
              >
                Increment
              </button>
              <button
                onClick={() => handleDecrementQuantity(item.id)}
                className="bg-yellow-500 hover:bg-yellow-700 active:bg-blue-800
                text-white font-bold py-2 px-4 rounded"
              >
                Decrement
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white active:bg-blue-800
                font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xl font-semibold mt-4">Total Price: {total} {'រៀល'}</p>
      {cart.length > 0 && (
        <button
          onClick={() => setShowPayment(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Pay Price
        </button>
      )}
      {showPayment && (
        <Payment onPaymentDone={handlePaymentDone} />
      )}
    </div>
  );
}

export default Carts;
