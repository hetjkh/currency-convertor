import React, { useState } from 'react';

const AddCurrencyForm = ({ onAddCurrency }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/currencies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, name }),
    });

    const newCurrency = await response.json();
    onAddCurrency(newCurrency);
    setCode('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Currency Code:</label>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
      </div>
      <div>
        <label>Currency Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <button type="submit">Add Currency</button>
    </form>
  );
};

export default AddCurrencyForm;
