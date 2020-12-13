/* API */

// Rest Countries : https://restcountries.eu/rest/v2/currency/{currency}
// Exchange Rate : http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1

// Import axios - for fetch data from api
const axios = require("axios");

/* Method */

// 1. getExchangeRate
const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(
    "http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1"
  );

  const rate = response.data.rates;

  // get exchange rate
  const from_currency = 1 / rate[fromCurrency];

  const exchangeRate = rate[toCurrency] * from_currency;

  if (isNaN(exchangeRate)) {
    throw new Error(`cannot convert ${fromCurrency} & ${toCurrency} currency`);
  }

  return exchangeRate;
};

// 2. getCountries
const getCountries = async (toCurrency) => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${toCurrency}`
    );

    const country_names = response.data.map((country) => country.name);

    return country_names;
  } catch (error) {
    throw new Error(`cannot get country name from ${toCurrency} currency`);
  }
};

// 3. convertCurrency
const convertCurrency = async (fromCurrency, toCurrency, amountOfMoney) => {
  const countries = await getCountries(toCurrency);
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

  const convertedAmount = (amountOfMoney * exchangeRate).toFixed(2);

  return `${amountOfMoney} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. Spent the money in these following countries : ${countries}`;
};

/* Call the method */

// method return promises string, then call the method with promises
convertCurrency("USD", "HRK", 20)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error.message);
  });
