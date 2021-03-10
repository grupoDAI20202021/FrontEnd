let showForm= document.getElementById("cam-add");
showForm.onclick= openForm;

let hideForm= document.getElementById("closeForm");
hideForm.addEventListener("click", closeForm);

$(document).ready(function() {
  let cent= new Array("helo","byek");
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
  });

  function openForm(){
    
document.getElementById("addTownForm").className= "row mb-2 mb-xl-2 col-3  mx-sm-auto";
  }
  function closeForm(){
    console.log("ewf") ;
    document.getElementById("addTownForm").className= "row mb-2 mb-xl-2 col-3  mx-sm-auto d-none";
      }