const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (selects of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;
    if (selects.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (selects.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    selects.append(newOption);
  }

  selects.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (elem) => {
  let currCode = elem.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = elem.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 0) {
    amount.value = "1";
    amtVal = 1;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmt = amtVal * rate;
  msg.innerHTML = `${amtVal} ${fromCurr.value} = ${parseFloat(
    finalAmt.toFixed(2)
  )} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  updateExchangeRate();
});
