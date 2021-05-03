function changeEmail() {
  const email = document.getElementById("email_change").value;
  fetch(
    `http://127.0.0.1:8080/api/institutions/${localStorage.getItem(
      "userLogado"
    )}`,
    {
      method: "PUT",
      body: { email: email },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

function changePassword() {
  const password = document.getElementById("password_change").value;
  const confirmPassword = document.getElementById("password_confirm").value;
  fetch(
    `http://127.0.0.1:8080/api/institutions/${localStorage.getItem(
      "userLogado"
    )}/password`,
    {
      method: "PUT",
      body: { password: password, confirmPassword: confirmPassword },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.onload = function () {
  const role = localStorage.getItem("RoleLogado");
  const user = localStorage.getItem("userLogado");
  let endpoint;
  if (role === "ROLE_INSTITUTION") {
    endpoint = "institution";
  }
  if (role === "ROLE_TOWNHALL") {
    endpoint = "townhall";
  }
  fetch(`http://127.0.0.1:8080/api/${endpoint}/${user}`).then((response) => {
    if (role === "ROLE_INSTITUTION") {
      document.getElementById("instit_nome").innerHTML = response.name;
    }
    if (role === "ROLE_TOWNHALL") {
      document.getElementById("Camara_Admin_Nome").innerHTML = response.name;
    }
  });
};
