function signUp() {
  document.getElementById("container").classList.add("right-panel-active");
}

function signIn() {
  document.getElementById("container").classList.remove("right-panel-active");
}
window.onload = async function () {
  localStorage.clear();
  const botaoLogin = document.getElementById("botaoLogin");


  botaoLogin.addEventListener("click", entrar);


  async function entrar() {
      event.preventDefault();
      var data = {};

      data.email = document.getElementById("email_login").value.trim();
      data.password = document.getElementById("password_login").value.trim();

      fetch('http://127.0.0.1:8080/api/auth/signin', {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'include'
      })
          .then(function (response) {

              console.log(response);
              if (!response.ok) {
                  throw new Error(response.statusText);
              }
              return response.json();
          })
          .catch(function (err) {
              console.log(err);
          })
          .then(async function (result) {
              if (result) {
                  localStorage.setItem("userLogado", result.userId);
                  localStorage.setItem("RoleLogado", result.role);
                  localStorage.setItem("EmailLogado", document.getElementById("email_login").value.trim());
                  localStorage.setItem("accessToken", result.accessToken);
                console.log(result.role);
                  Swal.fire("Sucesso!",
                      "Autenticado com sucesso!",
                      "success")
                      .then(() => {
                        if (result.role == "ROLE_INSTITUTION") {
                          setUpTownHall();  

                      } if (result.role == "ROLE_ADMINISTRATOR") {
                          window.location.replace("../html/AdminDashboard.html");
                          console.log(result);
                          
                      }
                      if (result.role == "ROLE_TOWNHALL") {
                        window.location.replace("../html/CamaraDashboard.html");
                      }
                  });
              } else {
                  Swal.fire(
                      'Os dados que inseriu não estão corretos!',
                      '',
                      'warning'
                  )
                  console.log(result);

              }

          });

  };
   
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function setUpTownHall() {
  fetch('http://127.0.0.1:8080/api/institutions/'+ localStorage.getItem("userLogado")+'/townhall',{
    credentials: 'include'
  })
  .then(res => res.json())
  .then((out) => {
  localStorage.setItem("idTownHall",out);
  window.location.replace("../html/InstituicaoDashboard.html");
});
}



    
