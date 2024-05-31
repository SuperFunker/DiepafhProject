const messageDiv = document.getElementById("message");
const nextButton = document.getElementById("next");
var registrationNumber;

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

document.addEventListener("DOMContentLoaded", function () {
  registrationNumber = getQueryVariable("variable");  
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
    messageDiv.innerHTML = "Loading...";

    if (nextButton.value == "Finish") {
      window.location.href =
        "index.html?variable=" +
        encodeURIComponent(localStorage.getItem("checkNum"));
      return;
    }

    if (nextButton.value == "Sumbit") {      
      
        createSuccess("Check-In Completed Successfully.<br>Confirmation Sent as SMS.",messageDiv);
        nextButton.value = "Finish";
        nextButton.style.width = "6rem";                              
    }

    if (nextButton.value == "Continue") {
      togglePayment(true);
      messageDiv.style.display = "none";
      nextButton.value = "Sumbit";
      nextButton.style.width = "5rem";            
      return;
    }

    if (nextButton.value == "Check") {
      if (resNumber == "" || !checkResNumber(resNumber)) {
        createError("Invalid Reservation Number", messageDiv);
      } else {
        createSuccess("Check-In Number Found Successfully", messageDiv);
        nextButton.value = "Continue";
        nextButton.style.width = "6rem";
      }
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
  });
