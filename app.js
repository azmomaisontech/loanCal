const amount = document.getElementById("amount");
const interest = document.getElementById("interest");
const repayYear = document.getElementById("years");
const form = document.getElementById("loan-form");
const imgGif = document.getElementById("loading");
const result = document.getElementById("results");

imgGif.style.display = "none";
result.style.display = "none";

form.addEventListener("submit", function(e) {
  e.preventDefault();
  result.style.display = "none";
  imgGif.style.display = "block";

  setTimeout(calculateLoanPayment, 2000);
});

function calculateLoanPayment() {
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    imgGif.style.display = "none";

    result.style.display = "block";

    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError("Please enter valid numbers");
  }
}

function showError(message) {
  imgGif.style.display = "none";

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(message));

  card.insertBefore(errorDiv, heading);

  setTimeout(function() {
    errorDiv.remove();
  }, 2000);
}
