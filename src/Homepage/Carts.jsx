import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Carts() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch the cart data from Firebase when the component mounts
    const fetchCartData = async () => {
      try {
        const cartsCollectionRef = collection(db, 'Carts');
        const snapshot = await getDocs(cartsCollectionRef);

        // Extract the cart items from the snapshot
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
      
      // Update the local state to reflect the change
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

      // Update the local state to reflect the change
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

        // Update the local state to reflect the change
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

  // Calculate total price considering the quantity
  const total = cart.reduce((acc, item) => acc + parseInt(item.price, 10) * (item.quantity || 1), 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {cart.map((item, index) => (
          <div key={index}>
            <img
              src={item.ImageBook}
              alt="book"
              style={{ width: '100px', height: '100px', margin: '5px' }}
            />
            <p>Title: {item.title}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity || 1}</p>
            <button
              onClick={() => handleIncrementQuantity(item.id)}
              className="bg-green-500 hover:bg-green-700 active:bg-blue-800
              text-white font-bold py-2 px-4 rounded mr-2"
            >
              Increment
            </button>
            <button
              onClick={() => handleDecrementQuantity(item.id)}
              className="bg-yellow-500 hover:bg-yellow-700 active:bg-blue-800
              text-white font-bold py-2 px-4 rounded mr-2"
            >
              Decrement
            </button>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="bg-red-500 hover:bg-red-700 active:bg-blue-800
              text-white font-bold py-2 px-4 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <p>Total Price: {total} {'រៀល'}</p>
    </div>
  );
}

export default Carts;
