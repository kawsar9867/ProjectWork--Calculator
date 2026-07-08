const display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function handlePercentage() {
  let currentVal = display.value;
  if (currentVal === "") return;

  const parts = currentVal.split(/([\+\-\*\/])/);
  let lastNumberStr = parts[parts.length - 1];

  if (!lastNumberStr || isNaN(lastNumberStr)) return;

  let lastNumber = parseFloat(lastNumberStr);
  let percentageValue;

  if (parts.length >= 3) {
    let firstNumber = parseFloat(parts[0]);
    let operator = parts[1];

    if (operator === "+" || operator === "-") {
      percentageValue = (firstNumber * lastNumber) / 100;
    } else {
      percentageValue = lastNumber / 100;
    }
  } else {
    percentageValue = lastNumber / 100;
  }

  parts[parts.length - 1] = percentageValue;
  display.value = parts.join("");
}

function calculate() {
  try {
    if (display.value === "") return;

    const result = Function('"use strict"; return (' + display.value + ")")();
    display.value = Number(result.toFixed(8)).toString();
  } catch {
    display.value = "Error";
  }
}
