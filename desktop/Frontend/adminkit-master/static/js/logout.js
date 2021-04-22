
document.getElementById("logout").addEventListener("click",logout);


     function logout() {
        fetch('http://127.0.0.1:8080/api/auth/logout', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            headers: {
               // 'Authorization': 'Bearer '+ localStorage.getItem("accessToken"),
                'Cookie': 'token='+localStorage.getItem("accessToken")
             }
        })
        
        .then(res => res.json())
        .then((out) => {  window.location.href="../html/login.html";
        }).catch(err => console.error(err));
       

    }
