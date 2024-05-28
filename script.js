document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const surname = document.getElementById("surname").value;
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const passportNumber = document.getElementById("passportNumber").value;
    const flightCode = document.getElementById("flightCode").value;
    const seatCount = parseInt(document.getElementById("ticketNumber").value);
    const messageDiv = document.getElementById("message");
    const nextButton = document.getElementById("next");
    messageDiv.innerHTML = "Loading...";    


    if (nextButton.value == "Next")
      {
        window.location.href = "www.google.com";
      }

    if (
      name == "" ||
      surname == "" ||
      dob == "" ||
      passportNumber == "" ||
      flightCode == "" ||
      isNaN(seatCount)
    ) {
      createError("Please Fill All Information.", messageDiv);
      return;
    }

    const isAdult = checkIfAdult(new Date(dob));
    if (!isAdult) {
      createError("The customer cannot be under 18.", messageDiv);
      return;
    }

    checkSeatAvailability(flightCode, seatCount).then((seatAvailable) => {
      if (!seatAvailable) {
        createError(
          "Not enough seats available for the passenger number.",
          messageDiv
        );
        return;
      }

      checkVisa(passportNumber).then((visaValid) => {
        if (!visaValid) {
          createError(
            "The Passport Number provided was not correct.",
            messageDiv
          );
          return;
        }
        formFilled = createCompletion(messageDiv, nextButton);
      });
    });
  });

function createError(error, messageDiv) {
  messageDiv.innerHTML = error;
  messageDiv.style.display = "block";
  messageDiv.style.color = "red";
}
function createCompletion(messageDiv, nextButton) {
  messageDiv.innerHTML = "The Booking was succesfull";
  messageDiv.style.display = "block";
  messageDiv.style.color = "green";  
  nextButton.value = "Next";
  return true;
}

function checkIfAdult(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 18;
}

function checkSeatAvailability(flightCode, seatCount) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const availableSeats = 100;
      resolve(seatCount <= availableSeats);
    }, 1000);
  });
}

function checkVisa(passportNumber) {
  return new Promise((resolve) => {
    setTimeout(() => {
      //hardcoded
      const visaValid = true;
      resolve(visaValid);
    }, 1000);
  });
}
