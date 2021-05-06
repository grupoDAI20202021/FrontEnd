const updatePassword = document.getElementById("updatepass")
updatePassword.onclick= changePassword;

const updateEmail = document.getElementById("updateEmail")
updateEmail.onclick= changeEmail;

function changeEmail() {
  const email = document.getElementById("email_change").value;
  let endpoint;
  if (role === "ROLE_INSTITUTION") {
    endpoint = "institution";
  }
  if (role === "ROLE_TOWNHALL") {
    endpoint = "townhall";
  }
  fetch(`http://127.0.0.1:8080/api/${endpoint}/${localStorage.getItem(
      "userLogado"
    )}`,
    {
      headers: {
        'Content-Type': 'application/json'
    },
      method: "PUT",
      body:JSON.stringify(data),
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
<<<<<<< HEAD
  const password = document.getElementById("password_change").value;
  const confirmPassword = document.getElementById("password_confirm").value;
  let endpoint;
  if (role === "ROLE_INSTITUTION") {
    endpoint = "institution";
  }
  if (role === "ROLE_TOWNHALL") {
    endpoint = "townhall";
  }
  fetch(`http://127.0.0.1:8080/api/${endpoint}/${localStorage.getItem(
    "userLogado"
  )}/password`,
=======
  let data= {};
  data.password = document.getElementById("newPass").value;
   data.confirmPassword = document.getElementById("confirmPass").value;
  data.oldPassword= "wrbsfd";
  fetch(
    `http://127.0.0.1:8080/api/institutions/${localStorage.getItem(
      "userLogado"
)}/password`,
>>>>>>> a0f9da041d74dfd174bd0bc337ef64ee12b50b2c
    {
      headers: {
        'Content-Type': 'application/json'
    },
      method: "PUT",
      body:JSON.stringify(data),
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
    endpoint = "institutions";
  }
  if (role === "ROLE_TOWNHALL") {
    endpoint = "townhalls";
  }
  fetch(`http://127.0.0.1:8080/api/${endpoint}/${user}`)
  .then(res2 => res2.json())
  .then((out2) => {
    console.log(out2)
    if (role === "ROLE_INSTITUTION") {
      document.getElementById("instit_nome").innerHTML = out2.name;
    }
    if (role === "ROLE_TOWNHALL") {
      document.getElementById("Camara_Admin_Nome").innerHTML =out2.name;
    }

  }).catch(err => console.error(err));
 
};

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

