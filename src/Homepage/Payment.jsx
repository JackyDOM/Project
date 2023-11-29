import React from 'react';
import { useHistory } from 'react-router-dom';

function Payment() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="text-center mt-8">
      <div className="text-2xl font-semibold mb-4">Payment</div>
      <button
        onClick={handleGoBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back to Cart
      </button>
    </div>
  );
}

export default Payment;
