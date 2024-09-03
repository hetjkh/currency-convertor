import React, { useState, useEffect } from 'react';
import { Converter } from 'easy-currencies';

const ProductCard = ({ productName, productPrice, currency }) => {
  const [convertedPrice, setConvertedPrice] = useState(productPrice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const convertCurrency = async () => {
      setIsLoading(true);
      try {
        const converter = new Converter();
        const value = await converter.convert(productPrice, 'INR', currency);
        setConvertedPrice(value);
      } catch (error) {
        console.error('Currency conversion error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    convertCurrency();
  }, [currency, productPrice]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{productName}</h2>
        {isLoading ? (
          <p className="text-gray-600">Converting price...</p>
        ) : (
          <h3 className="text-2xl font-bold text-blue-600">
            {convertedPrice.toFixed(2)} {currency}
          </h3>
        )}
      </div>
      <div className="bg-gray-100 px-6 py-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
