import React, { useState, useEffect } from 'react';
import { Converter } from 'easy-currencies';

const CurrencyConverter = ({ productPrice }) => {
  const [convertedPrice, setConvertedPrice] = useState(productPrice);
  const [currency, setCurrency] = useState('INR');
  const [converter] = useState(new Converter());

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const value = await converter.convert(productPrice, 'INR', currency);
        setConvertedPrice(value);
      } catch (error) {
        console.error('Currency conversion error:', error);
      }
    };

    convertCurrency();
  }, [currency, productPrice, converter]);

  return (
    <div>
      <h3>Price: {convertedPrice} {currency}</h3>
      <div>
        <button onClick={() => setCurrency('USD')}>USD</button>
        <button onClick={() => setCurrency('GBP')}>GBP</button>
        <button onClick={() => setCurrency('EUR')}>EUR</button>
        <button onClick={() => setCurrency('JPY')}>JPY</button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
