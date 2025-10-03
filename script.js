let ratesCache = {};
let baseCurrency = "USD";

async function loadRates() {
  try {
    const response = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`);
    const data = await response.json();
    ratesCache = data.rates;
    ratesCache[baseCurrency] = 1; // base currency rate = 1
    console.log("Rates loaded:", ratesCache);
  } catch (error) {
    alert("Error fetching live rates. Please check your internet connection.");
  }
}

function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (isNaN(amount)) {
    alert("Please enter a valid number");
    return;
  }

  if (!ratesCache[from] || !ratesCache[to]) {
    alert("Rates not available for selected currencies.");
    return;
  }

  const inBase = amount / ratesCache[from];
  const converted = inBase * ratesCache[to];

  document.getElementById("result").innerText =
    `Converted Amount: ${converted.toFixed(2)} ${to}`;
}

// Populate dropdowns
const currencies = [
  "USD","EUR","GBP","INR","JPY","AED","KWD","AUD","CAD","CHF","CNY","SGD","HKD",
  "NZD","SEK","NOK","DKK","ZAR","MYR","THB","PKR","BDT","LKR","OMR","QAR","BHD",
  "EGP","IDR","PHP","RUB","BRL","MXN","TRY","KRW","NGN","PLN","SAR","MAD","ARS",
  "ILS","CZK","HUF","CLP","COP","VND","KES","TZS","UGX","GHS","XOF","XAF","DZD",
  "TND","JOD","IQD","NPR","BTN","AFN","MVR","SCR","MUR","FJD","WST","TOP","PGK",
  "SBD","KZT","UZS","TMT","KGS","TJS","AZN","GEL","AMD","UAH","MDL","ALL","MKD",
  "BAM","HRK","ISK","BGN","RON","SRD","JMD","BSD","DOP","HNL","NIO","CRC","GTQ",
  "BOB","PEN","PYG","UYU","BZD","ANG","AWG","KYD","BMD","GIP","SHP","FKP"
];

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

function populateDropdown(selectElement) {
  selectElement.innerHTML = "";
  currencies.forEach(c => {
    selectElement.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

populateDropdown(fromSelect);
populateDropdown(toSelect);

fromSelect.value = "USD";
toSelect.value = "INR";

// Load rates once on page load
loadRates();
