const url="http://127.0.0.1:8080";
let input;
let obj = [];
let selecionados;

  (function($) {
    "use strict";

    let hideForm= document.getElementById("close-Form");
    hideForm.addEventListener("click", closeForm);

    let SubmitForm= document.getElementById("BtnSubmit");
    SubmitForm.addEventListener("click", submitForm);
  
function closeForm(){
    document.getElementById("eval-activity-form").className= "mb-2 mb-xl-2 col-9  addForm mx-sm-auto d-none";
  }
  function submitForm(){
    let presence = {};
    if(input==undefined){
      swal({
        title: "Selecione uma avaliação!",
        icon: "info",
      });
    }else {
      presence.evaluation= input;
      fetch(url + '/api/activities/' + localStorage.getItem("idActivity") + '/evaluation/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(presence)
    }).then(function(response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
        }
        else {
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        console.error(err);
    });


   
   let datatable = document.getElementsByClassName("fullRow");
    for (let c = 0; c < datatable.length; c++) {
       if(datatable[c].getElementsByTagName("input")[0].checked ){
         presence.int=1;


        fetch(url + '/api/activities/' + localStorage.getItem("idActivity") + '/children/' + datatable[c].id + '/presence', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'PUT',
                        body: JSON.stringify(presence)
                    }).then(function(response) {
                        if (!response.ok) {
                            console.log(response.status); //=> number 100–599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url); //=> String
                        }
                        else {
                        }
                    }).then(function(result) {
                        console.log(result);
                    }).catch(function(err) {
                        console.error(err);
                    });
       } else {
        presence.int=0;
        fetch(url + '/api/activities/' + localStorage.getItem("idActivity") + '/children/' + datatable[c].id + '/presence', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'PUT',
                        body: JSON.stringify(presence)
                    }).then(function(response) {
                        if (!response.ok) {
                            console.log(response.status); //=> number 100–599
                            console.log(response.statusText); //=> String
                            console.log(response.headers); //=> Headers
                            console.log(response.url); //=> String
                        }
                        else {
                        }
                    }).then(function(result) {
                        console.log(result);
                    }).catch(function(err) {
                        console.error(err);
                    });
       }
      }
      swal({
        title: "Atividade avaliada com sucesso!",
        icon: "success",
      });
      for (const ln of selecionados) {
        ln.remove();
      }
      closeForm();
    }
  }
    
  
    setUpInstituicao();
  
    async function setUpInstituicao() {

    const res = await fetch(url + '/api/activities/'+ localStorage.getItem("userLogado")+'/status', {
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
  $(document).ready(function() {
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

      // Check Radio-box
    $(".rating input:radio").attr("checked", false);
      
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });
    $('input:radio').change(
      function(){
        input= this.value;
        //alert(userRating);
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
       
      
          
          
          let btnVizualizar = document.getElementById("eval-activity");

      btnVizualizar.addEventListener("click", function() {

         selecionados = tabela.getElementsByClassName("selecionado");
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
                title: "Pretende avaliar a atividade " + selecionado[0].innerHTML + " ?",
                icon: "warning",  
                buttons: ["Sim", "Não"],
                //dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {}
                else {
                  $(document).ready(function() {
                    showForm();
                  });

                  async function showForm() {
                    let a = selecionado[0].innerHTML;
                    let b = selecionado[1].innerHTML;
                    let c = selecionado[2].innerHTML
                    for (const value of data) {
                      if(value.title == a && value.address ==b && value.init_data == c){
                        localStorage.setItem("idActivity",value.idActivity);
                        const res = await fetch(url + '/api/activities/'+ value.idActivity+'/children')
                        const dataTable = await res.json();
                        $('#tablePresences tbody').empty();
                        for(let i =0; i<dataTable.length;i++){
                          obj.push({ "idChild": dataTable[i].idChild });
                          $('#tablePresences tbody').append('<tr id="'+dataTable[i].idChild+'" class="fullRow"><td>' + dataTable[i].name+'</td><td class="d-none d-xl-table-cell">'+ dataTable[i].age+'</td><td><input type="checkbox" class=""> </input> </td></tr>')
                        }
                        document.getElementById("eval-activity-form").className= "mb-2 mb-xl-2 col-9  addForm mx-sm-auto";
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