var options = {
  key: "rzp_test_40QZvXp0TVqCeM", // Enter your Razorpay Key ID
  amount: 50000, // Amount is in currency subunits. 1000 = 10 INR
  currency: "INR",
  name: "Acme Corp",
  description: "Test Payment",
  image: "https://example.com/logo.png",
  handler: function (response) {
    alert("Payment successful: " + response.razorpay_payment_id);
  },
};

var rzpButton = document.getElementById("btn");

rzpButton.onclick = function (e) {
  var rzp = new Razorpay(options);
  rzp.open();
  e.preventDefault();
};
