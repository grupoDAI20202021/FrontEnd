let showForm= document.getElementById("eval-activity");
showForm.onclick= openForm;

let hideForm= document.getElementById("close-Form");
hideForm.addEventListener("click", closeForm);

function openForm(){
  document.getElementById("eval-activity-form").className= "mb-2 mb-xl-2 col-9  addForm mx-sm-auto";
   }
  
function closeForm(){
    document.getElementById("eval-activity-form").className= "mb-2 mb-xl-2 col-9  addForm mx-sm-auto d-none";
  }

  $(document).ready(function() {
    let cent= new Array("helo","byek");
      $('#Table-activity').DataTable({
        autoFill:true,
        "language": {
          "lengthMenu": "Mostrar _MENU_ atividade por página",
          "zeroRecords": "Nada encontrado",
          "info": "Mostrar página _PAGE_ de _PAGES_",
          "infoEmpty": "Nenhhuma atividade",
          "infoFiltered": "(Filtrado _MAX_ atividade)",
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
      let tabela = document.getElementById("Table-activity");
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
       
          // Check Radio-box
          $(".rating input:radio").attr("checked", false);
      
          $('.rating input').click(function () {
              $(".rating span").removeClass('checked');
              $(this).parent().addClass('checked');
          });
      
          $('input:radio').change(
            function(){
              var userRating = this.value;
              alert(userRating);
          }); 
    });