import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCurrencyPage = () => {
  const [currencyName, setCurrencyName] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new currency object
    const newCurrency = {
      name: currencyName,
      code: currencyCode,
    };

    try {
      // Send a POST request to the backend to add the new currency
      const response = await fetch('http://localhost:5000/api/currencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCurrency),
      });

      if (response.ok) {
        console.log('Currency added successfully');
        navigate('/'); // Navigate back to the home page after adding the currency
      } else {
        console.error('Failed to add currency');
      }
    } catch (error) {
      console.error('Error adding currency:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Currency</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currencyName" className="block text-sm font-medium text-gray-700">
            Currency Name
          </label>
          <input
            type="text"
            id="currencyName"
            value={currencyName}
            onChange={(e) => setCurrencyName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="currencyCode" className="block text-sm font-medium text-gray-700">
            Currency Code
          </label>
          <input
            type="text"
            id="currencyCode"
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Currency
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCurrencyPage;
