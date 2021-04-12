const url="http://127.0.0.1:8080";

let showForm= document.getElementById("cam-add");
showForm.onclick= openForm;

let hideForm= document.getElementById("close-Form");
hideForm.addEventListener("click", closeForm);

function openForm(){
  document.getElementById("addTownForm").className= "row mb-2 mb-xl-2 col-3 addForm mx-sm-auto";
   }
  
function closeForm(){
    document.getElementById("addTownForm").className= "row mb-2 mb-xl-2 col-3 addForm mx-sm-auto d-none";
  }

  (function($) {
    "use strict";
  
    setUpCamara();
  
    async function setUpCamara() {

    const res = await fetch(url + '/api/townhalls', {
      headers: {
          'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'GET',
      credentials: 'include'
  }); 
    const data = await res.json();
    console.log(data);
  
    let cent = data.map(el => Object.values(el));
    console.log(cent)
$(document).ready(function() {
    $('#Table-town-hall').DataTable({
      autoFill:true,
      "language": {
        "lengthMenu": "Mostrar _MENU_ câmara por página",
        "zeroRecords": "Nada encontrado",
        "info": "Mostrar página _PAGE_ de _PAGES_",
        "infoEmpty": "Nenhhuma câmara",
        "infoFiltered": "(Filtrado _MAX_ centralista)",
        "search": "Procurar:",
        "paginate": {
          "next": "Próxima",
          "previous": "Anterior"
        }
      },
      data: cent,
      "lengthMenu": [
        [-1, 10, 25, 50],
        ["Todos", 10, 25, 50]
      ],
      /* "columnDefs": [{
         "targets": [3],
         "visible": false,
         "searchable": false
       }]*/
    });
    let tabela = document.getElementById("Table-town-hall");
      let linhas = tabela.getElementsByTagName("tr");

      for (let i = 0; i < linhas.length; i++) {
        var linha = linhas[i];
        linha.addEventListener("click", function() {
          //Adicionar ao atual
          selLinha(this, false); //Selecione apenas um
          //selLinha(this, true); //Selecione quantos quiser
        });
      }

      function selLinha(linha, multiplos) {
        if (!multiplos) {
          let linhas = linha.parentElement.getElementsByTagName("tr");
          for (let i = 0; i < linhas.length; i++) {
            var linha_ = linhas[i];
            linha_.classList.remove("selecionado");
          }
        }
        linha.classList.toggle("selecionado");
      }

      let btnEliminar = document.getElementById("cen-delete");

      btnEliminar.addEventListener("click", function() {

        let selecionados = tabela.getElementsByClassName("selecionado");
        //Verificar se está selecionado
        if (selecionados.length < 1) {
          swal({
            title: "Selecione uma linha!",
            icon: "info",
          });
          return false;
        }

        for (let i = 0; i < selecionados.length; i++) {
          let selecionado = selecionados[i];
          selecionado = selecionado.getElementsByTagName("td");
          for (const ln of selecionados) {
            swal({
                title: "Pretende eliminar a camara " + selecionado[1].innerHTML + " ?",
                icon: "warning",  
                buttons: ["Sim", "Não"],
                //dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {}
                else {
                  $(document).ready(function() {
                    setUpDataTable1();
                  });

                  async function setUpDataTable1() {
                    let a = selecionado[0].innerHTML;
                    for (const value of data) {
                      if(value.email === a){
                        await fetch(url + '/api/townhalls/' + value.idTownHall, { method: "DELETE" })
                        .then(function(response) {
                          if (!response.ok) {
                            console.log(response.status); //=> number 100â€“599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url); //=> String
                           
                          }
                          else {
                            swal({
                              title: "A câmara " + value.name + " foi removido com sucesso!",
                              icon: "success",
                            });
                                  ln.remove();
                                }
                        });
                    }
                      }
                    }
                }
              });
          }
        }
      });
  });
}
})(jQuery);
  