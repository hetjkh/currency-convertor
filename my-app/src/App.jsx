import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import AddCurrencyPage from './AddCurrencyPage';

function App() {
  const [products] = useState([
    { name: 'Product 1', price: 1000 },
    { name: 'Product 2', price: 2000 },
    { name: 'Product 3', price: 3000 },
    { name: 'Product 4', price: 4000 },
    { name: 'Product 5', price: 5000 },
    { name: 'Product 6', price: 6000 },
  ]);

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/currencies');
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Product Store</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200">Home</Link>
              <Link to="/add-currency" className="hover:text-blue-200">Add Currency</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/add-currency" element={<AddCurrencyPage />} />
            <Route path="/" element={
              <div>
                <h2 className="text-3xl font-bold mb-6">Product List</h2>
                {isLoading ? (
                  <p className="text-center">Loading currencies...</p>
                ) : (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Select Currency</h3>
                    <div className="flex flex-wrap gap-2">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => setSelectedCurrency(currency.code)}
                          className={`px-4 py-2 rounded ${
                            selectedCurrency === currency.code
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-blue-600 border border-blue-600'
                          }`}
                        >
                          {currency.name} ({currency.code})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <ProductCard
                      key={index}
                      productName={product.name}
                      productPrice={product.price}
                      currency={selectedCurrency}
                    />
                  ))}
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;