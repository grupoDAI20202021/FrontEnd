function changeEmail() {
    const email = document.getElementById("email_change").value;
    fetch("http://127.0.0.1:8080/api/institutions/{idInstitution}/email", {
      method: "PUT",
      body: { email: email },
    })
    .then((res) => {
    console.log(res);
    })
    .catch((error) => {
    console.log(error);
    });
}

function changePassword() {
    const password = document.getElementById("password_change").value;
    fetch("http://127.0.0.1:8080/api/institutions/{idInstitution}/password", {
      method: "PUT",
      body: { password: password, confirmPassword: confirmPassword },
    })
    .then((res) => {
    console.log(res);
    })
    .catch((error) => {
    console.log(error);
    });
}

