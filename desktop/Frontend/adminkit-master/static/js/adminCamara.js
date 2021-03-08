$(document).ready(function() {

    $('#Table-town-hall').DataTable({
      "language": {
        "lengthMenu": "Mostrar _MENU_ centralist por página",
        "zeroRecords": "Nada encontrado",
        "info": "Mostrar página _PAGE_ de _PAGES_",
        "infoEmpty": "Nenhhum centralista",
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
  });