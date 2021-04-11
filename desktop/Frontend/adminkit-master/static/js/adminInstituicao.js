const url="http://127.0.0.1:8080";
let showForm= document.getElementById("instituition-add");
showForm.onclick= openForm;

let hideForm= document.getElementById("close-Form");
hideForm.addEventListener("click", closeForm);

function openForm(){
  document.getElementById("addInstituitionForm").className= "row mb-2 mb-xl-2 col-3  addForm mx-sm-auto";
   }
  
function closeForm(){
    document.getElementById("addInstituitionForm").className= "row mb-2 mb-xl-2 col-3 addForm mx-sm-auto d-none";
  }

  (function($) {
    "use strict";
  
    setUpInstituicao();
  
    async function setUpInstituicao() {

    const res = await fetch(url + '/api/institutions', {
      headers: {
          'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'GET',
      credentials: 'include'
  }); 
    const data = await res.json();
  
    let cent = data.map(el => Object.values(el));
$(document).ready(function() {
    $('#Table-instituition').DataTable({
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
    let tabela = document.getElementById("Table-instituition");
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
  });
    }
})(jQuery);