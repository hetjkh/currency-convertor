const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://hetjani818:123@cluster0.luh9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const currencySchema = new mongoose.Schema({
  code: String,
  name: String,
});

const Currency = mongoose.model('Currency', currencySchema);

// Add a new currency
app.post('/api/currencies', async (req, res) => {
  const { code, name } = req.body;
  const newCurrency = new Currency({ code, name });
  await newCurrency.save();
  res.json(newCurrency);
});

// Get all currencies
app.get('/api/currencies', async (req, res) => {
  const currencies = await Currency.find();
  res.json(currencies);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
