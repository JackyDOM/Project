import React, { useState } from 'react';

function Payment({ onPaymentDone }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleDone = () => {
    if (!username || !email) {
      setError('Username and email are required');
    } else {
      // Perform any payment processing logic here

      // Notify the parent component (Carts) that payment is done
      onPaymentDone();

      // Clear user input and error
      setUsername('');
      setEmail('');
      setError('');
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Payment Details</h2>
      {error && (
        <div className="mb-4 text-red-500">{error}</div>
      )}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 p-2 border rounded-md w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 border rounded-md w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handleDone}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Done
      </button>
    </div>
  );
}

export default Payment;
