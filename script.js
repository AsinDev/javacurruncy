async function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (isNaN(amount)) {
    alert("Please enter a valid number");
    return;
  }

  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const converted = data.rates[to];

    document.getElementById("result").innerText =
      `Converted Amount: ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    alert("Error fetching live rates. Please try again later.");
  }
}

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

function filterDropdown(searchBoxId, dropdownElement) {
  const searchText = document.getElementById(searchBoxId).value.toLowerCase();
  dropdownElement.innerHTML = "";
  currencies.filter(c => c.toLowerCase().includes(searchText))
    .forEach(c => dropdownElement.innerHTML += `<option value="${c}">${c}</option>`);
}

populateDropdown(fromSelect);
populateDropdown(toSelect);

document.getElementById("searchFrom").addEventListener("input", () => {
  filterDropdown("searchFrom", fromSelect);
});

document.getElementById("searchTo").addEventListener("input", () => {
  filterDropdown("searchTo", toSelect);
});

fromSelect.value = "USD";
toSelect.value = "INR";
