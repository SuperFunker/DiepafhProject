const messageDiv = document.getElementById("message");
const nextButton = document.getElementById("next");
var registrationNumber;
var payment = 0;

function togglePayment(toggle) {
  const divs = document.querySelectorAll(".booking-part");
  const resDiv = document.getElementById("res-div");
  if (toggle) {
    divs.forEach(function (div) {
      div.style.display = "block";
    });
    resDiv.style.display = "none";
  } else {
    divs.forEach(function (div) {
      div.style.display = "none";
    });
    resDiv.style.display = "block";
  }
}
function getRandomPrice(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

document.addEventListener("DOMContentLoaded", function () {
  registrationNumber = getQueryVariable("variable");
  payment = getRandomPrice(80, 330);
  document.getElementById("resNum").value = registrationNumber;
  togglePayment(false);

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return false;
  }
});

document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const resNumber = document.getElementById("resNum").value;
    const amount = document.getElementById("amount");

    amount.placeholder = payment;
    messageDiv.innerHTML = "Loading...";

    if (nextButton.value == "Next") {
      window.location.href =
        "checkinScreen.html?variable=" +
        encodeURIComponent(localStorage.getItem("checkNum"));
      return;
    }

    if (nextButton.value == "Sumbit") {
      const cardNumber = document.getElementById("cardNumber").value;
      const mobileNumber = document.getElementById("mobile").value;

      if (cardNumber == "" || mobileNumber == "" || amount.value == "") {
        createError("Please Complete All Fields.", messageDiv);
        return;
      }
      checkCard(cardNumber).then((cardValid) => {
        if (!cardValid) {
          createError("The Card Number provided is not correct.", messageDiv);
          return;
        }
        if (mobileNumber.toString().length != 10) {
          createError("The Mobile Phone provided is not correct", messageDiv);
          return;
        }
        if (amount.value != payment) {
          createError("The Payment Amount provided is not correct", messageDiv);
          return;
        }        
        nextButton.value = "Next";
        nextButton.style.width = "6rem";
        const checkNumber = getRandomCheckinNumber();
        createSuccess("Reservation Payment Successfull <br><br> Check-In Number: <br><b>" + checkNumber + "</b>", messageDiv);
        localStorage.setItem("checkNum", checkNumber);
      });
    }

    if (nextButton.value == "Continue") {
      togglePayment(true);
      messageDiv.style.display = "none";
      nextButton.value = "Sumbit";
      nextButton.style.width = "5rem";
      const price = document.getElementById("price");
      price.innerHTML = "<h3>Price: " + payment + "&#8364;</h>";
      return;
    }

    if (nextButton.value == "Check") {
      if (resNumber == "" || !checkResNumber(resNumber)) {
        createError("Invalid Reservation Number", messageDiv);
      } else {
        createSuccess("Reservation Number Found Successfully", messageDiv);
        nextButton.value = "Continue";
        nextButton.style.width = "6rem";
      }
    }

    function getRandomCheckinNumber() {
      return Math.floor(100000 + Math.random() * 900000);
    }
    function createError(error, messageDiv) {
      messageDiv.innerHTML = error;
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
    }
    function createSuccess(message, messageDiv) {
      messageDiv.innerHTML = message;
      messageDiv.style.display = "block";
      messageDiv.style.color = "green";
    }

    function checkResNumber(resNumber) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const resValid = resNumber == registrationNumber ? true : false;
          resolve(resValid);
        }, 1000);
      });
    }
    function checkCard(cardNumber) {
      return new Promise((resolve) => {
        setTimeout(() => {
          //hardcoded
          const cardValid = cardNumber.toString().length != 16 ? false : true;
          resolve(cardValid);
        }, 1000);
      });
    }
  });
