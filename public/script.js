document.addEventListener("DOMContentLoaded", function () {
  const zipCodeInput = document.getElementById("zipCode");
  const countrySelect = document.getElementById("country");
  const clearButton = document.getElementById("clearButton");
  const messageContainer = document.getElementById("messageContainer");

  countrySelect.addEventListener("change", function () {
    if (countrySelect.value === "USA") {
      zipCodeInput.value = "12345";
    } else if (countrySelect.value === "Canada") {
      zipCodeInput.value = "12333";
    } else if (countrySelect.value === "UK") {
      zipCodeInput.value = "135457";
    } else {
      zipCodeInput.value = "";
    }
  });

  const formFields = document.querySelectorAll("input, select");
  formFields.forEach((field) => {
    field.addEventListener("blur", function () {
      if (!field.value.trim()) {
        messageContainer.innerText = `${field.placeholder} is required.`;
      } else {
        messageContainer.innerText = "";
      }
    });
  });

  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

   
    const userIdField = document.getElementById("userId");
    const userIdRegex = /^[a-zA-Z0-9]{6,20}$/;
    if (!userIdRegex.test(userIdField.value)) {
      messageContainer.innerText = "User ID must be between 6 and 20 characters (alphanumeric only).";
      return;
    }

    
    const passwordField = document.getElementById("password");
    if (passwordField.value.length < 8) {
      messageContainer.innerText = "Password must be at least 8 characters long.";
      return;
    }

    const nameField = document.getElementById("name");
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(nameField.value)) {
      messageContainer.innerText = "Name must contain only alphabets.";
      return;
    }
    const languages = document.querySelectorAll("input[name='languages']:checked");
    if (languages.length === 0) {
      messageContainer.innerText = "At least one language must be selected.";
      return;
    }
    const zipCodeField = document.getElementById("zipCode");
    if (!zipCodeField.value.trim()) {
      messageContainer.innerText = "ZIP Code is required.";
      return;
    }
    messageContainer.innerText = "Form submitted successfully!";
    registrationForm.reset();
  });

  clearButton.addEventListener("click", function () {
    const confirmation = window.confirm("Are you sure you want to clear the form?");
    if (confirmation) {
      registrationForm.reset();
      messageContainer.innerText = "";
    }
  });
});
