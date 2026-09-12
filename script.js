const DEMO_USERS = {
  admin: "password123",
  demo: "demo123",
};

const form = document.querySelector(".login-form");
const messageEl = document.getElementById("form-message");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberInput = document.querySelector('input[name="remember"]');

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `form-message ${type}`;
  messageEl.hidden = false;
}

function hideMessage() {
  messageEl.hidden = true;
  messageEl.className = "form-message";
  messageEl.textContent = "";
}

function loadRememberedUsername() {
  const savedUsername = localStorage.getItem("rememberedUsername");
  if (!savedUsername) {
    return;
  }

  usernameInput.value = savedUsername;
  rememberInput.checked = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  hideMessage();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (DEMO_USERS[username] === password) {
    if (rememberInput.checked) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    form.classList.add("is-hidden");
    showMessage(`Welcome, ${username}! You are now logged in.`, "success");
    return;
  }

  showMessage("Invalid username or password. Try admin / password123 or demo / demo123.", "error");
  passwordInput.value = "";
  passwordInput.focus();
});

document.querySelector(".back-btn").addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  }
});

document.querySelector(".register-link").addEventListener("click", (event) => {
  event.preventDefault();
  showMessage("Registration is not set up yet. Use the demo accounts to log in.", "info");
});

loadRememberedUsername();
