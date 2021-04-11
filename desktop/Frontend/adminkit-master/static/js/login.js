function signUp() {
  document.getElementById("container").classList.add("right-panel-active");
}

function signIn() {
  document.getElementById("container").classList.remove("right-panel-active");
}
function login() {
  const email = document.getElementById("email_login").value;
  const password = document.getElementById("password_login").value;
  fetch("http://127.0.0.1:8080/api/", {
    method: "POST",
    body: { email: email, password: password },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

function register() {
  const name = document.getElementById("name_register").value;
  const email = document.getElementById("email_register").value;
  const password = document.getElementById("password_register").value;
  //if (email.match(//))
  if (password.match(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$/)) {
    fetch("http://127.0.0.1:8080/api/", {
      method: "POST",
      body: { name: name, email: email, password: password },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
