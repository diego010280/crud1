var tabla;

function init(){
    $("#producto_form").on("submit",function(e){
        guardaryeditar(e);	
    });

}

$(document).ready(function(){
    tabla=$('#producto_data').dataTable({
        "aProcessing": true,//Activamos el procesamiento del datables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        dom: 'Bfrtip', //Definimos los elementos del control de Tabla
        "buttons": [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdf'
                    
                    ],
                        
        "ajax":{
            url: "../../controller/producto.php?op=listar",
            type :"get",
            dataType: "json",
            error: function(e){
                console.log(e.responseText);
                }
              },
        "bDestroy": true,
        "responsive": true,
        "bInfo": true,
        "iDisplayLength": 10,//por cada 10 registros hace una paginacion
        "order": [[ 0,"asc"]], //Ordenar (columna, orden)
        "language": {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "No hay datos disponibles en esta tabla",
                "sInfo":           "Mostrando un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords":"Cargando...",
                "oPaginate": {
                    "sFirst":     "Primero",
                    "sLast":      "Último",
                    "sNext":      "Siguiente",
                    "sPrevious":  "Anterior"
                    },
                "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }
                }
         }).DataTable();
});

function guardaryeditar(e){
    e.preventDefault();
    var formData = new FormData($("#producto_form")[0]);
    $.ajax({
        url: "../../controller/producto.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            /* una vez guarda los datos reseteamos el formulario */
            $('#producto_form')[0].reset();

            /* ocultamos el modal */
            $("#modalmantenimiento").modal('hide');

            /* actualizamos el datatable */
            $('#producto_data').DataTable().ajax.reload();

            swal.fire(
                'Registro!',
                'El registro correctamente.',
                'success'
            ) 
        }
    });
}



function editar(prod_id) {
    console.log(prod_id);
    
    
}

function eliminar(prod_id) {

    Swal.fire({
        title: "CRUD",
        text: "Desea Eliminar el Registro?",
        icon: "error",
        showCancelButton: true,
        cancelButtonColor: "No",
        confirmButtonText: "Si",
        reverseButtons: true
      }).then((result)=>{

        if (result.isConfirmed) {

            console.log(prod_id);
            $.post("../../controller/producto.php?op=eliminar",{prod_id: prod_id},function(data){


            });

            $('#producto_data').DataTable().ajax.reload();

            Swal.fire({
                title: "Eliminado!",
                text: "El registro se elimino correctamente.",
                icon: "success"
              });
            
        }

      });
    
    
}

$(document).on("click","#btnnuevo",function () {
    $("#mdltitulo").html("Nuevo Registro");
    $("#modalmantenimiento").modal("show");
    
});

init();